const http = require('http');
const fs = require('fs');
const path = require('path');

const httpServer = http.createServer((req, res) =>{

    if(req.url === '/'){
        console.log('main page');
        sendRes('index.html','text/html', res);
    }
    else{
        sendRes(req.url,getContentFile(req.url), res);
    }
}).listen(3000, ()=>{
    console.log('http://localhost:3000/')
});

function sendRes(url, contentType, res ){
    let file = path.join(__dirname+'/static', url);
    fs.readFile(file, (err, content)=>{
        if(err){
            console.log(`res 404 ${file}`);
            res.writeHead(404);
            //res.end(res.write('file not found'));
            console.log('error 404');
        }
        else{
            res.writeHead(200, {'content-type': contentType });
            res.write(content);
            res.end();
            console.log(`res 200 ${file}`);
        }
    })
}

function getContentFile(url){
    switch (path.extname(url)) {
        case '.html':
            return 'text/html';
        case '.css':
            return 'text/css';
        case '.js':
            return 'text/javascript';
        case '.json':
            return 'application/json';
        default:
            return 'application/octate-stream';
    }
}