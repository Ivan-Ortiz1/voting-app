// migracion.js
const Database = require("better-sqlite3");
const db = new Database("./voting.db");

// Crear tablas
db.prepare(`
  CREATE TABLE IF NOT EXISTS temas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT NOT NULL,
    votos INTEGER DEFAULT 0
  )
`).run();

db.prepare(`
  CREATE TABLE IF NOT EXISTS enlaces (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tema_id INTEGER NOT NULL,
    nombre TEXT NOT NULL,
    url TEXT NOT NULL,
    votos INTEGER DEFAULT 0,
    FOREIGN KEY (tema_id) REFERENCES temas(id) ON DELETE CASCADE
  )
`).run();

// Insertar datos de prueba
const temasPrueba = [
  { titulo: "JavaScript", votos: 3 },
  { titulo: "Node.js y Express", votos: 5 },
  { titulo: "Bases de Datos", votos: 2 }
];

const insertTema = db.prepare("INSERT INTO temas (titulo, votos) VALUES (?, ?)");
temasPrueba.forEach(t => insertTema.run(t.titulo, t.votos));

console.log("Migración completada: tablas creadas y temas de prueba insertados.");
