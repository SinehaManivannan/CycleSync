require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

app.use(cors({
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Optional: Specify methods
    credentials: true // Optional: Allow credentials
}));

// User Model Import
const User = require('./models/User');

// Routes
app.post('/user', (req, res) => {
    console.log(User); 
  const newUser = new User(req.body);

  newUser.save()
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));
});

app.get('/users', (req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

// MongoDB Connection
const PORT = process.env.PORT || 8090;
const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.get('/', (req, res) => {
  res.send('CycleSync API Running');
});

app.get('/user', (req, res) => {
    res.send('User Page');
  });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
