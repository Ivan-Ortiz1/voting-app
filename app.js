// app.js
const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "vistas"));
app.use(express.static(path.join(__dirname, "publico")));

// Middleware para leer datos de formularios
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index", { mensaje: "Hola Mundo desde Express y EJS 🚀" });
});

const temaRutas = require("./rutas/temaRutas");
app.use("/temas", temaRutas);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
