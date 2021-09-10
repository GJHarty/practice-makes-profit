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
    url: 'https://finnhub.io/api/v1/search',
    params: {
      token: process.env.FIN_API_KEY,
      q: req.query.q,
    },
  }).then(apiRes => {
      let filteredResults = [];
      for (let result of apiRes.data.result){
        if (result.symbol.length <= 4){
            filteredResults.push(result);
        }
      }
    res.send(filteredResults);
  }).catch(err => {
    console.log('finnhub error', err);
    res.sendStatus(500);
  });
});

module.exports = router;