const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const searchRouter = require('./routes/search.router');
const watchlistRouter = require('./routes/watchlist.router');
const historyRouter = require('./routes/history.router');
const stockListRouter = require('./routes/stockList.router');
const portfolioRouter = require('./routes/portfolio.router');
const lookupRouter = require('./routes/symbolLookup.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/search', searchRouter);
app.use('/api/watchlist', watchlistRouter);
app.use('/api/history', historyRouter);
app.use('/api/stock-list', stockListRouter);
app.use('/api/portfolio', portfolioRouter);
app.use('/api/lookup', lookupRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
