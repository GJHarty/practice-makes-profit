require('dotenv').config();
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {rejectUnauthenticated} = require('../modules/authentication-middleware');
const axios = require('axios');


router.post('/', rejectUnauthenticated, (req, res) => {
    console.log('chat is', req.body.newChat);
    const query = `
    INSERT INTO "chat"
        ("message","userId")
    VALUES
        ($1, $2);
    `;
    const params = [req.body.newChat, req.user.id];
    pool.query(query, params)
        .then(dbRes => {
            res.sendStatus(200);
        })
        .catch(err => {
            console.error('Error posting chat to db', err);
            res.sendStatus(500);
        })
});

router.get('/', rejectUnauthenticated, (req, res) => {
    const query = `
    SELECT *
    FROM "chat"
    WHERE "userId"=$1
    ORDER BY "timeStamp" ASC
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