const routes = require('../app/routes');
const URL = require('url').URL;
const {HOST,PORT,defaults,intervalo} = require('../app/config');


module.exports.handleRequest = (req,res) => { 
    try{
        res.writeHead(defaults.response.statusCode , defaults.response.headers);
        let urlPath = new URL(req.url, `http://${HOST}:${PORT}`).pathname; 
        let rota = routes.filter(r => urlPath.match(r.regex))[0];
        if(rota && req.method == 'GET'){
            getHandler(urlPath,rota,res);
        }else if (rota && req.method == 'POST') {
            postHandler(req,res);
        }else if(req.url ==='/'){
            welcome(req,res);
        }else {
            noResponse(req,res);
        }
    }catch (e){
        console.log(e);
        res.write("Não foi possível processar o seu request\n" + e);
    }finally{
        res.end();
    }
}

/*  curl -s http://localhost:3000/1 */
/** Handler GET request */
getHandler = (urlPath,rota, res) => {
    let urlParam = urlPath != undefined ? urlPath.substring(1) : "";
    let mod = require(rota.moduleDir);
    res.write(`${mod.execute(urlParam)}`);
    
}
/*  curl -sd "1" POST http://localhost:3000/1 */
/** Handler POST request */
postHandler = (req, res) => {
    req.on('data', (chunk) => {
        console.log("chunkando!");
        let mod = require(rota.moduleDir);
        res.write(`\n${mod.execute(chunk)}`);
    });
}

/** Handler sem rota */
noResponse = (req, res) => {
    let example = getRandomInt();    
    res.write(`
O escritor aceita somente números no intervalo [${intervalo.min},${intervalo.max}].
Por favor, informe uma entrada válida.
Por exemplo para o número ${example}:   http://localhost/${example}`
    );
}

/** Handler boas vindas */
welcome = (req, res) => {  
    res.writeHead(defaults.response.statusCode , defaults.response.headers);
    let example = getRandomInt();   
    res.write(`
Bem vindo ao escritor de número por extenso, exemplos de uso:
O número 21 :   http://localhost/21
Resposta    : {"extenso":"vinte e um"}
O número -21:   http://localhost/-21
Resposta   : {"extenso":"menos vinte e um"}`);
}

function getRandomInt() {
    min = Math.ceil(intervalo.min);
    max = Math.floor(intervalo.max);
    return Math.floor(Math.random() * (max - min)) + min;
  }