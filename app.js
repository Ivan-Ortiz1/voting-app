const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// Configurar motor de plantillas (EJS)
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "vistas"));

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, "publico")));

// Ruta inicial
app.get("/", (req, res) => {
  res.render("index", { mensaje: "Hola Mundo desde Express y EJS 🚀" });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
