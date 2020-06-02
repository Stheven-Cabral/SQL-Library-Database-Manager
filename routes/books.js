const express = require('express');
const router = express.Router();
const Books = require('../models').Books;

/***Handler function used to wrap each route */
function asyncHandler(cb) {
  return async(req, res, next) => {
    try{
      await cb(req, res, next);
    } catch (error) {
      console.log(error.status);
      console.log("We're Sorry. Page Not Found");
      res.render('error', {error: error});
    }
  }
}

// get /books redirected from / in index.js - Shows the full list of books.
router.get('/', asyncHandler(async (req, res) => {
  const books = await Books.findAll();
  res.render("index", { books: books, title: "Books" });
}));

// get /books/new - Shows the create new book form.
router.get('/new', asyncHandler((req, res) => {
  res.render("new-book", {title: "Add New Book"});
}));

// post /books/new - Posts a new book to the database.
// / is redirected to /books(the url the new book is posted to).
router.post("/", asyncHandler(async (req, res) => {
  const book = await Books.create(req.body);
  res.redirect("/books/" + book.id);
}));

// get /books/:id - Shows book detail form.
router.get('/:id', asyncHandler(async (req, res) => {
  const book = await Books.findByPk(req.params.id);
  res.render("show-update-book", {book: book, title: "Book Details", bookTitle: book.title, author: book.author, genre: book.genre, year: book.year });
}));

// post /books/:id - Updates book info in the database.
router.post("/:id", asyncHandler(async (req, res) => {
  const book = await Books.findByPk(req.params.id);
  await book.update(req.body);
  res.redirect("/books/" + book.id);
}));

// get /books/:id/delete - Shows delete page.
router.get("/:id/delete", asyncHandler(async (req, res) => {
  const book = await Books.findByPk(req.params.id);
  res.render('delete', {book: book, title: "Delete Book"});
}));

// post /books/:id/delete - Deletes a book. 
router.post("/:id/delete", asyncHandler(async (req, res) => {
  const book = await Books.findByPk(req.params.id);
  await book.destroy();
  res.redirect("/books/");
}));



module.exports = router;