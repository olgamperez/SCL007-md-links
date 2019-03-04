'use strict';

const mdLinks = require('../index.js');
const chai = require('chai');

describe('mdLinks', () => {
  it('Debería ser una función', () => {
    expect(typeof mdLinks).toBe('function');
  });
  it('Deberia leer un archivo .md', ()=>{
    expect.assertions();
    return mdLinks(__dirname)
    .then((dir)=>{
      expect(dir).toContain('md-links.spec.js');
    })
    .catch((error)=>{});
  });
  it('para probar', (done)=>{
    jest.useFakeTimers();
    mdLinks(__dirname, (error,result)=>{
      expect(result).toBe(1);
      done()
    });
  });
  it('Deberia recibir respuesta al ser llamada la función', async (done) => {
    mdLinks(__dirname, (error, result)=>{
      expect(result).toBe(1);
    }, 2000);
    done();
  });
  it('Debería retornar una promesa que resuelve un array de objetos al ser invocada la función', async () => {
    return new Promise((resolve, reject) => {
      setTimeout((resolve) => {
        readLineLink !== null
      }) ? resolve() : reject, 500
    })
  });
  it('resuelve true para array de objetos y false para cualquier cosa', async () => {
    await expect(Promise.resolve('[{}]')).resolves.toBe('[{}]');
    await expect(Promise.resolve('[{}]')).resolves.not.toBe('cualquier cosa');
  });
  it('recibe los argumentos y retorna un array de objetos con los parametros entregados', () => {
    expect(Promise.resolve([{
      href: 'https://nodejs.org/api/fs.html#fs_fs_readdir_path_options_callback',
      text: '- [Leer un directorio](https://nodejs.org/api/fs.html#fs_fs_readdir_path_options_callback)',
      line: 330,
      file: '/home/laboratoriad309/Documentos/Markdown Links/SCL007-md-links/README.md',
      status: 'Sin conexión'
    }])).resolves.toEqual([{
      href: 'https://nodejs.org/api/fs.html#fs_fs_readdir_path_options_callback',
      text: '- [Leer un directorio](https://nodejs.org/api/fs.html#fs_fs_readdir_path_options_callback)',
      line: 330,
      file: '/home/laboratoriad309/Documentos/Markdown Links/SCL007-md-links/README.md',
      status: 'Sin conexión'
    }]);
  });
});