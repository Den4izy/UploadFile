const http = require('http');
const fs = require('fs');
const path = require('path');
const {writeFile} = require('querystring');
const {Buffer} = require('querystring');
const formidable = require('formidable');


http.createServer((req, res) => {

    if (req.url === '/') {
        console.log('main page');
        sendRes('index.html', 'text/html', res);
    } else if (/\/uploads\/[^\/]+$/.test(req.url) && req.method === 'POST') {
        sendRes2(req.url, getContentFile(req.url), res, req);
        //saveFile(req);
        //sendRes(req.url,getContentFile(req.url), res);

        // res.writeHead(200, {'Content-Type': 'image/jpeg'});
        // let data = '';
        // req.on('data', function(chunk) {
        //     data += chunk;
        // });
        // req.on('end', function() {
        //     console.log(data);
        // });
        // res.end('done');
        // fs.writeFile(__dirname+'/static/images/imgg2.jpg', data, function(err) {
        //     if(err) {
        //         return console.log(err);
        //     }
        //     console.log("The file was saved!");
        // });


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


function sendRes2(url, contentType, res, req) {

    let form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        console.log(files['file']['filepath']);
        //console.log(fs.statSync(files));
        let oldpath = files['file']['filepath'];
        console.log();
        let ar = url.split('/');
        console.log(ar);
        let newpath = path.join(__dirname + '/static/images/', ar[2]);
        console.log(newpath);
        fs.rename(oldpath, newpath, function (err) {
            if (err) throw err;
            res.write('File uploaded and moved!');
            res.end();
        });
    });

    // let file = path.join(__dirname, url);
    // let pathF = `${file}`;
    // let fileReq = req;
    // //console.log('MyPath: '+pathF);
    // //console.log(file.content);
    // //console.log(fileReq);
    //
    // let t = req.pipe(
    //     fs.createWriteStream('req')
    // ).on('finish', () => res.end('ok'));
    // console.log(t.);






    // let form = new formidable.IncomingForm();
    //
    // //Process the file upload in Node
    // form.parse(req, function (error, fields, file) {
    //     let filepath = file.filepath;
    //     let newpath = pathF;
    //     //newpath += file.fileupload.originalFilename;
    //
    //     //Copy the uploaded file to a custom folder
    //     console.log(newpath);
    //     console.log(filepath);
    //     fs.rename(filepath, newpath, function () {
    //         //Send a NodeJS file upload confirmation message
    //         res.write('NodeJS File Upload Success!');
    //         res.end();
    //     });
    // });






    // fs.readFile(file, 'utf-8', (err, data) => {
    //     if(err){
    //         console.log(err);
    //
    //     }
    //     else{
    //         console.log(data);
    //     }
    //
    // });


    // fs.open(pathF, 'w', (err) => {
    //     if (err) throw err;
    //     console.log('File created');
    // });




    res.end();


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
            break;
    }
}

function saveFile(data, resp) {
    console.log(data);

    resp.sendFile(data);

    // let body = '';
    // data.on('data', chunk=>{
    //     body += chunk.toString()
    // });
    // let file = data
    // console.log(file.name);


    fs.writeFile(__dirname + '/static/images', data, function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    });

    resp.sendFile(data);

}