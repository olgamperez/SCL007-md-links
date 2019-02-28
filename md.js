const fs = require('fs');
const readline = require('readline');
const fetch = require('node-fetch');
const pathUrl = require('path')
const processUser = process.argv[2]
//Crear función para leer ruta revisar los metodos (isDirectori, statsync, pathresolve)

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
}
searchRoute(processUser)


//Función general que retorna una promesa (Promise) y resuelve a un arreglo (Array) de objetos (Object)
const mdLinksInitial = (path) => {
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
  const readLineLink = readline.createInterface({
    input: fs.createReadStream(path)
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
  //Me retorna una promesa con un array de objetos con la información extraida del readme
  return new Promise((resolve) => {
    readLineLink.on('close', () => {
      resolve(Promise.all(promiseAcc))

    });
  })

}
//Exportando mdlinks
// if (require.main === module)
//   mdLinksInitial()
// .then(console.log)
module.exports = mdLinksInitial;






//La función debe retornar una promesa (Promise) que resuelva a un arreglo (Array) de objetos (Object), 
//donde cada objeto representa un link y contiene las siguientes propiedades:


//(deberia recibir el archivo entero y luego las lineas)


// Leer la ruta que ingrese el usuario y transformarla a absoluta con resolve

//   for (let i = 0; i < arrayLink.length; i++) {
//      console.log('Line N° ' + counterLine +' '+ patternLink[i]);
//   fetch(arrayLink[i].link)
//   return
/* 
          // console.log('Line N° ' + counterLine +' ' + arrayLink[i]+ response.url);
          console.log('Line N° ' + arrayLink[i].line + ' ' + arrayLink[i].link + response.url + ' ' + 'Estatus: ' + response.status + ' ' + 'validación: ' + response.ok);
          // console.log(response.status);
        }).catch(function (error) {
          console.log("Failed!", error);
        })

    }

  }



  // console.log('Line number ' + counterLine + ': ' + lineReadme);
});
*/





//readLineLink.on('line', lineLinkPrint);

/*
const readLineLink= readline.createInterface({input: fs.createReadStream(readReadme)});
  const lineLinkPrint = (prueba)=>{
    console.log(`Hola soy una linea de link: ${prueba.toString}`)
  }
  readLineLink.on('line', lineLinkPrint);
};

 */