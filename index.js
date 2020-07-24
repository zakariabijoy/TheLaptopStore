const fs = require('fs');
const http = require('http');
const url = require('url');

const json = fs.readFileSync(`${__dirname}/data/data.json`, 'utf-8');
const laptopData = JSON.parse(json);

const server = http.createServer((req, res) =>{
    const pathName = url.parse(req.url, true).pathname;
    const id = url.parse(req.url, true).query.id;

    // products overView
    if(pathName === '/products' || pathName === '/'){
        res.writeHead(200, { 'content-type': 'text/html' });

        fs.readFile(`${__dirname}/templates/template-overview.html`, 'utf-8', (err, data) => {
           let overviewOutput = data;

            fs.readFile(`${__dirname}/templates/template-card.html`, 'utf-8', (err, data) => {
                
                const cardsOutput = laptopData.map(el => replaceTemplate(data, el)).join('');
                overviewOutput = overviewOutput.replace('{%Cards%}', cardsOutput);

                res.end(overviewOutput);
            });
        });
        
    // laptop details
    }else if(pathName === '/laptop' && id < laptopData.length){
        res.writeHead(200, { 'content-type': 'text/html' });

        fs.readFile(`${__dirname}/templates/template-laptop.html`, 'utf-8', (err, data) =>{
            const laptop = laptopData[id];               
            const output = replaceTemplate(data, laptop);
            res.end(output);
        });
    
    }else if((/\.(jpg|jpeg|png|gif|)$/i).test(pathName)){
        fs.readFile(`${__dirname}/data/img${pathName}`,(err, data) =>{
            res.writeHead(200, { 'Content-type': 'image/jpg'});
            res.end(data);
        })
    }
    
    // url not found
    else{
        res.writeHead(400, { 'content-type': 'text/html' });
        res.end('bad request!');
    }
    
});

server.listen(1337, '127.0.0.1', () =>{
    console.log('listening for requests now');
})

function replaceTemplate(originaHtml, laptop) {
    let output = originaHtml.replace(/{%ProductName%}/g, laptop.productName);
    output = output.replace(/{%Image%}/g, laptop.image);
    output = output.replace(/{%Price%}/g, laptop.price);
    output = output.replace(/{%Screen%}/g, laptop.screen);
    output = output.replace(/{%Ram%}/g, laptop.ram);
    output = output.replace(/{%Cpu%}/g, laptop.cpu);
    output = output.replace(/{%Storage%}/g, laptop.storage);
    output = output.replace(/{%Description%}/g, laptop.description);
    output = output.replace(/{%Id%}/g, laptop.id); 

    return output;
}