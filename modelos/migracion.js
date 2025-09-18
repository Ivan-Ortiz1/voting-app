const Database = require("better-sqlite3");
const db = new Database("./voting.db");

// Crear tabla de temas
db.prepare(`
  CREATE TABLE IF NOT EXISTS temas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT NOT NULL,
    votos INTEGER DEFAULT 0
  )
`).run();

// Crear tabla de enlaces
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

console.log("Migración completada: tablas creadas.");
