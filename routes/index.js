const express = require('express');
const router = express.Router();

/* GET home page redirects to the books route. */
router.get('/', (req, res, next) => {
  res.redirect("/books")
});

module.exports = router;