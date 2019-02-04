const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const AuthController = require('./controllers/authController.js');
const ResturantController = require('./controllers/resturantController.js');
const UserController = require('./controllers/userController.js');

require('./db/db.js');

app.use(session({
  secret: 'find me resturants',
  resave: false,
  saveUninitialized: false
}))

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/auth', AuthController);
app.use('/api/v1/resturant', ResturantController);
app.use('/user', UserController);

app.listen(process.env.PORT || 9000, () =>{
  console.log('server is live on port 9000')
})
