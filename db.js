// db.js
const path = require("path");
const Database = require("better-sqlite3");

const dbPath = path.join(__dirname, "voting.db");
const db = new Database(dbPath, { verbose: console.log });

console.log("Conectado a la base de datos SQLite");

module.exports = db;
