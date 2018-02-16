//Configurar de la base de datos
var CryptoJS = require("crypto-js");
const mongoose = require('mongoose');
const Usuario = mongoose.model('usuario');


//{"D":5,"E":5,"N":21}
exports.post = function (request, response) {
	response.setHeader('Content-Type', 'application/json');
	let ip = request.headers['cf-connecting-ip'] || request.headers['x-forwarded-for'] || request.connection.remoteAddress;
	Usuario.findOne({ email: request.body.email }).then(usuario => {
		if (usuario != null) {

			let data = {
				ticket: CryptoJS.AES.encrypt(JSON.stringify(
					{
						ip,
						date: request.body.date
					}
				), "jaiba").toString()
			};
			response.write(JSON.stringify({ message: CryptoJS.AES.encrypt(JSON.stringify(data), usuario.password).toString()}));
		} else {
			response.write(JSON.stringify({ message: "404" }));
		}
		response.end();
	});
};