const fs = require('fs');
const readline = require('readline');
const fetch = require('node-fetch');
const path = require('path')
const processUser = process.argv[2]
//Crear función para leer ruta revisar los metodos (isDirectori, statsync, pathresolve)
/*
const searchRoute = (processUser) => {
  let validateIsFile = fs.statSync(processUser)
  //si el padre es una carpeta
  if (validateIsFile.isDirectory() === true) {
    fs.readdirSync(processUser).forEach(e => {
      console.log(e)
      //Si el hijo es una carpeta o un archivo md
      if (fs.statSync(processUser + '/' + e).isDirectory() === true || pathUrl.extname(processUser + '/' + e) === '.md') {
        searchRoute(processUser + '/' + e)
        console.log(' Soy la recursión')
      }
    })
  }
  //Si el padre es un archivo md
  else if (validateIsFile.isFile() === true && pathUrl.extname(processUser) === '.md') {
    console.log('hola soy un archivo md');
  };
}*/



//Función general que retorna una promesa (Promise) y resuelve a un arreglo (Array) de objetos (Object)
const mdLinks = (pathUser) => {


  //Función para validate link (me devuelve la promesa que me valida si el link esta bueno o no)
  const validateAllLink = (link) => {
    return new Promise((resolve, reject) => {
      fetch(link.link)
        .then((res) => {
          if (res.status === 200) {
            return resolve({
              ...link,
              status: 'OK'
            })
          } else {
            return resolve({
              ...link,
              status: 'Roto'
            })
          }
        })
        .catch((err) => {
          return resolve({
            ...link,
            status: 'Sin conexión'
          })
        })
    })
  };
  //Leer readme
  let validateIsFile = fs.statSync(pathUser)
  if (validateIsFile.isFile() === true && path.extname(pathUser) === '.md') {
    const readLineLink = readline.createInterface({
      input: fs.createReadStream(pathUser)
    });
    //Crear función leer linea por linea
    const promiseAcc = [];
    let counterLine = 0;
    readLineLink.on('line', function (lineReadme) {
      counterLine++;
      let infoLink = lineReadme;
      //Patron (expresiones regulares)
      let pattern = /((http:\/\/|https:\/\/|www\.)[^\s][^\)]+)/;
      let patternLink = infoLink.match(pattern); //me recorre todas las lineas para extraer los link
      //console.log(patternLink); Arroja un arreglo completo
      if (patternLink !== null) {
        promiseAcc.push(validateAllLink({
          "link": patternLink[0],
          "line": counterLine
        }));
      }
    })

    return new Promise((resolve) => {
      readLineLink.on('close', () => {
        resolve(Promise.all(promiseAcc))

      });
    })
  } else if (fs.statSync(pathUser).isDirectory() === true) {
    return Promise.resolve(Promise.all(fs.readdirSync(pathUser).map(e => {
      return mdLinks(pathUser+"/"+e)
    })))
  }

}

if (require.main === module)
  mdLinks(processUser)
  .then(console.log)
module.exports = mdLinks;