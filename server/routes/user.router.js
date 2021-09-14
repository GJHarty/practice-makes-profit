const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);
  // const accountBalance = 25000;
  // const availableBalance = 25000;
  // const isFirstTime = true;

  const queryText = `INSERT INTO "user" (username, password)
    VALUES ($1, $2) RETURNING id`;
  pool
    .query(queryText, [username, password])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('User registration failed: ', err);
      res.sendStatus(500);
    });
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

router.put('/', rejectUnauthenticated, (req,res) => {
  console.log('update balance payload', req.body);

  let updatedBalance;

  if (req.body.operator === 'decrease'){
    updatedBalance = req.body.availableBalance - req.body.totalCost;
  } else if (req.body.operator === 'increase'){
    updatedBalance = req.body.availableBalance + req.body.totalCost;
  }

  const query = `
  UPDATE "user"
  SET "availableBalance" = $1
  WHERE "id"=$2;
  `;
  const params = [updatedBalance, req.user.id];

  pool.query(query, params)
    .then(dbRes => {
      res.sendStatus(200);
    })
    .catch(err => {
      res.sendStatus(500);
    });
});

router.put('/funds/', rejectUnauthenticated, (req, res) => {
  console.log('req.body', req.body);
  const query = `
  UPDATE "user"
  SET "accountBalance"="accountBalance" + $1, "availableBalance"="availableBalance" + $1
  WHERE "id"=$2;
  `;

  const params = [req.body.fundsToAdd, req.user.id];

  pool.query(query, params)
    .then(dbRes => {
      res.sendStatus(200);
    })
    .catch(err => {
      console.log('Error increasing user funds', err);
      res.sendStatus(500)
    })
});

router.delete('/', rejectUnauthenticated, (req, res) => {
  const query = `
  DELETE FROM "user"
  WHERE "id"=$1;
  `;

  const params = [req.user.id];

  pool.query(query, params)
    .then(dbRes => {
      res.sendStatus(200);
    })
    .catch(err => {
      console.log('Error deleting user form database', err);
      res.sendStatus(500);
    });
})

router.put('/first-visit', rejectUnauthenticated, (req, res) => {
  const query = `
  UPDATE "user"
  SET "isFirstTime" = false
  WHERE "id" = $1;
  `;

  const params = [req.user.id];

  pool.query(query, params) 
    .then(dbRes => {
      res.sendStatus(200);
    })
    .catch(err => {
      res.sendStatus(500);
    });
})

module.exports = router;
