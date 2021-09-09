require('dotenv').config();
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {rejectUnauthenticated} = require('../modules/authentication-middleware');
const axios = require('axios');

router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('req.user', req.user);
    const query = `
    SELECT
        "stockSymbol",
        "price",
        sum("quantity") as "totalQuantity" 
    FROM "purchasedStocks"
    WHERE "userId"=$1
    GROUP BY "stockSymbol","price";
    `;
  
    const params = [req.user.id];
    
    pool.query(query, params)
      .then(dbRes => {
        console.log(dbRes.rows);
        res.send(dbRes.rows);
      })
      .catch(err => {
        console.log('error posting purchased stock', err);
        res.sendStatus(500);
      });
});

module.exports = router;