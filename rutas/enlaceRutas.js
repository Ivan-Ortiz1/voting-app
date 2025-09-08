const express = require("express");
const router = express.Router({ mergeParams: true });
const { crearEnlace, editarEnlace, borrarEnlace, votarEnlaceAjax } = require("../controladores/temaControlador");

// CRUD de enlaces
router.post("/agregar", crearEnlace);
router.post("/editar/:enlaceId", editarEnlace);
router.post("/eliminar/:enlaceId", borrarEnlace);
router.post("/votar/:enlaceId/json", votarEnlaceAjax);

module.exports = router;
