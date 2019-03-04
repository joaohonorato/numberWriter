const routes = require('../app/routes');
const { write } = require('../modules/numberWriter')
const URL = require('url').URL;

module.exports.handleRequest = (req,res,next) => {
    let urlPath = new URL(req.url, 'http://127.0.0.1/').pathname;   
    if(urlPath.match(routes.homepage.regex)){    
        welcome(req,res);
    }else if(urlPath.match(routes.numberwriter.regex)){
        req.method == 'GET' ? getHandler(urlPath, res) : postHandler(req,res, urlPath);      
    } else {    
        noResponse(req,res);
    }
}

/*  curl -v http://localhost:3000/1 */
/** Handler GET request */
getHandler = (path, res) => {
    let numberToFull = {"extenso": write(path.substring(1))}
    res.writeHead(200, { 'content-type': 'application/json; charset=utf-8' })
       .write("\n\n"+JSON.stringify(numberToFull))
       .end();
}
/*  curl -v -d "1" -X POST http://localhost:3000/1 */
/** Handler POST request */
postHandler = (req, res, reqUrl) => {
    req.on('data', (chunk) => {
        res.writeHead(200, { 'content-type': 'application/json; charset=utf-8' })
           .write('POST parameters: ' + write(chunk))
           .end();
    });
}

/** Handler no mapping */
noResponse = (req, res) => {    
    res.writeHead(200, { 'content-type': 'application/json; charset=utf-8' });
    res.write(`
O escritor aceita somente números.
Por favor, informe uma entrada válida.
Por exemplo para o número -14:   http://localhost/-14`);
    res.end();
}

/** Handler no mapping */
welcome = (req, res) => {    
    res.writeHead(200, { 'content-type': 'application/json; charset=utf-8' })
    .write(`
Bem vindo ao escritor de número por extenso, para escrever, por exemplo:
O número 21 :   http://localhost/21
Resposta    : {"extenso":"vinte e um"}
O número -21:   http://localhost/-21
Resposta   : {"extenso":"menos vinte e um"}`)
}