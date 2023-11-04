const express = require('express');
const router = express.Router();
const Author = require('../models/author');

router.get('/', async (req, res) => {
  let searchOptions = {};
  let name = req.query.name;
  if (name != null && name != '') {
    searchOptions.name = new RegExp(name, 'i');
  }
  try {
    const authors = await Author.find(searchOptions);
    res.render('authors/index', { authors: authors, searchOptions: req.query });
  } catch {
    res.redirect('/');
  }
});

router.get('/new', (req, res) => {
  res.render('authors/new', { author: new Author() });
});

router.post('/', async (req, res) => {
  const author = new Author({
    name: req.body.name,
  });
  try {
    const newAuthor = await author.save();
    res.redirect('authors');
  } catch (error) {
    res.render('authors/new', {
      author: author,
      errorMessage: 'error creating author',
    });
  }
});

module.exports = router;
