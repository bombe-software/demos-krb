const nodemailer = require('nodemailer');
const SHA256 = require("crypto-js/sha256");
const rsa = require('./../security/rsa/rsa');
// email sender function
exports.sendEmail = function (request, response) {
    response.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    const { email, id_usuario } = request.body;
    let firma = SHA256("Como estas?" + email + "Yo jaiba y tu?" + id_usuario).toString();
    
    //Checar esta linea
    let cifrado = firma; // rsa.cifrar(firma, 41, 309);
    // Definimos el transporter
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
        html: `<p>Tu codigo es: <b>${cifrado}</b></p><p>No sabes donde colocar este codigo entra este link: <a href='https://www.demos-web.com/confirm_email'>https://www.demos-web.com/confirm_email</a></p>`
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
