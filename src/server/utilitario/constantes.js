const ordemDasGrandezas = {
  unidades: "1",
  dezenas: "2",
  centenas: "3",
  milhares: "4"
};
const numerosBase = {
  "": "",
  "0": "zero",
  "1": "um",
  "2": "dois",
  "3": "três",
  "4": "quatro",
  "5": "cinco",
  "6": "seis",
  "7": "sete",
  "8": "oito",
  "9": "nove",
  "10": "dez",
  "11": "onze",
  "12": "doze",
  "13": "treze",
  "14": "catorze",
  "15": "quinze",
  "16": "dezesseis",
  "17": "dezessete",
  "18": "dezoito",
  "19": "dezenove",
  "100": "cem",
  "666": "O número da besta"
};

const operadores = {
  "": "",
  "-": "menos ",
  "espaco": " ",
  "conectores": " e "
};

const numeros = [
  "",
  "um",
  "dois",
  "três",
  "quatro",
  "cinco",
  "seis",
  "sete",
  "oito",
  "nove",
  "dez",
  "onze",
  "doze",
  "treze",
  "catorze",
  "quinze",
  "dezesseis",
  "dezessete",
  "dezoito",
  "dezenove"
];

const dezenas = [
  "",
  "",
  "vinte",
  "trinta",
  "quarenta",
  "cinquenta",
  "sessenta",
  "setenta",
  "oitenta",
  "noventa"
];

const centenas = [
  "",
  "cento",
  "duzentos",
  "trezentos",
  "quatrocentos",
  "quinhentos",
  "seiscentos",
  "setecentos",
  "oitocentos",
  "novecentos"
];

 const grandezasBase = [
    "mil",
    "milhão",
    "bilhão",
    "trilhão",
    "quatrilhão",
    "quintilhão",
    "sextilhão",
    "setilhão"  
 ]

module.exports = {
  numerosBase,
  grandezasBase,
  numeros,
  dezenas,
  centenas,
  operadores,
  ordemDasGrandezas
};
