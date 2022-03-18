const { Router } = require('express');
const Pasta = require('../models/Pasta');

module.exports = Router()
  .post('/', async (req, res) => {
    const pasta = await Pasta.insert(req.body);
    res.send(pasta);
  });
