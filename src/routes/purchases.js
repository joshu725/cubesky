const express = require("express");
const router = express.Router();
const PDFDocument = require("pdfkit");

// db
const pool = require("../database");

const { isLoggedIn } = require("../lib/auth");

// Cuando el navegador trate de hacer una petición get
router.get("/add", isLoggedIn, async function (req, res) {
    const proveedores = await pool.query("select * from proveedores");
    const cubos = await pool.query("select * from cubos");
    res.render("purchases/add", { proveedores, cubos });
});

router.post("/add", isLoggedIn, async function (req, res) {
    const { idProveedor, idCubo, cantidad } = req.body;

    console.log(req.body);

    const newPurchase = {
        idUsuario: req.user.id,
        idProveedor,
    };

    const result = await pool.query("insert into compras set ?", [newPurchase]);
    const compraId = result.insertId;

    for (let i = 0; i < idCubo.length; i++) {
        const detalleCompra = {
            idCompra: compraId,
            idCubo: Array.isArray(idCubo) ? idCubo[i] : idCubo,
            cantidad: Array.isArray(cantidad) ? cantidad[i] : cantidad,
        };

        await pool.query("INSERT INTO detallesCompras SET ?", [detalleCompra]);

        await pool.query(
            `UPDATE cubos SET existencia = existencia + ${detalleCompra.cantidad} WHERE id = ${detalleCompra.idCubo}`
        );
    }

    req.flash("success", "La compra se ha guardado correctamente!");
    res.redirect("/purchases");
});

router.get("/", isLoggedIn, async function (req, res) {
    const purchases = await pool.query(
        "SELECT compras.id, compras.fecha, proveedores.nombre AS proveedor, usuarios.nombre AS usuario FROM compras INNER JOIN proveedores ON compras.idProveedor = proveedores.id INNER JOIN usuarios ON compras.idUsuario = usuarios.id"
    );
    res.render("purchases/list", { purchases });
});

router.get("/details/:id", isLoggedIn, async function (req, res) {
    const { id } = req.params;
    const compra = await pool.query(
        "SELECT compras.id, compras.fecha, proveedores.nombre AS proveedor_nombre, usuarios.nombre AS usuario FROM compras JOIN proveedores ON compras.idProveedor = proveedores.id JOIN usuarios ON compras.idUsuario = usuarios.id WHERE compras.id = ?",
        [id]
    );
    const detalles = await pool.query(
        "SELECT detallesCompras.cantidad, cubos.nombre AS nombreCubo FROM detallesCompras JOIN cubos ON detallesCompras.idCubo = cubos.id WHERE detallesCompras.idCompra = ?",
        [id]
    );
    res.render("purchases/details", { compra: compra[0], detalles });
});

router.get("/download/:id", isLoggedIn, async function (req, res) {
    const { id } = req.params;
    const compra = await pool.query(
        "SELECT compras.id, compras.fecha, proveedores.nombre AS proveedor_nombre, usuarios.nombre AS usuario FROM compras JOIN proveedores ON compras.idProveedor = proveedores.id JOIN usuarios ON compras.idUsuario = usuarios.id WHERE compras.id = ?",
        [id]
    );
    const detalles = await pool.query(
        "SELECT detallesCompras.cantidad, cubos.nombre AS nombreCubo FROM detallesCompras JOIN cubos ON detallesCompras.idCubo = cubos.id WHERE detallesCompras.idCompra = ?",
        [id]
    );

    const usuarioEncargado = compra[0].usuario;

    const doc = new PDFDocument();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
        "Content-Disposition",
        `attachment; filename="detalles_compra_${id}.pdf"`
    );

    doc.pipe(res);

    doc.fontSize(18).text("Detalles de la compra - Copyright © Cubesky 2023", {
        align: "center",
    });
    doc.moveDown();
    doc.fontSize(14).text(`ID de compra: ${id}`);
    doc.fontSize(14).text(`Usuario encargado: ${usuarioEncargado}`);
    doc.fontSize(14).text(`Proveedor: ${compra[0].proveedor_nombre}`);
    doc.fontSize(14).text(`Fecha: ${compra[0].fecha}`);
    doc.moveDown();

    doc.fontSize(16).text("Cubos:", { underline: true });
    detalles.forEach((detalle) => {
        doc.fontSize(14).text(
            `- ${detalle.nombreCubo}: ${detalle.cantidad} unidades`
        );
    });

    doc.end();
});

module.exports = router;
