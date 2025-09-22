const { 
  obtenerTemas, 
  agregarTema, 
  obtenerTemaPorId, 
  actualizarTema, 
  eliminarTema, 
  votarTema, 
  obtenerTemasOrdenados
} = require("../modelos/temaModelo");

const db = require("../db");

// Helpers locales
const toInt = (val) => parseInt(val, 10);

function obtenerEnlacesPorTema(temaId) {
  return db.prepare(
    "SELECT * FROM enlaces WHERE tema_id = ? ORDER BY votos DESC"
  ).all(temaId);
}

function respuestaJson(res, success, data = {}, message = "") {
  res.json({ success, ...(data && { ...data }), ...(message && { message }) });
}

// ---------------- Controladores de Temas ----------------

// Listar todos los temas con sus enlaces
function listarTemas(req, res) {
  const temas = obtenerTemasOrdenados();
  temas.forEach((tema) => {
    tema.enlaces = obtenerEnlacesPorTema(tema.id);
  });
  res.render("temas", { temas });
}

// Crear un nuevo tema
function crearTema(req, res) {
  const { titulo } = req.body;
  const tema = agregarTema(titulo);

  if (!tema) {
    return res.render("temas", { 
      temas: obtenerTemasOrdenados(), 
      error: "No se puede crear un tema vacío." 
    });
  }

  res.redirect("/temas");
}

// Mostrar formulario para editar un tema
function mostrarFormularioEdicion(req, res) {
  const id = toInt(req.params.id);
  const tema = obtenerTemaPorId(id);

  if (!tema) return res.redirect("/temas");

  tema.enlaces = obtenerEnlacesPorTema(tema.id);
  res.render("editarTema", { tema });
}

// Editar un tema
function editarTema(req, res) {
  const id = toInt(req.params.id);
  const tema = actualizarTema(id, req.body.titulo);

  if (!tema) {
    return res.render("temas", { 
      temas: obtenerTemasOrdenados(),
      error: "Edición inválida."
    });
  }

  res.redirect("/temas");
}

// Editar un tema (AJAX)
function editarTemaAjax(req, res) {
  const id = toInt(req.params.id);
  const { titulo } = req.body || {};

  if (!titulo) return respuestaJson(res, false, {}, "El título es obligatorio.");

  const tema = actualizarTema(id, titulo);
  if (!tema) return respuestaJson(res, false, {}, "No se pudo actualizar el tema.");

  respuestaJson(res, true, { tema });
}

// Eliminar un tema
function borrarTema(req, res) {
  eliminarTema(toInt(req.params.id));
  res.redirect("/temas");
}

// Votar un tema
function votar(req, res) {
  votarTema(toInt(req.params.id));
  res.redirect("/temas");
}

// Votar un tema (AJAX)
function votarAjax(req, res) {
  const tema = votarTema(toInt(req.params.id));
  if (!tema) return respuestaJson(res, false, {}, "Tema no encontrado.");
  respuestaJson(res, true, { tema });
}

module.exports = { 
  listarTemas, 
  crearTema, 
  mostrarFormularioEdicion, 
  editarTema, 
  editarTemaAjax,
  borrarTema, 
  votar, 
  votarAjax
};
