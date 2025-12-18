const Database = require("better-sqlite3");
const db = new Database("data.sqlite");

db.exec(`
CREATE TABLE IF NOT EXISTS labels (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS contacts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  album TEXT,
  bestSong TEXT,
  labelId INTEGER NULL,
  favorite INTEGER NOT NULL DEFAULT 0,
  notes TEXT,
  photoUrl TEXT,
  photoAlt TEXT,
  createdAt TEXT NOT NULL,
  updatedAt TEXT NOT NULL,
  FOREIGN KEY (labelId) REFERENCES labels(id) ON DELETE SET NULL
);
`);

module.exports = db;