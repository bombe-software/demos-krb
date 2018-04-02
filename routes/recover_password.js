const nodemailer = require('nodemailer');
const SHA256 = require("crypto-js/sha256");
const rsa = require('./../security/rsa/rsa');
// email sender function
exports.sendEmail = function (request, response) {
    response.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    const { email,password } = request.body;
    var transporter = nodemailer.createTransport({
        host: 'smtp.zoho.com',
        port: 465,
        secure: true, // use SSL
        auth: {
            user: 'info@bombesoftware.com',
            pass: 'Hola1234'
        }
    });

    // Definimos el email
    const mailOptions = {
        from: '"Bombe software " <info@bombesoftware.com>',
        to: email,
        subject: 'Confirmacion de correo',
        html: `<p>Tu email es: <b>${email}</b></p><p>Tu contraseña: <b>${password}</b></p>`
    };
    // Enviamos el email
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(JSON.stringify({ message: error.message }));
        } else {
            console.log(JSON.stringify({ message: "Todo" }));
        }
        response.end();
    });
};
