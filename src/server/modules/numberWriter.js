const {numerosMagicos,unidades, dezenas, centenas,operadores} = require('../utilitario/constantes')

module.exports.write  = (number) => {
    let output = [];
    let sign = "";
    /* Valida o sinal do número */
    if(operadores[number.substring(0,1)]){
        sign = operadores[number.substring(0,1)];
        number = number.substring(1);
    }
    /* Verifica se é um numero esdruxulo (0 e 100) e fornece tratamento diferenciado */
    if(numerosMagicos[number]){
       return sign + numerosMagicos[number]; 
    } 
    /* Verifica se é um numero entre 0 e 19 e printa diretamente o número, pode se optar por incluir o 20*/
    /* Retorna o número por extenso caso match direto */
    else if(number < 20){
      return sign + unidades[parseInt(number,10)];
    } 
    /* Caso número maior que 20, decompõe o número em partes, milhares, centenas, dezenas e unidades */
    else {
        output = decompose(number);
    }
    /* Prepara o número em texto para exibição */
    cems = centenas[output[2] || 0];
    dezs = dezenas [output[1] || 0];
    ums  = unidades[output[0] || 0];
    output = sign + (cems ? cems + operadores.conectores : "") + (dezs ? dezs + operadores.conectores : "") + ums;
    

    return output
    } 

function decompose(number) {
    return [...number].reverse();
}
