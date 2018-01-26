const socketIo = require('socket.io');
const http = require('http');
const fs = require('fs');
const Path = require('path');

const server = http.createServer(function (req, res) {
   
    let pathtype = Path.extname(req.url);
    if(req.url.indexOf('favicon.ico') !== -1) {
        return 
    } else if (req.url === '/') {
        fs.readFile('index.html', function readData(err, data) {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
    } else if (pathtype === '.css') {
        fs.readFile( `${__dirname}/${req.url}`, function readData(err, data) {
            res.writeHead(200, { 'Content-Type': 'text/css' });
            res.end(data);
        });
    } else if (pathtype === '.js') {
        fs.readFile( `${__dirname}/${req.url}`, function readData(err, data) {
            res.writeHead(200, { 'Content-Type': 'text/javascript' });
            res.end(data);
        });
    } else if (pathtype === '.jpg') {
        fs.readFile( `${__dirname}/${req.url}`, function readData(err, data) {
            res.writeHead(200, { 'Content-Type': 'image/jpg' });
            res.end(data);
        });
    } else if (pathtype === '.ico') {
        fs.readFile( `${__dirname}/${req.url}`, function readData(err, data) {
            res.writeHead(200, { 'Content-Type': 'mage/x-icon' });
            res.end(data);
        });
    }
})
server.listen(8000);
let s = socketIo.listen(server);
s.on('connection', (socket) => {
    socket.on('toserver', (msg) => {
        s.emit('toclient', msg);
    });
});