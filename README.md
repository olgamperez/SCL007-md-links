# Markdown Links

## Preámbulo

Es una libreria que lee y analiza archivos
en formato `Markdown`, para extraer los links que contengan y verificar su estado; es decir, si el link esta en estatus OK, Roto o sin conexión.


## Versión
 -  0.1.0

 ## Homepage

 [GitHub Olga Pérez](https://github.com/olgamperez/SCL007-md-links)

## Guía de uso

## Instalación
```js
$ npm install --save -g https://github.com/olgamperez/SCL007-md-links
```
Una vez instalado se debe ejecutar mediante **CLI (Linea de Comando)** desde la terminal como se indica: 

```js
$ md-links <Nombre del archivo>
// Si es un archivo (Ejemplo)
$ md-links ./Readme.md

$ md-links <Nombre de la carpeta>
// Si es una carpeta
$ md-links ./carpeta
```

Esto como resultado va a retornar una promesa que resuelve un arreglo de objetos como se muestra en el siguiente ejemplo:

```js
[ { href: 'https://es.wikipedia.org/wiki/Markdown',
    text:
     '[Markdown](https://es.wikipedia.org/wiki/Markdown) es un lenguaje de marcado',
    line: 5,
    file:
     '/home/laboratoriad309/Documentos/Markdown Links/SCL007-md-links/carpeta/prueba/README.md',
    status: 'Ok' },
  { href: 'https://nodejs.org/',
    text:
     'herramienta usando [Node.js](https://nodejs.org/), que lea y analice archivos',
    line: 16,
    file:
     '/home/laboratoriad309/Documentos/Markdown Links/SCL007-md-links/carpeta/prueba/README.md',
    status: 'Sin conexión' }]
```

## Planificación

La organización y seguimiento del proyecto se realizo a través de [GitHub](https://github.com/olgamperez/SCL007-md-links/projects/2), con la aplicación de **issues** y etiquetas para la identificación de los niveles de dificultad de cada tarea.

## Licencia

- ISC

## Autor

- Olga Pérez


