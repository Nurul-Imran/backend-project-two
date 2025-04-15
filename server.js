// server
const path = require('path');
const fs = require('fs');
const http = require('http');
const port = 3000;
const hostName = '127.0.0.1';

const server = http.createServer((req, res) => {
    const routes = {
        '/': 'index.html',
        '/about': 'about.html',
        '/contact': 'contact.html'
    }
    const statusCode = routes[req.url] ? 200 : 404;
    const fileName = routes[req.url] || 'error.html';
    const filePath = path.join(__dirname, 'view', fileName);
    const handleReadFile = (filePath, stsCode) => {
        fs.readFile(filePath, 'utf-8', (err, data) => {
            if(err){
                res.statusCode = 404;
                res.setHeader('content-type', 'text/plain');
                res.write(err.message);
                return res.end();
            }else{
                res.statusCode = stsCode;
                res.setHeader('content-type', 'text/html');
                res.write(data);
                res.end();
            }
        })
    }
    handleReadFile(filePath, statusCode);
});

server.listen(port, hostName, () => {
    console.log(`server running is successfully at http://${hostName}:${port}`);
})