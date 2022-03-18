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
  })

  .patch('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const updatedCat = await Cat.updateById(id, req.body);

      if (!updatedCat){
        const error = new Error(`Cat ${id} not found`);
        error.status = 404;
        throw error;
      }
      res.json(updatedCat);
    } catch (error) {
      next(error);
    }
  })

  .delete('/:id', async (req, res) => {
    const cat = await Cat.deleteById(req.params.id);
    res.send(cat);
  });
