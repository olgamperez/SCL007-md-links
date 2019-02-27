#!/usr/bin/env node


/*module.exports = () => {
  // ...x
};*/
const fs = require('fs');
const readline = require('readline');
const fetch = require('node-fetch');

//Función para leer .md
const readReadme = (callback) => {
  fs.readFile('./README.md', 'utf-8', function (err, data) {
    if (err) {
      console.log(err)
    } else {
      console.log(data.toString())
    }

  });

}
//Función para validate link (me devuelve la promesa que me valida si el link esta bueno o no)
const validateAllLink = (link) => {
  return new Promise((resolve, reject) => {
    fetch(link.link)
      .then((res) => {
        if (res.status === 200) {
          return resolve({...link, status: 'OK'})
        } else {
          return resolve({...link, status: 'Roto'})
        }
      })
      .catch((err)=>{
        return reject({...link, status: 'Sin conexión'})
      })
  })
};
//Leer readme
const readLineLink = readline.createInterface({
  input: fs.createReadStream('./README.md')
});
//Crear función leer linea por linea
let counterLine = 0;
readLineLink.on('line', function (lineReadme) {
  counterLine++;
  let infoLink = lineReadme;
  //Patron (expresiones regulares)
  let pattern = /((http:\/\/|https:\/\/|www\.)[^\s][^\)]+)/;
  let patternLink = infoLink.match(pattern); //me recorre todas las lineas para extraer los link
  //console.log(patternLink); Arroja un arreglo completo
  if (patternLink !== null) {
    let arrayLink = [];
    arrayLink.push({
      "link": patternLink[0],
      "line": counterLine
    })
    return Promise.all(arrayLink.map((elemet) => {
        return validateAllLink(elemet)
      }))
      .then((data)=>{
        console.log(data);
      })
      .catch(function(err) {console.log('Failed: ', err)
    })
  }
})

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