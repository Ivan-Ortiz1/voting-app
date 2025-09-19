// modelos/temaModelo.js
const db = require("../db"); // usamos la misma instancia de db.js

// Temas
function obtenerTemas() {
  return db.prepare("SELECT * FROM temas").all();
}

function agregarTema(titulo) {
  if (!titulo || titulo.trim() === "") return null;

  const stmt = db.prepare("INSERT INTO temas (titulo, votos) VALUES (?, 0)");
  const info = stmt.run(titulo.trim());

  return { id: info.lastInsertRowid, titulo: titulo.trim(), votos: 0, enlaces: [] };
}

function obtenerTemaPorId(id) {
  return db.prepare("SELECT * FROM temas WHERE id = ?").get(id);
}

function actualizarTema(id, nuevoTitulo) {
  if (!nuevoTitulo || nuevoTitulo.trim() === "") return null;

  const stmt = db.prepare("UPDATE temas SET titulo = ? WHERE id = ?");
  const info = stmt.run(nuevoTitulo.trim(), id);

  if (info.changes === 0) return null;
  return obtenerTemaPorId(id);
}

function eliminarTema(id) {
  // Primero eliminar enlaces asociados
  db.prepare("DELETE FROM enlaces WHERE tema_id = ?").run(id);

  const stmt = db.prepare("DELETE FROM temas WHERE id = ?");
  const info = stmt.run(id);
  return info.changes > 0;
}

function votarTema(id) {
  const stmt = db.prepare("UPDATE temas SET votos = votos + 1 WHERE id = ?");
  const info = stmt.run(id);
  if (info.changes === 0) return null;
  return obtenerTemaPorId(id);
}

function obtenerTemasOrdenados() {
  return db.prepare("SELECT * FROM temas ORDER BY votos DESC").all();
}

// Enlaces
function agregarEnlace(temaId, url, nombre) {
  if (!url || !nombre) return null;

  const stmt = db.prepare("INSERT INTO enlaces (tema_id, nombre, url, votos) VALUES (?, ?, ?, 0)");
  const info = stmt.run(temaId, nombre.trim(), url.trim());

  return { id: info.lastInsertRowid, nombre: nombre.trim(), url: url.trim(), votos: 0 };
}

function obtenerEnlace(temaId, enlaceId) {
  return db.prepare("SELECT * FROM enlaces WHERE id = ? AND tema_id = ?").get(enlaceId, temaId);
}

function actualizarEnlace(temaId, enlaceId, nuevoNombre, nuevaUrl) {
  if (!nuevoNombre || !nuevoNombre.trim() || !nuevaUrl || !nuevaUrl.trim()) return null;

  const stmt = db.prepare("UPDATE enlaces SET nombre = ?, url = ? WHERE id = ? AND tema_id = ?");
  const info = stmt.run(nuevoNombre.trim(), nuevaUrl.trim(), enlaceId, temaId);

  if (info.changes === 0) return null;
  return obtenerEnlace(temaId, enlaceId);
}

function eliminarEnlace(temaId, enlaceId) {
  const stmt = db.prepare("DELETE FROM enlaces WHERE id = ? AND tema_id = ?");
  const info = stmt.run(enlaceId, temaId);
  return info.changes > 0;
}

function votarEnlace(temaId, enlaceId) {
  const stmt = db.prepare("UPDATE enlaces SET votos = votos + 1 WHERE id = ? AND tema_id = ?");
  const info = stmt.run(enlaceId, temaId);

  if (info.changes === 0) return null;
  return obtenerEnlace(temaId, enlaceId);
}

module.exports = { 
  obtenerTemas, 
  agregarTema, 
  obtenerTemaPorId, 
  actualizarTema, 
  eliminarTema, 
  votarTema, 
  obtenerTemasOrdenados,
  agregarEnlace,
  obtenerEnlace,
  actualizarEnlace,
  eliminarEnlace,
  votarEnlace
};
