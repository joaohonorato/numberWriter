const {
  numerosBase,
  grandezasBase,
  dezenas,
  centenas,
  operadores,
  ordemDasGrandezas
} = require("../utilitario/constantes");

/* 
  ###### Etapas do algorito om exemplos ######

  * Passo 1: Separar número e sinal 
  * In: -1212 | Out ['-','1212']

  * Passo 2: Decompor número em ordens de grandeza 
  * In: 1212 | Out ['1','212']
  * In: 12345 | Out ['12','345']

  * Passo 3: Decompor grandezas e números para escrita 
  * Exemplo1 => In: 1212 | Out: ['1',['2','12']]
  * Exemplo2 => In: 12345| Out: ['12',['3','4','5']]
  * ExemploComNumeroMagico => In: 12100 | Out: ['12','100']

  * Passo 4: Escrever por extenso cada número das grandezas 
  * Exemplo1 => In: ['1',['2','12']] | Out: ['cento',['doze']]
  * Exemplo2 => In: ['12',['3','4','5']]| Out: ['doze',['trezentos','quarenta','cinco']]
  * ExemploComNumeroMagico => In: ['12','100'] | Out: ['doze','cem']

  *Passo 5: Concatenar as grandezas inserindo a ordem da grandeza e os conectores necesssários 
  * Exemplo1 => In: ['cento',['doze']] | Out: cento e doze
  * Exemplo2 => In: ['doze',['trezentos','quarenta','cinco']]| Out: doze mil trezentos e quarenta e cinco
  * ExemploComNumeroMagico => In: ['doze','cem'] | Out: doze mil e cem

  *Passo 6: Retornar número por extenso no formato desejado 

  */

module.exports.execute = function execute(number) {
  /* Passo 1 */
  let [sinal, numero] = separarSinalENumero(number);
  /* Passo 2 */
  let numeroEmGradezas = decomporEmGradezas(numero);
  /* Passo 3 */
  let grandezasMapeadas = numeroEmGradezas.map(decomporNumero);
  /* Passo 4 */
  let grandezasPorExtenso = grandezasMapeadas.map(escreverNumero);
  /* Passo 5 */
  let numeroPorExtenso = concatenarSinalEGrandezas(sinal,grandezasPorExtenso);
  /* Passo 6 */
  return wraper(numeroPorExtenso);
};


function concatenarNumeros(grandezaDecomposta){
  let grandezaPorExtenso = "";
  if(grandezaDecomposta[grandezaDecomposta.length -1].length == 2){
      unidadeComoDezena = numerosBase[parseInt(grandezaDecomposta[1])] === undefined ? "" : numerosBase[parseInt(grandezaDecomposta[1])];
      let centena = centenas[grandezaDecomposta[0]];
      grandezaPorExtenso = `${centena}${(unidadeComoDezena===numerosBase[0]) ? "":`${operadores.conectores}${unidadeComoDezena}`}`
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

function concatenarSinalEGrandezas(sinal,grandezasPorExtenso){
    grandezasComConectores = grandezasPorExtenso.map(regrasDeConcatenacaoDeGrandezas).map((el) => el === undefined ? "" : el)
    return operadores[sinal] + grandezasComConectores.reduce((acc,numero) =>  acc.concat(numero));
}

function regrasDeConcatenacaoDeGrandezas(grandezaPorExtenso,index,grandezas) {
  let ultimoItem = index === grandezas.length -1;
  if(!ultimoItem  && grandezaPorExtenso === numerosBase[0] ){
      return numerosBase.vazio;
  }else if(ultimoItem && grandezas.length > 1 && grandezas.slice(0,index).every(numero => numero !== numerosBase[0])){

    return (grandezaPorExtenso === numerosBase[0]) ? operadores[""] : `${operadores.conectores}${grandezaPorExtenso}`;
  } 
  return ultimoItem ? grandezaPorExtenso : grandezaPorExtenso +operadores.espaco + grandezasBase[index];
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
    numeroEmMilhares.push(numero.slice(numero.length -3, numero.length ));
    numero = numero.substring(0, numero.length - 3);
  }
  numeroEmMilhares.push(numero);
  return numeroEmMilhares.reverse();
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

function wraper(numeroPorExtenso){
  return JSON.stringify({"extenso" : numeroPorExtenso},null,' ');
}