const { 
  agregarEnlace, 
  eliminarEnlace, 
  votarEnlace, 
  actualizarEnlace, 
  obtenerTemaPorId 
} = require("../modelos/temaModelo");

// Helpers locales
const toInt = (val) => parseInt(val, 10);

function respuestaAjax(res, data, errorMessage = "") {
  if (!data || Object.values(data).some((v) => !v)) {
    return res.json({ success: false, message: errorMessage });
  }
  res.json({ success: true, ...data });
}

// ---------------- Controladores de Enlaces ----------------

// Crear un nuevo enlace en un tema
function crearEnlace(req, res) {
  const temaId = toInt(req.params.temaId);
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

// Editar un enlace existente
function editarEnlace(req, res) {
  const temaId = toInt(req.params.temaId);
  const enlaceId = toInt(req.params.enlaceId);
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

// Editar un enlace (AJAX)
function editarEnlaceAjax(req, res) {
  const temaId = toInt(req.params.temaId);
  const enlaceId = toInt(req.params.enlaceId);
  const { nombre, url } = req.body;

  const enlace = actualizarEnlace(temaId, enlaceId, nombre, url);
  if (!enlace) return respuestaAjax(res, null, "No se pudo actualizar el enlace.");
  
  respuestaAjax(res, { enlace });
}

// Eliminar un enlace
function borrarEnlace(req, res) {
  const temaId = toInt(req.params.temaId);
  const enlaceId = toInt(req.params.enlaceId);

  eliminarEnlace(temaId, enlaceId);
  res.redirect(`/temas/editar/${temaId}`);
}

// Votar un enlace (AJAX)
function votarEnlaceAjax(req, res) {
  const temaId = toInt(req.params.temaId);
  const enlaceId = toInt(req.params.enlaceId);

  const enlace = votarEnlace(temaId, enlaceId);
  if (!enlace) return respuestaAjax(res, null, "Enlace no encontrado.");
  
  respuestaAjax(res, { enlace });
}

module.exports = { 
  crearEnlace, 
  editarEnlace,
  editarEnlaceAjax,
  borrarEnlace, 
  votarEnlaceAjax 
};
