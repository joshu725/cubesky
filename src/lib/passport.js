const passport = require("passport");
const LocalStrategy = require("passport-local");
const nodemailer = require("nodemailer");

const pool = require("../database");
const helpers = require("../lib/helpers");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
        // MODIFICAR
        // MODIFICAR
        // MODIFICAR
        user: "correo@gmail.com",
        pass: "pass", // Se recomienda usar una "Contraseña de aplicación" que nos permite obtener Google al tener la verificación en dos pasos activada
        // MODIFICAR
        // MODIFICAR
        // MODIFICAR
    },
});

// Inicio de sesión
passport.use(
    "local.signin",
    new LocalStrategy(
        {
            usernameField: "usuario",
            passwordField: "pass",
            passReqToCallback: true,
        },
        async function (req, usuario, pass, done) {
            console.log(req.body);
            const rows = await pool.query(
                "select * from usuarios where usuario = ?",
                [usuario]
            );
            if (rows.length > 0) {
                const user = rows[0];
                const validPass = await helpers.comparePassword(
                    pass,
                    user.pass
                );
                if (validPass) {
                    done(
                        null,
                        user,
                        req.flash("success", "Bienvenido " + user.usuario) +
                            " :)"
                    );
                } else {
                    done(
                        null,
                        false,
                        req.flash("message", "Contraseña incorrecta")
                    );
                }
            } else {
                return done(
                    null,
                    false,
                    req.flash("message", "Usuario no encontrado")
                );
            }
        }
    )
);

// Registro
passport.use(
    "local.signup",
    new LocalStrategy(
        {
            usernameField: "usuario",
            passwordField: "pass",
            passReqToCallback: true,
        },
        async function (req, usuario, pass, done) {
            const { nombre, telefono, correo } = req.body;
            const newUser = {
                nombre: nombre,
                usuario: usuario,
                telefono: telefono,
                correo: correo,
                pass: pass,
            };

            newUser.pass = await helpers.encryptPassword(pass);

            const result = await pool.query("insert into usuarios set ?", [
                newUser,
            ]);

            newUser.id = result.insertId;

            sendWelcomeEmail(newUser.correo);

            return done(null, newUser);
        }
    )
);

// Enviar correo de bienvenida
const sendWelcomeEmail = (email) => {
    const mailOptions = {
        // MODIFICAR
        // MODIFICAR
        // MODIFICAR
        from: "correo@gmail.com",
        // MODIFICAR
        // MODIFICAR
        // MODIFICAR
        to: email,
        subject: "¡Bienvenido a Cubesky!",
        text: "¡Gracias por registrarte en el gestor de Cubesky! Esperamos tengas una agradable experiencia en nuestra aplicación.",
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log("Error al enviar el correo de bienvenida:", error);
        } else {
            console.log("Correo de bienvenida enviado:", info.response);
        }
    });
};

passport.serializeUser(function (usuario, done) {
    done(null, usuario.id);
});

passport.deserializeUser(async function (id, done) {
    const rows = await pool.query("select * from usuarios where id = ?", [id]);
    done(null, rows[0]);
});
