const mdLinks= require('./md.js');

mdLinks('./README.md').then(console.log);
module.exports = mdLinks;
