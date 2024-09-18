const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');


mongoose.connect("mongodb+srv://mehtaritika:TtkGt9bgfYN2CENw@petalpalettedb.m6joo.mongodb.net/").then(() => console.log("MongoDb connected")).catch(() => console.log(error));


const app = express()
const PORT = process.env.PORT || 8888;


app.use(
  cors({
    origin: 'http://localhost:5173/',
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'Cache-Control',
      'Expires',
      'Pragma'
    ],
    credentials: true
  })
);

app.use(cookieParser());
app.use(express.json());


app.listen(PORT, () => console.log(`server is now running on port ${PORT}`));