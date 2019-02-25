/*module.exports = () => {
  // ...
};*/
const fs = require('fs');
const readline = require('readline');
const fetch= require ('node-fetch');

//Función para leer .md
const readReadme= (callback)=>{
  fs.readFile('./README.md','utf-8', function(err, data){
    if(err){
      console.log(err)
    }else{
      console.log(data.toString())
    }
    
  });
  
}

const readLineLink= readline.createInterface({input: fs.createReadStream('./README.md')});

let counterLine = 0;
readLineLink.on('line', function (lineReadme) {
  counterLine++;
let infoLink = lineReadme;
let pattern= /((http:\/\/|https:\/\/|www\.)[^\s]+)/;
let patternLink = infoLink.match(pattern);
//console.log(patternLink); Arroja un arreglo completo
if(patternLink !== null){
  let arrayLink=[];
  arrayLink.push(patternLink[0])
  for(let i=0; i<arrayLink.length; i++){
  // console.log('Line N° ' + counterLine +' '+ patternLink[i]);
   fetch(arrayLink)
   .then((response)=>{
    // console.log('Line N° ' + counterLine +' ' + arrayLink[i]+ response.url);
     console.log('Line N° ' + counterLine +' ' + arrayLink[i]+ response.url+ ' '+ response.status+ ' '+ response.ok);
    // console.log(response.status);
   }).catch(function(error) {
    console.log("Failed!", error);
  })

  }
 
}



 // console.log('Line number ' + counterLine + ': ' + lineReadme);
});






//readLineLink.on('line', lineLinkPrint);

 /*
const readLineLink= readline.createInterface({input: fs.createReadStream(readReadme)});
  const lineLinkPrint = (prueba)=>{
    console.log(`Hola soy una linea de link: ${prueba.toString}`)
  }
  readLineLink.on('line', lineLinkPrint);
};
 
 */