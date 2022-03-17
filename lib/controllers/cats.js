const { Router } = require('express');
const Cat = require('../models/Cat');

module.exports = Router()
  .post('/', async (req, res) => {
    const cat = await Cat.insert(req.body);
    res.send(cat);
  })

  .get('/', async (req, res) => {
    const cat = await Cat.getAll();
    res.send(cat);
  })

  .get('/:id', async (req, res, next) => {
    try {
      const cat = await Cat.getById(req.params.id);
      res.send(cat);
    } catch (error) {
      error.status = 404;
      next(error);
    }
  });

