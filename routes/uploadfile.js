const fileUpload = require('express-fileupload');
var path = require('path')
exports.Uploads = function(req, res) {
    let file = req.files.file;
    let filenameIdUsuario = req.body.id_solicitud
    // Use the mv() method to place the file somewhere on your server
    let ext = path.extname(file.name);
    if((ext === ".jpg")||(ext === ".jpeg")||(ext === ".png")){
    file.mv('./public/images/' + filenameIdUsuario + ext, function(err) {
        if(err){
            console.log(err);
        }
      res.send('File uploaded!');
    });
} else{
    throw new Error('Archivo invalido');

}
};