// modelos/temaModelo.js

let temas = [
  { id: 1, titulo: "JavaScript Básico", votos: 3 },
  { id: 2, titulo: "Node.js y Express", votos: 5 },
  { id: 3, titulo: "Bases de Datos", votos: 2 }
];

function obtenerTemas() {
  return temas;
}

function agregarTema(titulo) {
  if (!titulo || titulo.trim() === "") return null;

  const nuevoTema = {
    id: temas.length > 0 ? temas[temas.length - 1].id + 1 : 1,
    titulo: titulo.trim(),
    votos: 0
  };
  temas.push(nuevoTema);
  return nuevoTema;
}

function obtenerTemaPorId(id) {
  return temas.find(t => t.id === id);
}

function actualizarTema(id, nuevoTitulo) {
  const tema = obtenerTemaPorId(id);
  if (tema && nuevoTitulo && nuevoTitulo.trim() !== "") {
    tema.titulo = nuevoTitulo.trim();
    return tema;
  }
  return null;
}

function eliminarTema(id) {
  const indice = temas.findIndex(t => t.id === id);
  if (indice !== -1) {
    temas.splice(indice, 1);
    return true;
  }
  return false;
}

function votarTema(id) {
  const tema = obtenerTemaPorId(id);
  if (tema) {
    tema.votos++;
    return tema;
  }
  return null;
}

function obtenerTemasOrdenados() {
  return [...temas].sort((a, b) => b.votos - a.votos);
}

module.exports = { 
  obtenerTemas, 
  agregarTema, 
  obtenerTemaPorId, 
  actualizarTema, 
  eliminarTema, 
  votarTema, 
  obtenerTemasOrdenados 
};
