// controladores/temaControlador.js
const { obtenerTemas, agregarTema, obtenerTemaPorId, actualizarTema } = require("../modelos/temaModelo");

function listarTemas(req, res) {
  const temas = obtenerTemas();
  res.render("temas", { temas });
}

function crearTema(req, res) {
  const { titulo } = req.body;
  if (titulo && titulo.trim() !== "") {
    agregarTema(titulo.trim());
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
  const { titulo } = req.body;
  actualizarTema(id, titulo);
  res.redirect("/temas");
}

module.exports = { listarTemas, crearTema, mostrarFormularioEdicion, editarTema };
