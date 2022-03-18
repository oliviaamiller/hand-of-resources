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
  })

  .patch('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const updatedPlanet = await Planet.updateById(id, req.body);

      if (!updatedPlanet){
        const error = new Error(`Planet ${id} not found`);
        error.status = 404;
        throw error;
      }

      res.json(updatedPlanet);
    } catch (error) {
      next(error);
    }
  })

  .delete('/:id', async (req, res) => {
    const planet = await Planet.deleteById(req.params.id);
    res.send(planet);
  });
