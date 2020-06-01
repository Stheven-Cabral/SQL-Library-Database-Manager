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
  const books = await Books.findAll();
  res.render("index", { books: books, title: "Books" });
}));

// get /books/new - Shows the create new book form.
router.get('/new', asyncHandler((req, res) => {
  res.render("new-book", {title: "Add New Book"});
}));

// post /books/new - Posts a new book to the database.
// /books is the url the new book is posted to.
// router.post("/", asyncHandler((req, res) => {
//   // Add article id
//   res.redirect("/books/");
// }));

// get /books/:id - Shows book detail form.
router.get('/:id', asyncHandler(async (req, res) => {
  const book = await Books.findByPk(req.params.id);
  res.render("show-update-book", {book: book, title: "Book Details", bookTitle: book.title, author: book.author, genre: book.genre, year: book.year });
}));

// post /books/:id - Updates book info in the database.
router.post("/:id", asyncHandler(async (req, res) => {
  const book = await Books.findByPk(req.params.id);
  console.log(req);
  // await book.update(req.body);
  res.redirect("/books/" + book.id);
}));

// post /books/:id/delete - Deletes a book. Careful, this can’t be undone. It can be helpful to create a new “test” book to test deleting.
// router.post('/:id/delete', asyncHandler(async (req ,res) => {
//   const article = await Books.findByPk(req.params.id);
//   await article.destroy();
//   res.redirect("/books");
// }));

module.exports = router;