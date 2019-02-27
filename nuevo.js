const fs = require('fs'),
    path = require('path');


function readDirRecursive(startDir) {
    const readDirQueue = [],
        fileList = [];

    function readDir(dir) {
       // TE DEVUELVE UNA PROMESA CUYO RESOLVE TIENE UNA LISTA DE LOS ITEMS
       // EN EL DIRECTORIO Y LA RUTA
        function getItemList(readDir) {
            return new Promise((resolve,reject) => {
                fs.readdir(readDir,(err,itemList) => {
                    if (err) {
                        return reject(err);
                    }

                    // resolve con la ruta principal agregada a cada elemento
                    resolve(itemList.map((item) => path.resolve(readDir,item)));
                });
            });
        }

       // DEVUELVE UNA PROMESA POR CADA ITEM EN LA LISTA, CADA PROMESA
       // CONTIENE LA RUTA DEL ARCHIVO Y SI ES DIRECTORIO (CARPETA)
        function getItemListStat(itemList) {
            function getStat(itemPath) {
                return new Promise((resolve,reject) => {
                    fs.stat(itemPath,(err,stat) => {
                        if (err) {
                            return reject(err);
                        }

                        // resolve con la ruta del elemento y si el directorio
                        resolve({itemPath,isDirectory: stat.isDirectory()});
                    });
                });
            }

            // stat todos los artículos en la lista
            return Promise.all(itemList.map(getStat));
        }

       // PROCESA LA LISTA, SI ES DIRECTORIO LO AGREGA A LA COLA Y
       // LUEGO SI LA COLA AUN TIENE ITEMS, PROCESA ESE ITEM Y
       // A LA VEZ LO SACA DE LA COLA
       // SI ES UN ARCHIVO, AGREGA LA RUTA AL ARREGLO DE ARCHIVOS
        function processItemList(itemList) {
            for (const {itemPath,isDirectory} of itemList) {
                // if directory add to queue
                if (isDirectory) {
                    readDirQueue.push(itemPath);
                    continue;
                }

                // add file to list
                fileList.push(itemPath);
            }

            // if queue, process next item recursive
            if (readDirQueue.length > 0) {
                return readDir(readDirQueue.shift());
            }

            // finished - return file list
            return fileList;
        }

        // read item list from directory, stat each item then walk result
        return getItemList(dir)
            .then(getItemListStat)
            .then(processItemList);
    }

    // commence reading at the top
    return readDir(startDir);
}

readDirRecursive('.')
    .then((itemList) => console.log(itemList))
    .catch((err) => console.log(err));