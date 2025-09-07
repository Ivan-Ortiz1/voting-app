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
  const nuevoTema = {
    id: temas.length + 1,
    titulo,
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
  if (tema && nuevoTitulo.trim() !== "") {
    tema.titulo = nuevoTitulo.trim();
    return tema;
  }
  return null;
}

module.exports = { obtenerTemas, agregarTema, obtenerTemaPorId, actualizarTema };
