// rutas/temaRutas.js
const express = require("express");
const router = express.Router();
const { 
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
} = require("../controladores/temaControlador");

// --------------------
// Rutas de Temas
// --------------------

// Listar y crear
router.get("/", listarTemas);
router.post("/agregar", crearTema);

// Edición
router.get("/editar/:id", mostrarFormularioEdicion);
router.post("/editar/:id", editarTema);

// NUEVA ruta AJAX para editar temas en tiempo real
router.post("/editar/:id/json", editarTemaAjax);

// Eliminación
router.post("/eliminar/:id", borrarTema);

// Votación
router.post("/votar/:id", votar);          // flujo clásico
router.post("/votar/:id/json", votarAjax); // flujo AJAX en tiempo real

// --------------------
// Rutas de Enlaces (anidadas en cada tema)
// --------------------

// Crear, editar y eliminar enlaces
router.post("/editar/:temaId/enlaces/agregar", crearEnlace);
router.post("/editar/:temaId/enlaces/:enlaceId/editar", editarEnlace);
router.post("/editar/:temaId/enlaces/:enlaceId/eliminar", borrarEnlace);

// Votación AJAX para enlaces
router.post("/editar/:temaId/enlaces/:enlaceId/votar/json", votarEnlaceAjax);

module.exports = router;
