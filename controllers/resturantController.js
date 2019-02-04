const express = require('express');
const router = express.Router();
const Resturants = require('../models/resturant.js');

router.get('/test', (req, res) =>{
  res.send('returantController is working')
})

// Index Route
router.get('/', async(req, res) =>{
  try {
    const allResturants = await Resturants.find();
    res.json({
      status: 200,
      data: allResturants
    })

  } catch (err) {
    res.json({
      status: 401,
      data: err.message
    })
  }
})

// Add Router
router.post('/', async(req, res) =>{
  try {
    if(req.session.logged === true){
      req.body.createdBy = req.session.username;
      console.log(req.body.username, ' this is req.body.username');

      const createResturant = await Resturants.create(req.body);
      console.log(createResturant, ' this is the createResturant response');

      res.json({
        status: 200,
        data: createResturant
      })
    } else {
      res.json({
        status: 401,
        data: 'uncuccessful'
      })
    }
  } catch (err) {
    res.json({
      status: 401,
      data: err.message
    })
  }
})

// Search Router
router.get('/:id', async(req, res, next) =>{
  try {
    const findResturant = await Resturants.findById(req.params.id);
    res.json({
      status: 200,
      data: findResturant
    })
  } catch (err) {
    res.json({
      status: 401,
      data: err.message
    })
  }
})

module.exports = router;
