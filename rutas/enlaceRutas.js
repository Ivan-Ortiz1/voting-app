const express = require("express");
const router = express.Router({ mergeParams: true });
const { 
  crearEnlace, 
  editarEnlace, 
  editarEnlaceAjax, 
  borrarEnlace, 
  votarEnlaceJson 
} = require("../controladores/enlaceControlador");

// CRUD de enlaces
router.post("/agregar", crearEnlace);
router.post("/editar/:enlaceId", editarEnlace);
router.post("/editar/:enlaceId/json", editarEnlaceAjax);
router.post("/eliminar/:enlaceId", borrarEnlace);
router.post("/votar/:enlaceId/json", votarEnlaceJson);

module.exports = router;
