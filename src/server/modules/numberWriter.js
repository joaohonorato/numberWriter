const {
  numerosBase,
  grandezasBase,
  numeros,
  dezenas,
  centenas,
  operadores,
  ordemDasGrandezas
} = require("../utilitario/constantes");

module.exports.execute = function execute(number) {
  /* Passo 1: Separar número e sinal */
  let [sinal, numero] = separarSinalENumero(number);
  /* Passo 2: Decompor número em ordens de grandeza  */
  let numeroEmGradezas = decomporEmGradezas(numero);
  /* Passo 3: Decompor grandezas e números para escrita */
  let grandezasMapeadas = numeroEmGradezas.map(decomporNumero);
  /* Passo 4: Escrever por extenso cada número das grandezas */
  let grandezasPorExtenso = grandezasMapeadas.map(escreverNumero);
  /* Passo 5: Concatenar as grandezas inserindo a ordem da grandeza e os conectores necesssários */
  let numeroPorExtenso = concatenarSinalEGrandezas(sinal,grandezasPorExtenso);
  /* Passo 6: Retornar número por extenso no formato desejado */
  return wraper(numeroPorExtenso);
};

function wraper(numeroPorExtenso){
    return JSON.stringify({"extenso" : numeroPorExtenso});
}

function concatenarSinalEGrandezas(sinal,grandezasPorExtenso){
    grandezasComConectores = grandezasPorExtenso.map(regrasDeConcatenacaoDeGrandezas)
    return operadores[sinal] + grandezasComConectores.reduce((acc,numero) =>  acc.concat(numero));
}

function regrasDeConcatenacaoDeGrandezas(grandezaPorExtenso,index,grandezas) {
    let ultimoItem = index === grandezas.length -1;
    if(!ultimoItem  && grandezaPorExtenso === numerosBase[0] ){
        return "";
    }else if(ultimoItem && grandezas.length > 1 && grandezas.slice(0,index).every(numero => numero !== numerosBase[0])){
        return (grandezaPorExtenso === numerosBase[0]) ? " " : `${operadores.conectores}${grandezaPorExtenso}`;
    } 
    return ultimoItem ? grandezaPorExtenso : grandezaPorExtenso +" "+ grandezasBase[index];
}



function concatenarNumeros(grandezaDecomposta){
    let grandezaPorExtenso = "";
    if(grandezaDecomposta[grandezaDecomposta.length -1].length == 2){
        unidadeComoDezena = numerosBase[parseInt(grandezaDecomposta[1])] === undefined ? "" : numerosBase[parseInt(grandezaDecomposta[1])];
        let centena = centenas[grandezaDecomposta[0]];
        grandezaPorExtenso = `${centena}${(unidadeComoDezena===numerosBase[0]) ? "":`${operadores.conectores} ${unidadeComoDezena}` }`
    } else {
        grandezaDecomposta = grandezaDecomposta.reverse();
        ums = numerosBase[grandezaDecomposta[0] || 0];
        dezs  = dezenas[grandezaDecomposta[1] || 0];
        cems = centenas[grandezaDecomposta[2] || 0];
        let centena = cems;
        let dezena = (cems == "") ? dezs : `${operadores.conectores}${dezs}`;
        let unidade = (ums == ("" || numerosBase[0])) ? "" : `${operadores.conectores}${ums}`;
        grandezaPorExtenso = `${centena}${dezena}${unidade}`;        
    }
    return grandezaPorExtenso;
}

function escreverNumero(grandezaDecomposta) {
    let grandezaPorExtenso = grandezaDecomposta;
    if(!Array.isArray(grandezaDecomposta) && souUmNumeroBase(grandezaDecomposta)){
        grandezaPorExtenso = numerosBase[parseInt(grandezaDecomposta)]
    } else {
        grandezaPorExtenso = concatenarNumeros(grandezaDecomposta)
    }

    return grandezaPorExtenso;
}

function decomporNumero(grandeza) {
  let numeroDecomposto = grandeza;
  if (!souUmNumeroBase(parseInt(grandeza)) ) {
    dezena = grandeza.substring(grandeza.length - ordemDasGrandezas.dezenas,grandeza.length);
    numeroDecomposto = souUmNumeroBase(dezena) ? [grandeza.substring(0,1), dezena] :  [...grandeza];
  }
  return numeroDecomposto;
}

function decomporEmGradezas(numero) {
  let numeroEmMilhares = [];
  while (numero.length > 3) {
    let milhar = new Array(3);
    milhar[2] = numero.charAt(numero.length - 1);
    milhar[1] = numero.charAt(numero.length - 2);
    milhar[0] = numero.charAt(numero.length - 3);
    numeroEmMilhares.push(milhar[0] + milhar[1] + milhar[2]);
    numero = numero.substring(0, numero.length - 3);
  }
  numeroEmMilhares.push(numero);
  return numeroEmMilhares.reverse();
}

function separarSinalENumero(numero) {
  sinal = "";
  if (operadores[numero.substring(0, 1)]) {
    sinal = numero.substring(0, 1);
    numero = numero.substring(1);
  }
  return [sinal, numero];
}
function souUmNumeroBase(numero) {
  return numerosBase[parseInt(numero)] != undefined;
}

