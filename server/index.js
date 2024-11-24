require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const shopRoutes = require('./routes/shopRoutes');
const cartRoutes = require('./routes/cartRoutes');

const app = express()
const PORT = process.env.PORT || 8888;
// MIDDLEWARES
app.use(cookieParser());
app.use(express.json());
//app.use('/uploads', express.static('uploads'));


app.use(
  cors({
    origin: 'https://flower-shop-zsdd-exsewhrrj-ritika-mehtas-projects.vercel.app/',
    methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'],
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

app.get('/', (req, res) => {
  res.send('Backend is running!');
});


//ROUTES
app.use('/api/auth', authRoutes);
app.use('/api/shop', shopRoutes);
app.use('/api/cart', cartRoutes);


app.listen(PORT, () => console.log(`server is now running on port ${PORT}`));
