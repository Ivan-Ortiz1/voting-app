// rutas/temaRutas.js
const express = require("express");
const router = express.Router();
const { listarTemas, crearTema, mostrarFormularioEdicion, editarTema } = require("../controladores/temaControlador");

router.get("/", listarTemas);
router.post("/agregar", crearTema);

// Rutas de edición
router.get("/editar/:id", mostrarFormularioEdicion);
router.post("/editar/:id", editarTema);

module.exports = router;
