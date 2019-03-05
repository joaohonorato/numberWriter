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
  let [sinal, numero] = separarSinalENumero(number);
  let numeroEmGradezas = decomporEmGradezas(numero);
  let grandezasMapeadas = numeroEmGradezas.map(numero => decomporNumero(numero));
  let grandezasPorExtenso = grandezasMapeadas.map(grandeza => escreverNumero(grandeza));
  console.log("grandezasPorExtenso",grandezasPorExtenso)
  let numeroPorExtenso = concatenarGrandezas(grandezasPorExtenso);
  console.log("Numero por extenso:", numeroPorExtenso);
  return;
};

function concatenarGrandezas(grandezasPorExtenso){
    grandezasComConectores = grandezasPorExtenso.map((grandezaPorExtenso,index, grandezas) => {
        let ultimoItem = index === grandezas.length -1;
        if(!ultimoItem  && grandezaPorExtenso === numerosBase[0] ){
            return "";
        }else if(ultimoItem && grandezas.length > 1 && grandezas.slice(0,index).every(numero => numero !== numerosBase[0])){
            return (grandezaPorExtenso === numerosBase[0]) ? " " : `${operadores.conectores}${grandezaPorExtenso}`;
        } 
        return ultimoItem ? grandezaPorExtenso : grandezaPorExtenso +" "+ grandezasBase[index];
    })

    return grandezasComConectores.reduce((acc,numero) =>  acc.concat(numero));
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

