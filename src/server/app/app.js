const http = require('http');
const { handleRequest } = require('../app/handleRequest')
module.exports.configure = function configure(config){
    this.config = config;
    this.run = run;
    return this;
}

/* Roda a aplicação */
function run(){
    /* Cria Servidor e informa sua criação*/
    http.createServer((req,res,next) => handleRequest(req,res,next),console.log("Servidor node/http criado!"))
    /* Informa que o servidor está escutando no HOST e PORT definidos */
    .listen(this.config.PORT, this.config.HOST, () => console.log(`Servidor rodando e escutando em http://${this.config.HOST}:${this.config.PORT}`));
}

