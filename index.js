const mdLinks= require('./md.js');

mdLinks('./README.md').then(console.log);
// .then (data=>{
//  console.log(data)
// })
module.exports = mdLinks;
  