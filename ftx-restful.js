const axios = require('axios');
var crypto = require('crypto');

const ts = Date.now().toString()
const message = `${ts}GET/api/wallet/balances`
var sha256 = crypto.createHmac('sha256', '<secret>').update(message).digest("hex");

axios.get('https://ftx.com/api/wallet/balances', {
  headers: {
    'FTX-KEY': '<key>',
    'FTX-TS': ts.toString(),
    'FTX-SIGN': sha256
  }
})
  .then(function (response) {
    // handle success
    console.log(response.data);
  })
  .catch(function (error) {
    // handle error
    console.log(error.response);
  })
