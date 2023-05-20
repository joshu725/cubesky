const express = require("express");
const router = express.Router();

// db
const pool = require("../database");

const { isLoggedIn } = require("../lib/auth");

// Cuando el navegador trate de hacer una petición get
router.get("/add", isLoggedIn, function (req, res) {
    res.render("suppliers/add");
});

router.post("/add", isLoggedIn, async function (req, res) {
    // Se guardan los datos recibidos en una variable para después tratar con el usuario, ademas se muestra en consola
    const { nombre, telefono, correo } = req.body;
    const newSupplier = {
        nombre,
        telefono,
        correo,
    };
    console.log(newSupplier);

    await pool.query("insert into proveedores set ?", [newSupplier]);

    // Mensaje en pantalla
    req.flash("success", "El proveedor se ha guardado correctamente!");

    res.redirect("/suppliers");
});

router.get("/", isLoggedIn, async function (req, res) {
    const suppliers = await pool.query("select * from proveedores");
    res.render("suppliers/list", { suppliers });
});

router.get("/delete/:id", isLoggedIn, async function (req, res) {
    const { id } = req.params;
    await pool.query("delete from proveedores where id = ?", [id]);
    // Mensaje en pantalla
    req.flash("success", "El proveedor se ha eliminado correctamente!");
    res.redirect("/suppliers");
});

router.get("/edit/:id", isLoggedIn, async function (req, res) {
    const { id } = req.params;
    const suppliers = await pool.query(
        "select * from proveedores where id = ?",
        [id]
    );
    res.render("suppliers/edit", { supplier: suppliers[0] });
});

router.post("/edit/:id", isLoggedIn, async function (req, res) {
    const { id } = req.params;
    const { nombre, telefono, correo } = req.body;
    const newSupplier = {
        nombre,
        telefono,
        correo,
    };
    await pool.query("update proveedores set ? where id = ?", [
        newSupplier,
        id,
    ]);
    // Mensaje en pantalla
    req.flash("success", "El proveedor se ha editado correctamente!");
    res.redirect("/suppliers");
});

module.exports = router;
