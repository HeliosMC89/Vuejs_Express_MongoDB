const express = require('express');
const router = express.Router();
const mongodb = require('mongodb');
const loadPosts = require('../database/posts');

// Get Post
router.get('/', async (request, response) => {
  const posts = await loadPosts();
  const allPosts = await posts.find({}).toArray();
  response.status(200).json(
    allPosts
  );
});

// Create Post
router.post('/', async (request, response) => {
  const posts = await loadPosts();
  const WHITESPACEPATTERN = /^\s*$/;
  let text = request.body.text;
  if (WHITESPACEPATTERN.test(text)) {
    response.status(400).json({
      message: "Publición Vacia",
      error: true
    });
  } else {
    try {
      await posts.insertOne({
        text: text,
        createdAt: new Date()
      });
      response.status(200).json({
        message: "Post creado",
        error: false
      });
    } catch (err) {
      response.status(500).json({
        message: err,
        error: true
      });
    }
  }
})

// Delete post

router.delete('/:id', async (request, response) => {
  let id = request.params.id;
  const posts = await loadPosts();
  try {
    await posts.deleteOne({
      _id: new mongodb.ObjectID(id)
    });
    response.status(200).json({
      message: "Post Eliminado",
      error: false
    });
  } catch (err) {
    response.status(404).json({
      message: "error al eliminar post",
      error: true
    });
  }
})

module.exports = router;
