const { Router } = require('express');
const Planet = require('../models/Planet');

module.exports = Router() 
  .post('/', async (req, res) => {
    const planet = await Planet.insert(req.body);
    res.send(planet);
  })

  .get('/', async (req, res) => {
    const planet = await Planet.getAll();
    res.send(planet);
  })

  .get('/:id', async (req, res, next) => {
    try {
      const planet = await Planet.getById(req.params.id);
      res.send(planet);
    } catch (error) {
      error.status = 404;
      next(error);
    }
  });
