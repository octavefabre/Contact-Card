const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(cors({ origin: 'http://localhost:4200' })); //sécurité ici pour limiter l'accés à l'API
app.use(express.json());

// LABELS
app.get('/labels', (req, res) => {
  const labels = db.prepare('SELECT * FROM labels ORDER BY name').all();
  res.json(labels);
});

app.post('/labels', (req, res) => {
  const name = (req.body?.name ?? '').trim();
  if (!name) return res.status(400).json({ error: 'name required' });

  try {
    const info = db.prepare('INSERT INTO labels (name) VALUES (?)').run(name);
    res.status(201).json({ id: info.lastInsertRowid, name });
  } catch {
    const label = db.prepare('SELECT * FROM labels WHERE name = ?').get(name);
    res.json(label);
  }
});

app.delete('/labels/:id', (req, res) => {
  const id = Number(req.params.id);
  db.prepare('DELETE FROM labels WHERE id = ?').run(id);
  res.status(204).send();
});

// CONTACTS
app.get('/contacts', (req, res) => {
  const q = (req.query.q ?? '').toString().trim().toLowerCase();
  if (!q) {
    const contacts = db.prepare('SELECT * FROM contacts ORDER BY id DESC').all();
    return res.json(contacts);
  }
  const contacts = db
    .prepare(
      `
    SELECT * FROM contacts
    WHERE LOWER(name) LIKE ?
    ORDER BY id DESC
  `
    )
    .all(`${q}%`);
  res.json(contacts);
});

app.get('/contacts/:id', (req, res) => {
  const id = Number(req.params.id);
  const contact = db.prepare('SELECT * FROM contacts WHERE id = ?').get(id);
  if (!contact) return res.status(404).json({ error: 'not found' });
  res.json(contact);
});

// CHECK FUNCTION

function checkName(name) {
  if (!name || name.trim().length < 2) {
    console.log('Nom d’artiste invalide');
    return false;
  }

  console.log('Nom d’artiste valide');
  return true;
}
function checkPhone(phone) {
  const usPhoneRegex = /^\+1\s?\(\d{3}\)\s?\d{3}\s?\d{4}$/;

  if (!usPhoneRegex.test(phone)) {
    console.log('Numéro US invalide');
    return false;
  }

  console.log('Numéro US valide');
  return true;
}

function checkEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

//CREATION CONTACT BDD
app.post('/contacts', (req, res) => {
  try {
    const c = req.body ?? {};
    const now = new Date().toISOString();
    const nameValid = checkName(c.name);
    const phoneValid = checkPhone(c.phone);
    const emailValid = checkEmail(c.email);

    if (!nameValid || !phoneValid || !emailValid) {
      return res.status(400).json({ error: 'Invalid Form Data' });
    }

    const info = db
      .prepare(
        `
    INSERT INTO contacts (name,email,phone,album,bestSong,labelId,favorite,notes,photoUrl,photoAlt,createdAt,updatedAt)
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?)
  `
      )
      .run(
        c.name,
        c.email,
        c.phone,
        c.album ?? '',
        c.bestSong ?? '',
        c.labelId ?? null,
        c.favorite ? 1 : 0,
        c.notes ?? '',
        c.photoUrl ?? '',
        c.photoAlt ?? '',
        now,
        now
      );

    const created = db.prepare('SELECT * FROM contacts WHERE id = ?').get(info.lastInsertRowid);
    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.put('/contacts/:id', (req, res) => {
  const id = Number(req.params.id);
  const existing = db.prepare('SELECT * FROM contacts WHERE id = ?').get(id);
  if (!existing) return res.status(404).json({ error: 'not found' });

  const c = req.body ?? {};
  const now = new Date().toISOString();

  db.prepare(
    `
    UPDATE contacts SET
      name=?, email=?, phone=?, album=?, bestSong=?, labelId=?, favorite=?, notes=?, photoUrl=?, photoAlt=?, updatedAt=?
    WHERE id=?
  `
  ).run(
    c.name ?? existing.name,
    c.email ?? existing.email,
    c.phone ?? existing.phone,
    c.album ?? existing.album,
    c.bestSong ?? existing.bestSong,
    c.labelId ?? existing.labelId,
    c.favorite ? 1 : 0,
    c.notes ?? existing.notes,
    c.photoUrl ?? existing.photoUrl,
    c.photoAlt ?? existing.photoAlt,
    now,
    id
  );

  const updated = db.prepare('SELECT * FROM contacts WHERE id = ?').get(id);
  res.json(updated);
});

app.delete('/contacts/:id', (req, res) => {
  const id = Number(req.params.id);
  const contact = db.prepare('SELECT * FROM contacts WHERE id = ?').get(id);
  if (!contact) return res.status(204).send();

  db.prepare('DELETE FROM contacts WHERE id = ?').run(id);

  // si dernier contact du label then supprime le label
  if (contact.labelId !== null) {
    const count = db
      .prepare('SELECT COUNT(*) as n FROM contacts WHERE labelId = ?')
      .get(contact.labelId).n;
    if (count === 0) db.prepare('DELETE FROM labels WHERE id = ?').run(contact.labelId);
  }

  res.status(204).send();
});

app.listen(3000, () => console.log('API running on http://localhost:3000'));
