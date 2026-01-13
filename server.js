const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// In-memory storage for vinyl records
// In production, this would be a database
let records = [
  {
    id: '1',
    artist: 'Pink Floyd',
    album: 'The Dark Side of the Moon',
    year: 1973,
    genre: 'Progressive Rock',
    condition: 'Excellent',
    notes: 'Original pressing'
  },
  {
    id: '2',
    artist: 'The Beatles',
    album: 'Abbey Road',
    year: 1969,
    genre: 'Rock',
    condition: 'Very Good',
    notes: 'Remastered edition'
  },
  {
    id: '3',
    artist: 'Miles Davis',
    album: 'Kind of Blue',
    year: 1959,
    genre: 'Jazz',
    condition: 'Excellent',
    notes: 'Classic jazz album'
  }
];

let nextId = 4;

// GET /api/records - Get all records
app.get('/api/records', (req, res) => {
  res.json(records);
});

// GET /api/records/:id - Get a single record
app.get('/api/records/:id', (req, res) => {
  const record = records.find(r => r.id === req.params.id);
  if (!record) {
    return res.status(404).json({ error: 'Record not found' });
  }
  res.json(record);
});

// POST /api/records - Create a new record
app.post('/api/records', (req, res) => {
  const { artist, album, year, genre, condition, notes } = req.body;
  
  if (!artist || !album) {
    return res.status(400).json({ error: 'Artist and album are required' });
  }
  
  const newRecord = {
    id: String(nextId++),
    artist: artist.trim(),
    album: album.trim(),
    year: year ? parseInt(year) : null,
    genre: genre ? genre.trim() : '',
    condition: condition || 'Good',
    notes: notes ? notes.trim() : '',
    createdAt: new Date().toISOString()
  };
  
  records.push(newRecord);
  res.status(201).json(newRecord);
});

// PUT /api/records/:id - Update a record
app.put('/api/records/:id', (req, res) => {
  const recordIndex = records.findIndex(r => r.id === req.params.id);
  if (recordIndex === -1) {
    return res.status(404).json({ error: 'Record not found' });
  }
  
  const { artist, album, year, genre, condition, notes } = req.body;
  
  if (!artist || !album) {
    return res.status(400).json({ error: 'Artist and album are required' });
  }
  
  records[recordIndex] = {
    ...records[recordIndex],
    artist: artist.trim(),
    album: album.trim(),
    year: year ? parseInt(year) : null,
    genre: genre ? genre.trim() : '',
    condition: condition || 'Good',
    notes: notes ? notes.trim() : '',
    updatedAt: new Date().toISOString()
  };
  
  res.json(records[recordIndex]);
});

// DELETE /api/records/:id - Delete a record
app.delete('/api/records/:id', (req, res) => {
  const recordIndex = records.findIndex(r => r.id === req.params.id);
  if (recordIndex === -1) {
    return res.status(404).json({ error: 'Record not found' });
  }
  
  records.splice(recordIndex, 1);
  res.status(204).send();
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', service: 'vinyl-collection', recordsCount: records.length });
});

app.listen(PORT, () => {
  console.log(`🎵 Vinyl Collection Manager running on port ${PORT}`);
  console.log(`📀 Visit http://localhost:${PORT} to manage your collection`);
});
