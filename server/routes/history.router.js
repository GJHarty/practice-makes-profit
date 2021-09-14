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
    // let date = new Date();
    let today = Math.round(Date.now() / 1000);
    axios({
        method: 'GET',
        url: 'https://finnhub.io/api/v1/stock/candle',
        params: {
            token: process.env.FIN_API_KEY,
            symbol: req.query.symbol,
            resolution: 'D',
            from: today - 2629743 * 4,
            to: today,
        }
    }).then(apiRes => {
        res.send(apiRes.data);
    }).catch(err => {
        console.log('giphy error', err);
        res.sendStatus(500);
    })
});

module.exports = router;
