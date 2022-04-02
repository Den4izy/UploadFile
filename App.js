const http = require('http');
const fs = require('fs');
const path = require('path');

const httpServer = http.createServer((req, res) =>{
    res.end('goood');
}).listen(3000, ()=>{
    console.log('node.js port 3000')
});