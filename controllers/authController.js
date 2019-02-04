const express = require('express');
const router = express.Router();

router.get('/msg', (req, res) =>{
  res.send('authController is working')
})

module.exports = router;
