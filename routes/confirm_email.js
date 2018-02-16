const nodemailer = require('nodemailer');
const axios = require('axios');
const SHA256 = require("crypto-js/sha256");
const rsa = require('./../security/rsa/rsa');
// email sender function
exports.sendEmail = function (req, res) {
    response.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    let firma = SHA256("Como estas?" + request.body.email + "Yo jaiba y tu?" + request.body.id_usuario).toString();
    let cifrado = rsa.cifrar(firma, 41, 309);

    // Definimos el transporter
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'example@gmail.com',
            pass: 'password'
        }
    });
    // Definimos el email
    const mailOptions = {
        from: 'Bombe sofwtare',
        to: request.body.email,
        subject: 'Confirmacion de correo',
        text: "Saludos, tu codigo de acceso es: " + cifrado
    };
    // Enviamos el email
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.write(500, err.message);
        } else {
            res.write(SON.stringify({message: "Todo"}));
        }
    });
    res.end();
};

exports.confirmar_usuario = function (request, response) {
    let rsa = require('./../security/rsa/rsa');
    var id_usuario = 0;
    con.query('select id_usuario from Usuario_no_confirmado where email =?',
        [
            request.body.email
        ],
        function (error, rows) {
            id_usuario = rows[0].id_usuario;
            var firma = SHA256("Como estas?" + id_usuario + "Yo jaiba y tu?" + id_usuario)

            let descifrado = rsa.descifrar(request.body.firma, 5, 309);

            for (var index = 0; index < descifrado.length; index++) {
                descifrado = descifrado.replace("*", "8");
                descifrado = descifrado.replace("¨", "9");
                descifrado = descifrado.replace("Û", "b");
            }


            console.log("descifrado: " + descifrado);

            if (descifrado == firma) {
                con.query('call confirmar_usuario(?)',
                    [
                        id_usuario
                    ],
                    function (error, rows) {
                        console.log(rows);
                    });
                response.end(JSON.stringify({ mensaje: "Todo bien" }));
            } else {
                response.end(JSON.stringify({ mensaje: "No coincidio" }));
            }
        });
};