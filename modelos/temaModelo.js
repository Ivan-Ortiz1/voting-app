// modelos/temaModelo.js
const db = require("../db"); 

// Temas
function obtenerTemas() {
  return db.prepare("SELECT * FROM temas").all();
}
// Prepara e inserta un nuevo tema en la tabla 'temas'
function agregarTema(titulo) {
  if (!titulo || titulo.trim() === "") return null;

  const stmt = db.prepare("INSERT INTO temas (titulo, votos) VALUES (?, 0)");
  const info = stmt.run(titulo.trim());

  return { id: info.lastInsertRowid, titulo: titulo.trim(), votos: 0, enlaces: [] };
}
// Obtiene un tema de la base de datos por su ID y lo devuelve como objeto
function obtenerTemaPorId(id) {
  return db.prepare("SELECT * FROM temas WHERE id = ?").get(id);
}
// Actualiza el título de un tema existente y devuelve el objeto actualizado
function actualizarTema(id, nuevoTitulo) {
  if (!nuevoTitulo || nuevoTitulo.trim() === "") return null;

  const stmt = db.prepare("UPDATE temas SET titulo = ? WHERE id = ?");
  const info = stmt.run(nuevoTitulo.trim(), id);

  if (info.changes === 0) return null;
  return obtenerTemaPorId(id);
}
// Elimina un tema y todos sus enlaces asociados, devuelve true si se borró
function eliminarTema(id) {
  // Primero eliminar enlaces asociados
  db.prepare("DELETE FROM enlaces WHERE tema_id = ?").run(id);

  const stmt = db.prepare("DELETE FROM temas WHERE id = ?");
  const info = stmt.run(id);
  return info.changes > 0;
}
// Incrementa en 1 los votos de un tema y devuelve el objeto actualizado
function votarTema(id) {
  const stmt = db.prepare("UPDATE temas SET votos = votos + 1 WHERE id = ?");
  const info = stmt.run(id);
  if (info.changes === 0) return null;
  return obtenerTemaPorId(id);
}
// Devuelve todos los temas ordenados por cantidad de votos (de mayor a menor)
function obtenerTemasOrdenados() {
  return db.prepare("SELECT * FROM temas ORDER BY votos DESC").all();
}

// Enlaces
// Agrega un nuevo enlace asociado a un tema y lo devuelve con votos iniciales en 0
function agregarEnlace(temaId, url, nombre) {
  if (!url || !nombre) return null;

  const stmt = db.prepare("INSERT INTO enlaces (tema_id, nombre, url, votos) VALUES (?, ?, ?, 0)");
  const info = stmt.run(temaId, nombre.trim(), url.trim());

  return { id: info.lastInsertRowid, nombre: nombre.trim(), url: url.trim(), votos: 0 };
}
// Obtiene un enlace específico por su ID y el ID del tema al que pertenece
function obtenerEnlace(temaId, enlaceId) {
  return db.prepare("SELECT * FROM enlaces WHERE id = ? AND tema_id = ?").get(enlaceId, temaId);
}
// Actualiza un enlace de un tema y devuelve el objeto actualizado, o null si falla
function actualizarEnlace(temaId, enlaceId, nuevoNombre, nuevaUrl) {
  if (!nuevoNombre || !nuevoNombre.trim() || !nuevaUrl || !nuevaUrl.trim()) return null;

  const stmt = db.prepare("UPDATE enlaces SET nombre = ?, url = ? WHERE id = ? AND tema_id = ?");
  const info = stmt.run(nuevoNombre.trim(), nuevaUrl.trim(), enlaceId, temaId);

  if (info.changes === 0) return null;
  return obtenerEnlace(temaId, enlaceId);
}
// Elimina un enlace específico de un tema y devuelve true si se borró correctamente
function eliminarEnlace(temaId, enlaceId) {
  const stmt = db.prepare("DELETE FROM enlaces WHERE id = ? AND tema_id = ?");
  const info = stmt.run(enlaceId, temaId);
  return info.changes > 0;
}
// Incrementa en 1 los votos de un enlace y devuelve el objeto actualizado, o null si no existe
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
