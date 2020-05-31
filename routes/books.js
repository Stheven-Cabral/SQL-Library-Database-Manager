const express = require('express');
const router = express.Router();
// const Books = require('../models').Books;

/***Handler function used to wrap each route */
function asyncHandler(cb) {
  return async(req, res, next) => {
    await cb(req, res, next)
  }
}

// get /books redirected from / in index.js - Shows the full list of books.
router.get('/', asyncHandler((req, res) => {
  res.render("index");
}));

// get /books/new - Shows the create new book form.
// router.get('/new', asyncHandler((req, res) => {
//   res.render("new-book");
// }));

// post /books/new - Posts a new book to the database.
// /books is the url the new book is posted to.
// router.post("/", asyncHandler((req, res) => {
//   // Add article id
//   res.redirect("/books/");
// }));

// get /books/:id - Shows book detail form.
// router.get("/:id", asyncHandler((req, res) => {
//   res.render("show");
// }));

// post /books/:id - Updates book info in the database.
// router.get("/:id/edit", asyncHandler((req, res) => {
//   res.render("update-book");
// }));

// post /books/:id/delete - Deletes a book. Careful, this can’t be undone. It can be helpful to create a new “test” book to test deleting.
// router.post('/:id/delete', asyncHandler(async (req ,res) => {
//   const article = await Books.findByPk(req.params.id);
//   await article.destroy();
//   res.redirect("/books");
// }));

module.exports = router;