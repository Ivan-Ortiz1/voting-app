// rutas/temaRutas.js
const express = require("express");
const router = express.Router();

// Controladores
const temaControlador = require("../controladores/temaControlador");
const enlaceControlador = require("../controladores/enlaceControlador");

// Rutas de Temas

// Listar todos los temas
router.get("/", temaControlador.listarTemas);

// Crear un nuevo tema
router.post("/agregar", temaControlador.crearTema);

// Mostrar formulario para editar un tema
router.get("/editar/:id", temaControlador.mostrarFormularioEdicion);

// Editar un tema
router.post("/editar/:id", temaControlador.editarTema);

// Editar un tema vía AJAX
router.post("/editar/:id/json", temaControlador.editarTemaAjax);

// Eliminar un tema
router.post("/eliminar/:id", temaControlador.borrarTema);

// Votar un tema
router.post("/votar/:id", temaControlador.votar);

// Votar un tema vía AJAX
router.post("/votar/:id/json", temaControlador.votarAjax);


module.exports = router;
