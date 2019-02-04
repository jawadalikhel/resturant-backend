const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user.js');

router.get('/test', (req, res) =>{
  res.send('authController is working')
})

router.post('/register', async (req, res) =>{
  try {
    const password = req.body.password;
    const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

    const userEntry = {};
    userEntry.email = req.body.email;
    userEntry.username = req.body.username;
    userEntry.password = passwordHash;
    console.log(userEntry, '<---- this is userEntry data')

    const createUser = await User.create(userEntry);
    req.session.logged = true;
    req.session.username = req.body.username;
    req.session.save();
    console.log(createUser, ' this is the new User created and checking session');
    res.json({
      status: 200,
      data: 'register successful'
    })
  } catch (err) {
    console.log('error at :----->', err);
    res.json({
      status: 401,
      data: err.message
    })
  }
})

router.post('/login', async(req, res) =>{
  try {
    const user = await User.findOne({'username': req.body.username});
    console.log(user, ' this is the user logining')
    if(user){
      if((bcrypt.compareSync(req.body.password, user.password))){
        req.session.logged = true;
        req.session.username = req.body.username;
        req.session.save();
        res.json({
          status: 200,
          data: 'login successful'
        })
        console.log('Login went successful')
      } else {
        console.log('incorrect password')
        res.json({
          status: 401,
          data: 'password wrong'
        })
      }
    }else{
      console.log('incorrect username')
      res.json({
        status: 401,
        data: 'username wrong'
      })
    }

  } catch (err) {
    res.json({
      status: 401,
      data: err.message
    })
  }
})

router.get('/users', async(req, res) =>{
  try {
    const allUsers = await User.find();
    console.log(allUsers, ' <------ these are all the users ');
    res.json({
      status: 200,
      data: allUsers
    })
  } catch (err) {
    res.json({
      status: 401,
      data: err.message
    })
  }
})

router.get('/logout', (req, res) =>{
  req.session.destroy((err) =>{
    if(err){
      res.json({
        status: 404,
        data: 'logout unsuccessful'
      });
    }else {
      res.json({
        status: 200,
        data: 'logout successful'
      })
    }
  })
})

module.exports = router;
