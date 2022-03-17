const { Router } = require('express');
const Sweet = require('../models/Sweet');

module.exports = Router()
  .post('/', async (req, res) => {
    const sweet = await Sweet.insert(req.body);
    res.send(sweet);
  })

  .get('/', async (req, res) => {
    const sweets = await Sweet.getAll();
    res.send(sweets);
  })

  .get('/:id', async (req, res, next) => {
    try {
      const sweet = await Sweet.getById(req.params.id);
      res.send(sweet);
    } catch (error) {
      error.status = 404;
      next(error);
    }
  });

