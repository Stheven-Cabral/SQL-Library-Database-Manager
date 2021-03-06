const express = require('express');
const router = express.Router();
const Books = require('../models').Books;

/*asyncHandler function used to wrap each route */
function asyncHandler(cb) {
  return async(req, res, next) => {
      await cb(req, res, next);
  }
}

// get '/' route redirected to '/books' route in index.js - Shows the full list of books.
router.get('/', asyncHandler(async (req, res) => {
  const books = await Books.findAll({
    order: [['title', 'ASC']]
  });
  res.render("index", { books: books, title: "Books" });
}));

// get /books/new route - Shows the create new book form.
router.get('/new', asyncHandler((req, res) => {
  res.render("new-book", {title: "Add New Book"});
}));

// post '/' route - Posts a new book to the library database.
router.post("/", asyncHandler(async (req, res) => {
  let book;
  try {
    book = await Books.create(req.body);
    res.redirect("/books/" + book.id);
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      book = await Books.build(req.body);
      res.render("new-book", {book: book, errors: error.errors, title: "Add New Book"});
    } else {
      throw error;
    }
  }
}));

// get /books/:id route - Shows clicked book details and update form.
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

// post /books/:id route - Updates book information in the database.
router.post("/:id", asyncHandler(async (req, res) => {
  let book;
  try {
    book = await Books.findByPk(req.params.id);
    await book.update(req.body);
    res.redirect("/books/" + book.id);
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      book = await Books.build(req.body);
      res.render("new-book", {book: book, errors: error.errors, title: "Add New Book"});
    } else {
      throw error;
    }
  }
}));

// get /books/:id/delete route - Shows confirm delete page.
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

// post /books/:id/delete route - Deletes a book. 
router.post("/:id/delete", asyncHandler(async (req, res) => {
  const book = await Books.findByPk(req.params.id);
  await book.destroy();
  res.redirect("/books/");
}));

module.exports = router;