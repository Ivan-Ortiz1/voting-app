const { 
  obtenerTemas, 
  agregarTema, 
  obtenerTemaPorId, 
  actualizarTema, 
  eliminarTema, 
  votarTema, 
  obtenerTemasOrdenados,
  agregarEnlace,
  actualizarEnlace,
  eliminarEnlace,
  votarEnlace,
  obtenerEnlace
} = require("../modelos/temaModelo");

// --------------------
// Controladores de Temas
// --------------------
function listarTemas(req, res) {
  const temas = obtenerTemasOrdenados();
  res.render("temas", { temas });
}

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

function mostrarFormularioEdicion(req, res) {
  const id = parseInt(req.params.id);
  const tema = obtenerTemaPorId(id);
  if (!tema) {
    return res.redirect("/temas");
  }
  res.render("editarTema", { tema });
}

function editarTema(req, res) {
  const id = parseInt(req.params.id);
  const tema = actualizarTema(id, req.body.titulo);
  if (!tema) {
    return res.render("temas", { 
      temas: obtenerTemasOrdenados(),
      error: "Edición inválida."
    });
  }
  res.redirect("/temas");
}

// --------------------
// NUEVA función para edición AJAX de temas
// --------------------
function editarTemaAjax(req, res) {
  const id = parseInt(req.params.id);
  const { titulo } = req.body || {};  // <- aseguramos que no sea undefined

  if (!titulo) {
    return res.json({ success: false, message: "El título es obligatorio." });
  }

  const tema = actualizarTema(id, titulo);

  if (!tema) {
    return res.json({ success: false, message: "No se pudo actualizar el tema. Verifica el título." });
  }

  res.json({ success: true, tema });
}

// --------------------
// Borrar Tema
// --------------------
function borrarTema(req, res) {
  const id = parseInt(req.params.id);
  eliminarTema(id);
  res.redirect("/temas");
}

// --------------------
// Votación de Temas
// --------------------
function votar(req, res) {
  const id = parseInt(req.params.id);
  votarTema(id);
  res.redirect("/temas");
}

// --------------------
// Votación AJAX de Temas
// --------------------
function votarAjax(req, res) {
  const id = parseInt(req.params.id);
  const tema = votarTema(id);

  if (tema) {
    res.json({ success: true, tema });
  } else {
    res.json({ success: false, message: "Tema no encontrado" });
  }
}

// --------------------
// Controladores de Enlaces
// --------------------
function crearEnlace(req, res) {
  const temaId = parseInt(req.params.temaId);
  const { nombre, url } = req.body;
  agregarEnlace(temaId, url, nombre);
  res.redirect(`/temas/editar/${temaId}`);
}

function editarEnlace(req, res) {
  const temaId = parseInt(req.params.temaId);
  const enlaceId = parseInt(req.params.enlaceId);
  const { nombre, url } = req.body;
  actualizarEnlace(temaId, enlaceId, nombre, url);
  res.redirect(`/temas/editar/${temaId}`);
}

function borrarEnlace(req, res) {
  const temaId = parseInt(req.params.temaId);
  const enlaceId = parseInt(req.params.enlaceId);
  eliminarEnlace(temaId, enlaceId);
  res.redirect(`/temas/editar/${temaId}`);
}

// --------------------
// Votación AJAX de Enlaces
// --------------------
function votarEnlaceAjax(req, res) {
  const temaId = parseInt(req.params.temaId);
  const enlaceId = parseInt(req.params.enlaceId);
  const enlace = votarEnlace(temaId, enlaceId);

  if (enlace) {
    res.json({ success: true, enlace });
  } else {
    res.json({ success: false, message: "Enlace no encontrado" });
  }
}

module.exports = { 
  listarTemas, 
  crearTema, 
  mostrarFormularioEdicion, 
  editarTema, 
  borrarTema, 
  votar, 
  votarAjax,
  editarTemaAjax,
  crearEnlace,
  editarEnlace,
  borrarEnlace,
  votarEnlaceAjax
};
