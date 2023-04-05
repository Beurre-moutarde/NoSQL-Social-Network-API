const express = require('express');
const mongoose = require('mongoose');


const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.use(require('./routes'));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/social-network-API', {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.set('debug', true);

db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server for ${activity} running on port ${PORT}!`);
    });
  });