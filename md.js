const fs = require('fs');
const readline = require('readline');
const fetch = require('node-fetch');
const path = require('path');

//Función general que retorna una promesa (Promise) y resuelve a un arreglo (Array) de objetos (Object)
const mdLinks = (pathUser, option) => {
  //Función para validate link (me devuelve la promesa que me valida si el link esta bueno o no)
  const validateAllLink = (link) => {
    return new Promise((resolve, reject) => {
      fetch(link.link)
        .then((res) => {
          if (option.indexof(('--validate') !==-1 && res.status === 200)){
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
    const absolutPath = path.resolve(pathUser)
    return new Promise((resolve, reject) => {
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
            'href': patternLink[0],
            'text': patternLink.input,
            'line': counterLine,
            'file': absolutPath,
          }));
        }
      })
      readLineLink.on('close', () => {
        Promise.all(promiseAcc).then(resolve);
      });
    });
  } else if (fs.statSync(pathUser).isDirectory() === true) {
    return Promise.all(fs.readdirSync(pathUser).map(e => {
      return mdLinks(pathUser + "/" + e)
    })).then(data => {
      return Promise.resolve(data.reduce((acc, current) => {
        return acc.concat(current);
      }))
    })
  } else {
    return Promise.resolve([]);
  }
}

if (require.main === module)
  mdLinks(processUser)
  .then(console.log)


module.exports = mdLinks;