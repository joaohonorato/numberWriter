const routes = require('../app/routes');
const numberWriter = require('../modules/numberWriter')
const URL = require('url').URL;
const events = require('events');
const {HOST,PORT} = require('../app/config');


module.exports.handleRequest = (req,res) => {
    res.writeHead(200, { 'content-type': 'application/json; charset=utf-8' });
    let urlPath = new URL(req.url, `http://${HOST}:${PORT}`).pathname;   
    let rota = routes.filter(r => urlPath.match(r.regex))[0]    
    if(rota && req.method == 'GET'){
        let urlParam = urlPath != undefined ? urlPath.substring(1) : "";
        try{
            let mod = require(rota.moduleDir);
            mod.execute(urlParam);
            res.end();
        }catch (e){
            console.log(e);
            res.write("\n\nNão foi possível processar o seu request\n" + e);
            res.end();
        }
    }else{
        noResponse(req,res);
    }
    
/* 
    if(urlPath.match(routes.homepage.regex)){    
        welcome(req,res);
    }else if(urlPath.match(routes.numberwriter.regex)){
        req.method == 'GET' ? getHandler(urlPath, res) 
      :(req.method == 'POST' ? postHandler(req,res, urlPath) 
      : noResponse(req,res));      
    } else {    
        noResponse(req,res);
    } */
}

/*  curl -v http://localhost:3000/1 */
/** Handler GET request */
getHandler = (path, res) => {
    let numberToFull = {"extenso": numberWriter.execute(path.substring(1))}
    res.write("\n\n"+JSON.stringify(numberToFull));
}
/*  curl -d "1" POST http://localhost:3000/1 */
/** Handler POST request */
postHandler = (req, res) => {
    req.on('data', (chunk) => {
        let numberToFull = {"extenso": numberWriter.write(chunk)}
        res.write("\n\n"+JSON.stringify(numberToFull));
        res.end();;
    });
}

/** Handler to homepage */
noResponse = (req, res) => {
    let example = getRandomInt();    
    res.write(`
O escritor aceita somente números no intervalo [-99999,99999].
Por favor, informe uma entrada válida.
Por exemplo para o número ${example}:   http://localhost/${example}`);
    res.end();
}

/** Handler welcome */
welcome = (req, res) => {  
    let example = getRandomInt();   
    res.writeHead(200, { 'content-type': 'application/json; charset=utf-8' });
    res.write(`
Bem vindo ao escritor de número por extenso, exemplos de uso:
O número 21 :   http://localhost/21
Resposta    : {"extenso":"vinte e um"}
O número -21:   http://localhost/-21
Resposta   : {"extenso":"menos vinte e um"}`);
    res.end()
}

function getRandomInt() {
    min = Math.ceil(-99999);
    max = Math.floor(99999);
    return Math.floor(Math.random() * (max - min)) + min;
  }