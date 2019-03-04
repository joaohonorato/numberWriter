const {unidades, dezenas} = require('../utilitario/constantes')

module.exports.write  = (number) => {
    let output = [];
    if(number < 20){
      return unidades[number];
    } else {
        output = decompose(number);
    }
    return dezenas[output[1]] + " e " + unidades[output[0]];
} 

function decompose(number) {
    return [...number].reverse();
}



/* 
    Idéia geral:
    1)Criar uma função que lê os números de 3 em 3, de 0 à 999
        1.1) essa função se repetira quando a ordem de grandeza aumentar
        1.2)[ 1, 19 ] => direto
        1.3)[20,999] => decompor => parse => direto
    2)Tratar do sinal de menos, e de como entregar o json no formato correto.    
    3)Decompor o número em parcelas de 3 em 3, neste caso será  nó máximo 2 e 3, 
    mas que cuidará disso será nosso requestHandler, essa função não será 
    necessariamente limitada a especificação do intervalo
    4) Tratar os valores decompostos, transformando em número por extenso. 
*/