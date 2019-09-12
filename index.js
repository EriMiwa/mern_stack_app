const express = require('express');
const uuidv1 = require('uuid/v1');
const employees = require('./models/employees');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const ATLAS_URI = process.env.ATLAS_URI;

mongoose.connect(ATLAS_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});
const connection = mongoose.connection;
connection.once('open', () => {
  //when connection succeeds
  console.log('mongoDB connection worked!');
})

// Routes
app.use('/api/employees', require('./routes/employees'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started at port ${PORT}`))