const router = require('express').router();

const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
  } = require('../../controllers/thoughtController');
  
  // Set up GET all and POST at /api/thoughts
  router
    .route('/')
    .get(getThoughts)
    .post(createThought);
  
  // Set up GET one, PUT, and DELETE at /api/thoughts/:id
  router
    .route('/:id')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought);
  
  // Post at /api/thoughts/:thoughtId/reactions
  router
    .route('/:thoughtId/reactions')
    .post(createReaction);
  
    router
    .route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction);
  
  module.exports = router;

