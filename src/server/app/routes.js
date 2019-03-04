 let routes = {
  "homepage"     :  {url:"/"        ,regex: new RegExp('^\/?$')             , description: "Página Inicial"},
  "numberwriter" :  {url:"/:number" ,regex: new RegExp ("^\\/-?\\d{1,5}$")  , description: "Escritor de números por extenso"},
 }

module.exports = routes;