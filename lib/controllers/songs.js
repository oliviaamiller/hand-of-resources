const { Router } = require('express');
const Song = require('../models/Song');

module.exports = Router() 
  .post('/', async (req, res) => {
    const song = await Song.insert(req.body);
    res.send(song);
  })

  .get('/', async (req, res) => {
    const songs = await Song.getAll();
    res.send(songs);
  })

  .get('/:id', async (req, res, next) => {
    try {
      const song = await Song.getById(req.params.id);
      res.send(song);
    } catch (error) {
      error.status = 404;
      next(error);
    }
  })

  .patch('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const updatedSong = await Song.updateById(id, req.body);

      if (!updatedSong){
        const error = new Error(`Song ${id} not found`);
        error.status = 404;
        throw error;
      }

      res.json(updatedSong);
    } catch(error) {
      next(error);
    }
  });

