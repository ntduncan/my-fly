const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const bodyParser = require('body-parser');

const catchRoutes = require('./routes/catchRoutes');

const app = express();

//Mongodb Connections
const username = process.env.TROUT_USER;
const password = process.env.TROUT_PASSWORD;
const MONGODB_URI = `mongodb+srv://${username}:${password}@cluster0.nevjq.mongodb.net/myTrout?retryWrites=true&w=majority`;
// const mongoCon = process.env.mongoCon || MONGODB_URI;

const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions'
  });


//Middleware

// Add support for CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  );
  next();
});



// app.use(express.json())
app.use(
    session({
      secret: 'my secret',
      resave: false,
      saveUninitialized: false,
      store: store
    })
  );
  
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());

//Routes
app
  .get('/test', (req, res) => {
    res.send("<h1>Hello World</h1>")
})
  .use('/', catchRoutes)

  const PORT = process.env.PORT || 5001;

  mongoose
  .connect(MONGODB_URI)
  .then(result => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
        console.log("Server connected at:", PORT);
      });
  })
  .catch(err => {
    console.log(err);
  });