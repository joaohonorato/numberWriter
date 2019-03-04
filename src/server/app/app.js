const http = require('http');
const { handleRequest } = require('../app/handleRequest')
const PORT = process.env.PORT || 3000;
const HOST = "localhost";


/* Criando Servidor e informando sua criação*/
http.createServer((req,res,next) => handleRequest(req,res,next),console.log("Servidor node/http criado!"))
/* Informando que o servidor está escutando no HOST e PORT definidos */
.listen(PORT, HOST, () => console.log(`Servidor rodando e escutando em http://${HOST}:${PORT}`));
