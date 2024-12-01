const express = require('express');
const mongoose = require('mongoose');
const Product = require('./model/product.model');
const dotenv = require('dotenv');
const productRoute = require('./routes/product.route');

const app = express();
app.use(express.json());

dotenv.config({ path: './config.env' });

app.use('/api/products', productRoute);

app.get('/', (req, res) => {
  res.send('Hello From CRUD Api');
});

const DB = process.env.DATABASE.replace(
  '<db_password>',
  process.env.DB_PASSWORD
);

const port = process.env.PORT || 3001;

mongoose
  .connect(DB)
  .then(() => {
    console.log('DB Connections successfully...');

    app.listen(port, (req, res) => {
      console.log(`App listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
