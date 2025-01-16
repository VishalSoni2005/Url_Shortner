const express = require('express');
const urlRoute = require('./routers/url.js');
const app = express();
const { connect } = require('./connect.js');

const urlModel = require('./models/url.js');

// middleware
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.json());
// error handler middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

connect('mongodb://127.0.0.1:27017/short-url-two').then(() => {
  console.log('Connected to MongoDB');
});

app.use('/url', urlRoute);

app.get('/:id', async function (req, res) {
  const idGot = req.params.id;

  try {
    const url = await urlModel.findOneAndUpdate(
      { shortId: idGot },
      { $push: { visitHistory: new Date() } },
      { new: true }, // Return the updated document
    );

    if (!url) {
      return res.status(404).json({ error: 'URL not found' });
    }

    // return res.status(269).json( { msg: 'URL found' }); //! edited
    return res.redirect(url.redirectUrl);
  } catch (err) {
    console.error('Error getting URL:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/analytics/:shortId', async (req, res) => {
  const idGot = req.params.shortId;

  try {
    const url = await urlModel.findOne({ shortId: idGot });

    if (!url) {
      return res.status(404).json({ error: 'URL not found' });
    }

    return res.json({
      analytics: url.visitHistory,
      totalClick: url.visitHistory.length,
    });
  } catch (err) {
    console.error('Error getting analytics:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});
const PORT = 3000;
app.listen(PORT, function () {
  console.log(`Server is running on port ${PORT}`);
});
