 let routes = [
      {url:"/:number" ,regex: new RegExp ("^\\/-?\\d{1,5}$")  , description: "Escritor de números por extenso"  , moduleDir:"../modules/numberWriter" }
 ]

module.exports = routes;    