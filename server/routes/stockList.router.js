require('dotenv').config();
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {rejectUnauthenticated} = require('../modules/authentication-middleware');
const axios = require('axios');

/**
 * GET route template
 */
router.get('/', rejectUnauthenticated, (req, res) => {
  axios({
    method: 'GET',
    url: 'https://finnhub.io/api/v1/quote',
    params: {
      token: process.env.FIN_API_KEY,
      symbol: req.query.symbol,
    },
  }).then(apiRes => {
    res.send(apiRes.data);
  }).catch(err => {
    console.log('finnhub error', err);
    res.sendStatus(500);
  });
});

module.exports = router;
