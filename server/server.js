require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const app = express();

const cors = require('cors');
app.use(cors());

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Atlas connected"))
  .catch(err => console.log(err));

const urlRoutes = require('./routes/url');
app.use('/api', urlRoutes);

const Url = require('./models/Url');
app.get('/', (req, res) => {
  res.send("URL Shortener API is running 🚀");
});

app.get('/:code', async (req, res) => {
    try {
        const url = await Url.findOne({ shortCode: req.params.code });

        if (url) {
            return res.redirect(url.originalUrl);
        } else {
            return res.status(404).send("URL not found");
        }
    } catch (err) {
        res.status(500).send("Server error");
    }
});

app.listen(5000, () => console.log("Server running on port 5000"));