const fs = require('fs');


let listadoPorHacer = [];

const guardarDB = () => {

  let data = JSON.stringify(listadoPorHacer);
  fs.writeFile(`./por-hacer/db/data.json`, data, (err) => {
    if (err) throw new Error('No se pudo grabar', err)
    else
      console.log('TODO BIEN!!! ');

  });
}

const cargarDB = () => {
  try {
    listadoPorHacer = require('../por-hacer/db/data.json');
  } catch (error) {
    listadoPorHacer = []
  }
}

const getListado = () => {
  try {
    cargarDB();
    return listadoPorHacer;
  } catch (error) {
    console.log('ERROR', error);
  }
}

const actualizar = (descripcion, completado = true) => {
  console.log(descripcion);

  cargarDB();

  let index = listadoPorHacer.findIndex(tarea => {
    return tarea.descripcion === descripcion
  });

  if (index >= 0) {
    listadoPorHacer[index].completado = completado;
    guardarDB();
    return true;
  } else {
    return false;
  }
}

const crear = (descripcion) => {
  let porHacer = {
    descripcion,
    completado: false
  }
  cargarDB();
  listadoPorHacer.push(porHacer);
  guardarDB();

  return porHacer;
}

const borrar = (descripcion) => {
  cargarDB();
  let newListadoPorhacer = listadoPorHacer.filter((tarea) => {
    return tarea.descripcion !== descripcion;
  });

  if (listadoPorHacer.length === newListadoPorhacer.length) {
    return false;
  } else {
    listadoPorHacer = newListadoPorhacer;
    guardarDB();
    return true;
  }

}
module.exports = {
  crear,
  guardarDB,
  getListado,
  actualizar,
  borrar
}