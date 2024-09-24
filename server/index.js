require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');

const app = express()
const PORT = process.env.PORT || 8888;


app.use(
  cors({
    origin: 'http://localhost:5173',
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

// MONDOGB CONNECTION
mongoose.connect(`mongodb+srv://${process.env.DB_HOST}:${process.env.DB_PASS}@${process.env.DB_NAME}.m6joo.mongodb.net/`).then(() => console.log("MongoDb connected")).catch((error) => console.log(error));


//GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  
})






// MIDDLEWARES
app.use(cookieParser());
app.use(express.json());


//ROUTES
app.use('/api/auth', authRoutes);


app.listen(PORT, () => console.log(`server is now running on port ${PORT}`));