// rutas/enlaceRutas.js
const express = require("express");
const router = express.Router({ mergeParams: true });

const { 
  crearEnlace, 
  editarEnlace, 
  editarEnlaceAjax, 
  borrarEnlace, 
  votarEnlaceAjax
} = require("../controladores/enlaceControlador");

// Rutas CRUD de Enlaces

// Crear un nuevo enlace en un tema
router.post("/agregar", crearEnlace);

// Editar un enlace existente
router.post("/editar/:enlaceId", editarEnlace);

// Editar un enlace vía AJAX
router.post("/editar/:enlaceId/json", editarEnlaceAjax);

// Eliminar un enlace
router.post("/eliminar/:enlaceId", borrarEnlace);

// Votar un enlace vía AJAX
router.post("/votar/:enlaceId/json", votarEnlaceAjax);

module.exports = router;
