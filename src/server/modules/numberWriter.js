const {numerosMagicos,unidades, dezenas, centenas,operadores,grandezas} = require('../utilitario/constantes')

module.exports.execute = function execute(number){
    return escreverPorExtenso(...decomporMilhar(...separarSinalENumero(number)));
}

function separarSinalENumero(numero){
    sinal = "";
    if(operadores[numero.substring(0,1)]){
        sinal = numero.substring(0,1);
        numero = numero.substring(1);
    }
    return [sinal, numero];
}

function decomporMilhar(sinal, numero) {    
    let numeroEspecial = [];
    ultimosDois = numero.substring(numero.length -grandezas.dezenas ,numero.length)
    if(souUmNumeroMagico(numero)){
        return [sinal,numero]
    } else if (souUmaUnidade(ultimosDois)){
        numeroEspecial = ultimosDois;
        numero = numero.substring(0,numero.length -grandezas.dezenas);
    }
    return numeroEspecial.length != 0 ? [sinal,[...numero , numeroEspecial]] :  [sinal,[...numero]];
}

function escreverPorExtenso(sinal, numero){
    let numeroPorExtenso = "";
    if(souUmNumeroMagico(numero)){
        numeroPorExtenso = `${operadores[sinal]} ${numerosMagicos[numero]}`; 
    } else {
        numeroPorExtenso = concatenar(sinal, numero)    
     }
    /*  console.log("numeroPorExtenso",numeroPorExtenso) */
    return numeroPorExtenso
}   

function concatenar(...arg){
    let [sinal, numeroComposto] = arg;
    let stringConcatenada = "";
    if(numeroComposto[numeroComposto.length -1].length == 2){
        unidadesComoDezena = numeroComposto[arg.length - 1]
        centena = numeroComposto[0]
        if(parseInt(unidadesComoDezena) === 0){
            stringConcatenada = `${operadores[sinal]} ${centenas[centena]}`
        } else {
            stringConcatenada = `${operadores[sinal]} ${centenas[centena]}${operadores.conectores}${unidades[parseInt(unidadesComoDezena)]}`;
        }
    } else{
        numeroComposto = numeroComposto.reverse();
        ums  = unidades[numeroComposto[0] || 0];
        dezs = dezenas [numeroComposto[1] || 0];
        cems = centenas[numeroComposto[2] || 0];
        let sinalPorExtenso = operadores[sinal];
        let cemPorExtenso = cems;
        let unidadePorExtenso =  (ums == "") ? "" : `${operadores.conectores}${ums}`;
        let dezenaPorExtenso = (cems == ""  ) ? dezs: `${operadores.conectores}${dezs}` ;   

        stringConcatenada = `${sinalPorExtenso} ${cemPorExtenso}${dezenaPorExtenso}${unidadePorExtenso}` 
    }
    return stringConcatenada;
}

function souUmaUnidade(numero){
   return numero <= (unidades.length -1)
}
function souUmNumeroMagico (numero) {
   return numerosMagicos[numero] != undefined;
}
