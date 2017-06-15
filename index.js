'use strict';

const line = require('@line/bot-sdk');
const express = require('express');

// create LINE SDK config from env variables
const config = {
  channelAccessToken: process.env.aAMls5K18jevEiIZZlJ1zyu5u8gLxv7FGOYcaHak5tt2Zni2NfzWs5nfapzErLNnBsK8TlaCnHJvxBg1md67eMxWaFPl9GE/sCKzFpC0mM1ai70aKau/lF+0svFNjCWq8Zv1+RMvO4eRAVeYfoEybwdB04t89/1O/w1cDnyilFU=,
  channelSecret: process.env.047a51ae1557c6a602e7a417d2e68182,
};
// create LINE SDK client
const client = new line.Client(config);

// create Express app
// about Express itself: https://expressjs.com/
const app = express();
app.use(middleware(config))
app.use(bp.json())

// register a webhook handler with middleware
// about the middleware, please refer to doc
app.post('/webhook', (req, res) => {
	//console.log(req);
	Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
	.catch((err)=>{console.log(err)})
});

// event handler
function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    // ignore non-text-message event
    return Promise.resolve(null);
  }

  call_msgservice(event.source.userId,event.message.text)
  .then((echo)=>client.replyMessage(event.replyToken, echo))
  .then((result)=>Promise.resolve(result))
  .catch((err)=>Promise.reject(result))
}

// call message service
const call_msgservice = (userId,msg) => {
    console.log('call_msgservice: ' + msg);
    return new Promise((resolve, reject) => {
        const formdata = { user: userId, text: msg };
        request.post(process.env.URL_BAEBYBOT_MESSAGE, { form: formdata }, function (error, response, body) {
            if (!error) {
                const rr = JSON.parse(body);
                const echo = { type: 'text', text: rr['restext'] };
                console.log('call_msgservice: success');
                resolve(echo);
            } else {
                console.log('call_msgservice: fail');
                reject(error);
            }
        })
    })
}

// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});