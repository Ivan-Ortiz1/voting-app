const { 
  obtenerTemas, 
  agregarTema, 
  obtenerTemaPorId, 
  actualizarTema, 
  eliminarTema, 
  votarTema, 
  obtenerTemasOrdenados 
} = require("../modelos/temaModelo");

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

module.exports = { 
  listarTemas, 
  crearTema, 
  mostrarFormularioEdicion, 
  editarTema, 
  borrarTema, 
  votar, 
  votarAjax 
};
