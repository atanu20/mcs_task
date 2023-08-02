require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const path = require('path');


const userTable = require('./models/user');



const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());


// Routes
app.use('/api/task', require('./routes/userRouter'));

app.get('/', (req, res) => {
  res.send('welcome to MCS');
});

// Connect to mongodb
const URI = process.env.MONGODB_URL;
mongoose.connect(
  URI,
  {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log('Connected to mongodb');
  }
);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('Server is running on port', PORT);
});
