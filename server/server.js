const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/urlShortener')
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

const urlRoutes = require('./routes/url');
app.use('/api', urlRoutes);

const Url = require('./models/Url');

app.get('/:code', async (req, res) => {
    const url = await Url.findOne({ shortCode: req.params.code });

    if (url) {
        return res.redirect(url.originalUrl);
    } else {
        return res.status(404).send("URL not found");
    }
});

app.listen(5000, () => console.log("Server running on port 3000"));