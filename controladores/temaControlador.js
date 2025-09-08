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

function borrarTema(req, res) {
  const id = parseInt(req.params.id);
  eliminarTema(id);
  res.redirect("/temas");
}

function votar(req, res) {
  const id = parseInt(req.params.id);
  votarTema(id);
  res.redirect("/temas");
}

// Nuevo: versión para AJAX (responde en JSON)
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
  crearEnlace,
  editarEnlace,
  borrarEnlace,
  votarEnlaceAjax
};
