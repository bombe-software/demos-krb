var fs = require('fs');
var url = require('url');
exports.send = function (req, res) {
    const filename = url.parse(req.url, true).pathname.split('/').pop();
    const content_types = {
        'js': 'text/javascript',
        'html': 'text/html',
        'css': 'text/css',
        'jpg': 'image/jpg',
        'gif': 'image/gif',
        'png': 'image/png'
    };
    if (content_types[filename.split('.').pop()] == undefined) {
        res.end('Error[1]');
    } else {
        fs.readFile(`./public/images/${filename}`, function (err, data) {
            res.writeHead(200, { 'Content-Type': content_types[filename.split('.').pop()] });
            res.end(data || JSON.stringify(err));
        });
    }
};