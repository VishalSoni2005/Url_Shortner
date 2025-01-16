const express = require('express');
const routes = express.Router();
const {
  handleGenerateNewShortUrl,
  handleGetUrl,
  handleAnalytics,
} = require('../controllers/url.js');

routes.post('/', handleGenerateNewShortUrl);
// routes.get('/:id', handleGetUrl);



module.exports = routes;
