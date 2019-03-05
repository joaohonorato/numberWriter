 let routes = [
     {url:"/"        ,regex: new RegExp('^\/?$')             , description: "Página Inicial"                   , moduleDir:"../modules/index" },
     {url:"/:number" ,regex: new RegExp ("^\\/-?\\d{1,5}$")  , description: "Escritor de números por extenso"  , moduleDir:"../modules/numberWriter" }
 ]

module.exports = routes;    