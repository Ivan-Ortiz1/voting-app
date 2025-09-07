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
  votarAjax 
} = require("../controladores/temaControlador");

router.get("/", listarTemas);
router.post("/agregar", crearTema);

// Edición
router.get("/editar/:id", mostrarFormularioEdicion);
router.post("/editar/:id", editarTema);

// Eliminación
router.post("/eliminar/:id", borrarTema);

// Votación
router.post("/votar/:id", votar);          // flujo clásico
router.post("/votar/:id/json", votarAjax); // flujo AJAX en tiempo real

module.exports = router;
