const mdLinks= require('./md.js');

mdLinks(process.argv[2]).then(console.log);
module.exports = mdLinks;
