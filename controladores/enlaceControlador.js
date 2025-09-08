const { 
  agregarEnlace, 
  eliminarEnlace, 
  votarEnlace 
} = require("../modelos/enlaceModelo");
const { obtenerTemaPorId } = require("../modelos/temaModelo");

// Crear enlace
function crearEnlace(req, res) {
  const temaId = parseInt(req.params.temaId);
  const { nombre, url } = req.body;
  const enlace = agregarEnlace(temaId, url, nombre);
  const tema = obtenerTemaPorId(temaId);

  if (!enlace) {
    return res.render("editarTema", { 
      tema, 
      error: "Debes ingresar un nombre y una URL válidos." 
    });
  }

  res.redirect(`/temas/editar/${temaId}`);
}

// Eliminar enlace
function borrarEnlace(req, res) {
  const temaId = parseInt(req.params.temaId);
  const enlaceId = parseInt(req.params.enlaceId);
  eliminarEnlace(temaId, enlaceId);
  res.redirect(`/temas/editar/${temaId}`);
}

// Votar enlace (JSON para frontend)
function votarEnlaceJson(req, res) {
  const temaId = parseInt(req.params.temaId);
  const enlaceId = parseInt(req.params.enlaceId);
  const enlace = votarEnlace(temaId, enlaceId);

  if (enlace) {
    return res.json({ success: true, enlace });
  }
  res.json({ success: false });
}

module.exports = { crearEnlace, borrarEnlace, votarEnlaceJson };
