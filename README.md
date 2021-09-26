# Practice Makes Profit

Hello and welcome to Practice Makes Profit. With the recent explosion of the housing market, my mother has been looking into selling her house, but she doesn’t exactly know what to do with all that extra money. I told her to invest it in the stock market, but she said she doesn’t really know where to begin. That’s why I started working on my app, Practice Makes Profit. It allows a user to simulate trading stocks in real time using financial APIs, without taking on any risk to your hard earned money. My app sets itself apart from the competition by focusing on the basics, and helping educate the user on the process of trading so they don’t end up drowning in a sea of knowledge. I urge you to invest some of your time into my app where there’s no risk and high reward.

## Setup

Simply clone the respository and install the node modules. This is a React app so you will have to run the server and client seperately.
```
npm install
npm run server
npm run client
```
You will also have to setup a postgres database using the data listed in the database.sql file in the main directory.

Next you will have to configure your .env file. The two keys needed are below. You wil have to sign up for a development key at www.finnhub.io. 
```
SERVER_SESSION_SECRET=YOUR_CUSTOM_PASSWORD
FIN_API_KEY=YOUR_FINNHUB_API_KEY
```


## Starting Out
The landing page allows a user to register or login if they have already registered. All usernames must be unique and there is no requirements for passwords. Authentication for this app is handled by Passport. On Login, the user will be brought to the account page. On this page the user can view their available funds and add more if they want to.

<a href="https://imgur.com/5WCuozv"><img src="https://i.imgur.com/5WCuozv.png" title="source: imgur.com" /></a>

## Info Page

On the info page a user is able to get a quick rundown of how to use the application. Navigation is done on the left side and each page contains a little information about what they can do and even contains a helpful video.

<a href="https://imgur.com/Qe5ObFw"><img src="https://i.imgur.com/Qe5ObFw.png" title="source: imgur.com" /></a>

## Search Page

The search page allows the user to query the Finnhub API in order to pull stock market data in real-time and post a transaction using their simulated bank account. Searching with the keyword field will generate a list of cards and clicking on a card searches the API for that particular symbol. The user can also search for a specific symbol without going through the keyword search.

<a href="https://imgur.com/qXWpA1f"><img src="https://i.imgur.com/qXWpA1f.png" title="source: imgur.com" /></a>

Clicking on the generated accordian will reveal stats on the current day values of that stock and a graph showing the the last 80+ days of closing prices as well as two buttons: Watch and Buy. Clicking the watch button will add that stock to their watchlist. Clicking the buy button will generate a modal. Entering in a quantity and clicking buy will post that transaction to the database and redirect the user to the portfolio page.

<a href="https://imgur.com/FfavpfL"><img src="https://i.imgur.com/FfavpfL.png" title="source: imgur.com" /></a>

## Portfolio Page

The portfolio page lists all currently owned shares. It also provides a sum of the value of all owned shares and also displays a percentage return of investment to track progress (default is 100%). When the accordian is expanded the user can see their transaction history and buy or sell their shares. When all shares are sold they also have the option of removing the stock from their account.

<a href="https://imgur.com/d0YXWjO"><img src="https://i.imgur.com/d0YXWjO.png" title="source: imgur.com" /></a>

## Watchlist Page

This is where all stocks that have been watched will appear. The only difference between this page and the search page stock display is the option to remove it from your watchlist.

<a href="https://imgur.com/dubOVKZ"><img src="https://i.imgur.com/dubOVKZ.png" title="source: imgur.com" /></a>





