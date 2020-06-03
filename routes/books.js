const express = require('express');
const router = express.Router();
const Books = require('../models').Books;

/***Handler function used to wrap each route */
function asyncHandler(cb) {
  return async(req, res, next) => {
      await cb(req, res, next);
  }
}

// get /books redirected from / in index.js - Shows the full list of books.
router.get('/', asyncHandler(async (req, res) => {
  const books = await Books.findAll({
    order: [['title', 'ASC']]
  });
  res.render("index", { books: books, title: "Books" });
}));

// get /books/new - Shows the create new book form.
router.get('/new', asyncHandler((req, res) => {
  res.render("new-book", {title: "Add New Book"});
}));

// post /books/new - Posts a new book to the database.
// / is redirected to /books(the url the new book is posted to).
router.post("/", asyncHandler(async (req, res) => {
  let book;
  try {
    book = await Books.create(req.body);
    res.redirect("/books/" + book.id);
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      book = await Books.build(req.body);
      res.render("new-book", {book: book, errors: error.errors, title: "Add New Book"});
    }
  }
}));

// get /books/:id - Shows book detail form.
router.get('/:id', asyncHandler(async (req, res) => {
  const book = await Books.findByPk(req.params.id);
  if (book) {
    res.render("show-update-book", {book: book, title: "Book Details", bookTitle: book.title, author: book.author, genre: book.genre, year: book.year });
  } else {
    const err= new Error('Sorry! There was an unexpected error on the server.');
    console.log(err);
    res.render('error');
  }
}));

// post /books/:id - Updates book info in the database.
router.post("/:id", asyncHandler(async (req, res) => {
  let book;
  try {
    book = await Books.findByPk(req.params.id);
    await book.update(req.body);
    res.redirect("/books/" + book.id);
  } catch {
    if (error.name === 'SequelizeValidationError') {
      book = await Books.build(req.body);
      res.render("new-book", {book: book, errors: error.errors, title: "Add New Book"});
    }
  }
}));

// get /books/:id/delete - Shows delete page.
router.get("/:id/delete", asyncHandler(async (req, res) => {
  const book = await Books.findByPk(req.params.id);
  if (book) {
    res.render('delete', {book: book, title: "Delete Book"});
  } else {
    const err= new Error('Sorry! There was an unexpected error on the server.');
    console.log(err);
    res.render('error');
  }
}));

// post /books/:id/delete - Deletes a book. 
router.post("/:id/delete", asyncHandler(async (req, res) => {
  const book = await Books.findByPk(req.params.id);
  await book.destroy();
  res.redirect("/books/");
}));


module.exports = router;