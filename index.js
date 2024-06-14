require('dotenv').config()
const express = require("express");
const cors = require('cors')
// const bodyParser = require("body-parser");

const usersRouter = require('./routers/users');
const authRouter = require('./routers/auth');
const charactersRouter = require('./routers/characters'); 

const { checkJwt } = require('./middleware');

const app = express();
const port = process.env.PORT || 4001;


app.use(cors())

app.get('/test-auth', checkJwt, (req, res) => {
  console.log('Decoded JWT:', req.user);
  res.json({ message: 'Authenticated', user: req.user });
});

app.use(express.json())


app.use('/users', checkJwt,  usersRouter);
app.use('/characters', checkJwt, charactersRouter);
// app.use('/auth', checkJwt, authRouter);

// app.use('/users', usersRouter)
// app.use('/auth', authRouter)

app.get('/', (req, res) => {
    res.send('Welcome to our server!')
  })
  
  app.listen(port, () => {
   console.log(`Web server is listening on port ${port}!`);
  });