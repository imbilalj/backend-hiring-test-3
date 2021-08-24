import express from 'express';
import { Volume } from '../models/volumeModel.js';

const router = express.Router();

// @desc     Get all books
// @route    Get /api/books
// @access  Public
router.get('/', async (req, res) => {
  const volumes = await Volume.find({});
  res.json(volumes);
});

// @desc    Get book by searched name
// @route   Get /api/books/:name
// @access  Public
router.get('/:name', async (req, res) => {
  const volume = await Volume.find({
    name: new RegExp('.*' + req.params.name + '.*', 'i')
  });

  if (volume) {
    res.json(volume);
  } else {
    res.status(404).send({ message: 'Book not Found!' });
  }
});

// @desc    Create new volume
// @route   POST /api/volumes/new
// @access  Private
router.post('/new', async (req, res) => {
  const newVolume = new Volume({
    name: req.body.name,
    edition: req.body.edition,
    noOfPages: req.body.noOfPages,
    author: req.body.author
  });

  const insertedVolume = await newVolume.save();
  res.status(201).json(insertedVolume);
});

export default router;
