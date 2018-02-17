const nodemailer = require('nodemailer');
const SHA256 = require("crypto-js/sha256");
const rsa = require('./../security/rsa/rsa');
// email sender function
exports.sendEmail = function (request, response) {
    response.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    const {email, id_usuario}  = request.body;
    let firma = SHA256("Como estas?" + email + "Yo jaiba y tu?" + id_usuario).toString();
    let cifrado = rsa.cifrar(firma, 41, 309);
    // Definimos el transporter
    const transporter = nodemailer.createTransport({
        service: 'Hotmail',
        auth: {
            user: 'drasa_tec@hotmail.com',
            pass: 'Cometa204'
        }
    });
    // Definimos el email
    const mailOptions = {
        from: 'Bombe sofwtare',
        to: email,
        subject: 'Confirmacion de correo',
        text: "Saludos, tu codigo de acceso es: " + cifrado
    };
    // Enviamos el email
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            response.write(JSON.stringify({message: error.message}));
        } else {
            response.write(JSON.stringify({message: "Todo"}));
        }
        response.end();
    });
};