// controladores/enlaceControlador.js

const { 
  agregarEnlace, 
  eliminarEnlace, 
  votarEnlace, 
  actualizarEnlace, 
  obtenerTemaPorId 
} = require("../modelos/temaModelo");

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

// Editar enlace (tradicional con redirect)
function editarEnlace(req, res) {
  const temaId = parseInt(req.params.temaId);
  const enlaceId = parseInt(req.params.enlaceId);
  const { nombre, url } = req.body;

  const enlace = actualizarEnlace(temaId, enlaceId, nombre, url);
  const tema = obtenerTemaPorId(temaId);

  if (!enlace) {
    return res.render("editarTema", { 
      tema, 
      error: "No se pudo actualizar el enlace. Verifica los datos." 
    });
  }

  res.redirect(`/temas/editar/${temaId}`);
}

// Editar enlace con AJAX (respuesta JSON)
function editarEnlaceAjax(req, res) {
  const temaId = parseInt(req.params.temaId);
  const enlaceId = parseInt(req.params.enlaceId);
  const { nombre, url } = req.body;

  const enlace = actualizarEnlace(temaId, enlaceId, nombre, url);

  if (!enlace) {
    return res.json({ success: false, message: "No se pudo actualizar el enlace." });
  }

  res.json({ success: true, enlace });
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

module.exports = { 
  crearEnlace, 
  editarEnlace,
  editarEnlaceAjax,
  borrarEnlace, 
  votarEnlaceJson 
};
