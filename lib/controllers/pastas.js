const { Router } = require('express');
const Pasta = require('../models/Pasta');

module.exports = Router()
  .post('/', async (req, res) => {
    const pasta = await Pasta.insert(req.body);
    res.send(pasta);
  })

  .get('/', async (req, res) => {
    const pasta = await Pasta.getAll();
    res.send(pasta);
  })

  .get('/:id', async (req, res, next) => {
    try {
      const pasta = await Pasta.getById(req.params.id);
      res.send(pasta);
    } catch (error) {
      error.status = 404;
      next(error);
    }
  });
