const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "vistas"));
app.use(express.static(path.join(__dirname, "publico")));

// Middleware para leer datos de formularios
app.use(express.urlencoded({ extended: true }));

// Middleware para parsear JSON (para AJAX)
app.use(express.json());

// Rutas
const temaRutas = require("./rutas/temaRutas");
app.use("/temas", temaRutas);
app.use("/temas/editar/:temaId/enlaces", require("./rutas/enlaceRutas"));

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
