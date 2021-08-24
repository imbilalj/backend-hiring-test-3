import express from 'express';
import Bookshelf from '../models/bookshelfModel.js';

const router = express.Router();

// @desc     Get all public bookshelves
// @route    Get /api/bookshelves
// @access  Public
router.get('/', async (req, res) => {
  const bookshelves = await Bookshelf.find({});

  // Filtering public bookshelves
  const filteredShelves = bookshelves.filter(
    (bookshelf) => !bookshelf.isPrivate
  );
  res.json(filteredShelves);
});

// @desc    Get bookshelve by ID
// @route   Get /api/bookshelves/:id
// @access  Public
router.get('/:id', async (req, res) => {
  // i in RegExp is flag for case insensitivity
  const volume = await Volume.find({
    name: new RegExp('.*' + req.params.id + '.*', 'i')
  });

  if (volume) {
    res.json(volume);
  } else {
    res.status(404).send({ message: 'Book not Found!' });
  }
});

// @desc    Create new bookshelve against a user ID
// @route   POST /api/bookshelves/new
// @access  Private
router.post('/new', (req, res) => {
  const newShelf = {
    user: req.body.userId,
    name: req.body.name,
    volumes: [...req.body.volumes],
    isPrivate: req.body.isPrivate ? req.body.isPrivate : false
  };

  Bookshelf.create(newShelf);
});

export default router;
