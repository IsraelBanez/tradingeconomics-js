## Trading Economics for NodeJS

[![npm version](https://img.shields.io/npm/v/tradingeconomics.svg)](https://www.npmjs.com/package/tradingeconomics)

The Trading Economics NPM package provides direct access to our data. It allows you to request millions of rows of economic historical data, to query our real-time economic calendar and to subscribe to updates. 


#

## Installation

- Prior Steps:

Install [Node.js](https://nodejs.org/en) and Clone Repository

- Step 1: Using NPM

```bash
npm install -g tradingeconomics
```

- Step 1(v2): Using GitHub

```bash

git clone https://github.com/tradingeconomics/tradingeconomics-js.git
cd tradingeconomics-js
npm i
```
- Step 2: Add Chart
```bash
cd web-app
npm install chart.js react-chartjs-2
```
#

## Figma Board and Site Host (via Netify)
_**Figma:**_
https://www.figma.com/file/cwsrW1XJfj4TY5uUTCm8hy/GeoIndex?type=design&node-id=0%3A1&mode=design&t=YayWpXj4FWWMrlh1-1

_**Site:**_
https://tradingeconomic-thldswdn.netlify.app/
#

## How to Run

Step 1:
```bash
cd web-app
```
Step 2:
```bash
npm start
```

#

## Requirements

```javascript
const te = require('tradingeconomics');
```

#

## Authentication

Authentication using Environment Variable (more secure)

```javascript
apikey="key:secret" node app.js
```

Authentication using inline code

```javascript
te.login('guest:guest'); # replace with your key
```

#

## Examples

```javascript
te.getHistoricalData(country = 'mexico', indicator = 'gdp').then(function(data){
  console.log(data)       
});
```

```javascript
te.getCalendar().then(function(data){
    console.log(data)       
});
```

```javascript
te.getEarnings(symbol = 'aapl:us', start_date = '2016-01-01', end_date = '2017-12-31')
  .then((data) => {
    console.log(data);
  })
  .catch((err) => console.log(err));
```

#

## More examples

https://github.com/tradingeconomics/tradingeconomics-js/tree/main/Examples

#

## Docker

Please set apikey with your credentials

```javascript
docker run --rm -it --init --name te-nodejs -e apikey='guest:guest' tradingeconomics/nodejs:latest sh
```

```javascript
node Calendar/events.js
node Indicators/historical.js
node Markets/marketForecast.js
ls # to view for more examples
```
#

## Documentation
https://docs.tradingeconomics.com

#

## Learn More

https://tradingeconomics.com/analytics/api.aspx



