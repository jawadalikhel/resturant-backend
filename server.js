const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const AuthController = require('./controllers/authController.js');
const ResturantController = require('./controllers/resturantController.js');
const UserController = require('./controllers/userController.js');

require('./db/db.js');

app.use(bodyParser.urlencoded({extends: false}));
app.use(bodyParser.json());

app.use('/auth', AuthController);
app.use('/resturant', ResturantController);
app.use('/user', UserController);

app.listen(9000, () =>{
  console.log('server is live on port 9000')
})
