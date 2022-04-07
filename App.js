const http = require('http');
const fs = require('fs');
const path = require('path');
const formidable = require('formidable');

http.createServer((req, res) => {
    if (req.url === '/') {
        console.log('main page');
        sendRes('index.html', 'text/html', res);
    } else if (/\/uploads\/[^\/]+$/.test(req.url) && req.method === 'POST') {
        fileSave(req.url, getContentFile(req.url), res, req);
    } else {
        sendRes(req.url, getContentFile(req.url), res);
    }
}).listen(3000, () => {
    console.log('http://localhost:3000/')
});

function sendRes(url, contentType, res) {
    let file = path.join(__dirname + '/static', url);
    fs.readFile(file, (err, content) => {
        if (err) {
            console.log(`res 404 ${file}`);
            console.log(err);
            res.writeHead(404);
            res.end();
            console.log('error 404');
        } else {
            res.writeHead(200, {'content-type': contentType});
            res.write(content);
            res.end();
            console.log(`res 200 ${file}`);
        }
    })
}

function fileSave(url, contentType, res, req) {
    let form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        if(err){
            console.log('не вдалося розпарсить прийом запиту');
            res.end();
        }
        else{
            let oldpath = files['file']['filepath'];
            let ar = url.split('/');
            let newpath = path.join(__dirname + '/static/images/', ar[2]);
            fs.rename(oldpath, newpath, function (err) {
                if (err) throw err;
                res.write('File uploaded and moved!');
                res.end();
            });
        }
    });
}

function getContentFile(url) {
    switch (path.extname(url)) {
        case '.html':
            return 'text/html';
        case '.css':
            return 'text/css';
        case '.js':
            return 'text/javascript';
        case '.json':
            return 'application/json';
        case '.ico':
            return 'application/ico';
        default:
            return 'application/octet-stream';
    }
}
