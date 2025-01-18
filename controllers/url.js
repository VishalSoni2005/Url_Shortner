const shortid = require('shortid');
const urlModel = require('../models/url.js');

async function handleGenerateNewShortUrl(req, res) {
  const body = req.body;

  if (!body.url) {
    return res.status(400).json({ error: 'Please provide a long URL.' });
  }

  let shortID; // short identifier generated randomly
  do {
    shortID = shortid.generate();
  } while (await urlModel.findOne({ shortId: shortID }));

  try {
    await urlModel.create({
      shortId: shortID,
      redirectUrl: body.url,
      visitHistory: [],
    });
    return res.json({ ID: shortID });
  } catch (err) {
    console.error('Error creating short URL:', err);
    return res.status(500).json({ error: 'Internal Server Error hai bhai' });
  }Markdown; Markdown; 
}

//* Handle redirects
// async function handleAnalytics(req, res) {
//   const idGot = req.params.shortId;

//   try {
//     const url = await urlModel.findOne({ shortId: idGot });

//     if (!url) {
//       return res.status(404).json({ error: 'URL not found' });
//     }

//     return res.json({
//       analytics: url.visitHistory,
//       totalClick: url.visitHistory.length,
//     });
//   } catch (err) {
//     console.error('Error getting analytics:', err);
//     return res.status(500).json({ error: 'Internal Server Error' });
//   }
// }

// //! Danger needed to be refactored
// async function handleGetUrl(req, res) {
//   const idGot = req.params.id;

//   try {
//     const url = await urlModel.findOneAndUpdate(
//       { shortId: idGot },
//       { $push: { visitHistory: new Date() } },
//       { new: true }, // Return the updated document
//     );

//     if (!url) {
//       return res.status(404).json({ error: 'URL not found' });
//     }

//     return res.redirect(url.redirectUrl);
//   } catch (err) {
//     console.error('Error getting URL:', err);
//     return res.status(500).json({ error: 'Internal Server Error' });
//   }
// }

module.exports = {
  handleGenerateNewShortUrl,
  // handleGetUrl,
  // handleAnalytics,
};
