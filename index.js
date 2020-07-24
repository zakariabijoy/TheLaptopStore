const fs = require('fs');
const http = require('http');
const url = require('url');

const json = fs.readFileSync(`${__dirname}/data/data.json`, 'utf-8');
const laptopData = JSON.parse(json);

const server = http.createServer((req, res) =>{
    const pathName = url.parse(req.url, true).pathname;
    const id = url.parse(req.url, true).query.id;

    if(pathName === '/products' || pathName === '/'){
        res.writeHead(200, { 'content-type': 'text/html' });
        res.end('this is the products page!');

    }else if(pathName === '/laptop' && id < laptopData.length){
        res.writeHead(200, { 'content-type': 'text/html' });
        res.end(`this is the laptop page for ${id}!`);
    }else{
        res.writeHead(400, { 'content-type': 'text/html' });
        res.end('bad request!');
    }
    
});

server.listen(1337, '127.0.0.1', () =>{
    console.log('listening for requests now');
})