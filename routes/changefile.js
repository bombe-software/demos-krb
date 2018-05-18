//const fileUpload = require('express-fileupload');
var path = require('path')
var fs = require('file-system');
exports.ChangeRoute = function(req, res) {
    let newFileName = req.body.fileName;
    let oldFileName = req.body.oldFileName;
    fs.rename(oldFileName, newFileName, function (err) {
      if (err) throw err;
      console.log('renamed complete');
    });
};