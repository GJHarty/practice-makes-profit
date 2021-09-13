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
        AVG("price") as "avgPrice",
        sum("quantity" * "price") as "totalHoldings",
        sum("quantity") as "totalQuantity" 
    FROM "purchasedStocks"
    WHERE "userId"=$1
    GROUP BY "stockSymbol"
    ORDER BY "stockSymbol"
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

router.get('/transactions', rejectUnauthenticated, (req, res) => {
  console.log('req.user', req.user);
  const query = `
  SELECT * FROM "purchasedStocks"
  WHERE "userId"=$1 AND "stockSymbol"=$2
  ORDER BY "timestamp";
  `;

  const params = [req.user.id, req.query.symbol];
  
  pool.query(query, params)
    .then(dbRes => {
      console.log('transaction res', dbRes.rows);
      res.send(dbRes.rows);
    })
    .catch(err => {
      console.log('error posting purchased stock', err);
      res.sendStatus(500);
    });
});

router.delete('/', rejectUnauthenticated, (req, res) => {
  console.log('req.body', req.body);

  const query = `
  DELETE FROM "purchasedStocks"
  WHERE "userId" = $1 AND "stockSymbol" = $2;
  `;

  const params = [req.user.id, req.body.symbol];

  pool.query(query, params)
    .then(dbRes => {
      res.sendStatus(200);
    })
    .catch(err => {
      console.log('Error deleting from database', err);
      res.sendStatus(500)
    })
})

module.exports = router;