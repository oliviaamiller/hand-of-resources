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
  });
