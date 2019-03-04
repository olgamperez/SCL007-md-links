const mdLinks= require('./md.js');

//mdLinks('./README.md').then(console.log);

if (require.main === module){
    mdLinks(process.argv[2])
    .then(console.log)
}
 
module.exports = mdLinks;
