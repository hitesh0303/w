const express = require('express');
const mongoose = require('mongoose');
const Book = require('./models/Book');
const path = require('path');

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

mongoose.connect('mongodb+srv://Sarang:sarang@cluster0.v7uqbbf.mongodb.net/')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB Error:', err));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/add', (req, res) => {
  res.render('add');
});

app.post('/add', async (req, res) => {
  await Book.create(req.body);
  res.redirect('/view');
});

app.get('/view', async (req, res) => {
  const books = await Book.find();
  res.render('view', { books });
});

app.get('/update', async (req, res) => {
  const books = await Book.find();
  res.render('update', { books });
});

app.post('/update/:id', async (req, res) => {
  await Book.findByIdAndUpdate(req.params.id, req.body);
  res.redirect('/view');
});

app.get('/delete', async (req, res) => {
  const books = await Book.find();
  res.render('delete', { books });
});

app.post('/delete/:id', async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  res.redirect('/view');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
