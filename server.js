// Import required modules
const express = require('express');
const bodyParser = require('body-parser');

// Create Express app
const app = express();

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Sample data - usually, this would come from a database
let books = [
  { id: 1, title: 'Book 1', author: 'Author 1' },
  { id: 2, title: 'Book 2', author: 'Author 2' },
  { id: 3, title: 'Book 3', author: 'Author 3' }
];

// GET endpoint to retrieve all books
app.get('/api/books', (req, res) => {
  res.json(books);
});

// GET endpoint to retrieve a specific book by ID
app.get('/api/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const book = books.find(book => book.id === id);
  if (!book) {
    return res.status(404).json({ error: 'Book not found' });
  }
  res.json(book);
});

// POST endpoint to add a new book
app.post('/api/books', (req, res) => {
  const { title, author } = req.body;
  const id = books.length + 1;
  const newBook = { id, title, author };
  books.push(newBook);
  res.status(201).json(newBook);
});

// PUT endpoint to update a book by ID
app.put('/api/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { title, author } = req.body;
  const index = books.findIndex(book => book.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Book not found' });
  }
  books[index] = { id, title, author };
  res.json(books[index]);
});

// DELETE endpoint to delete a book by ID
app.delete('/api/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = books.findIndex(book => book.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Book not found' });
  }
  const deletedBook = books.splice(index, 1)[0];
  res.json(deletedBook);
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
