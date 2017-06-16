'use strict';

const line = require('@line/bot-sdk');
const middleware = require('@line/bot-sdk').middleware;
const express = require('express');
const request = require('request');
const bp = require('body-parser');

// create LINE SDK config from env variables
const config = {
  channelAccessToken: 'aAMls5K18jevEiIZZlJ1zyu5u8gLxv7FGOYcaHak5tt2Zni2NfzWs5nfapzErLNnBsK8TlaCnHJvxBg1md67eMxWaFPl9GE/sCKzFpC0mM1ai70aKau/lF+0svFNjCWq8Zv1+RMvO4eRAVeYfoEybwdB04t89/1O/w1cDnyilFU=',
  channelSecret: '047a51ae1557c6a602e7a417d2e68182',
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

var messageReturn = 'ว่าไงนะ อีกทีสิ ';
var messageRand = ['ง่วงจัง','กี่โมงแล้ว ?','ขอบคุณค่ะ','คิดถึงนะ','ไสว่าซิบ่ถิ่มกัน','beta test เอ๋อๆหน่อย','หิวข้าวอะ','ดริ้งกันไหม','อย่าว่ากันดิ'];
var messageHa = ['lol','ขำหรอ ?','666666','5555555','ตลกจัง','อารมณ์ดีเพราะมีความสุข','ขำหาพร่อง','อิอิ','ตลกละดิ'];
// event handler
function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    // ignore non-text-message event
    return Promise.resolve(null);
  }
if( event.message.text === 'สวัสดี' || event.message.text === 'hello' || event.message.text === 'Hello')
{
	messageReturn = 'สวัสดีเหมือนกันจ้า';
}
else if( event.message.text === 'ควย' || event.message.text === 'สัส' || event.message.text === 'เหี้ย ' || event.message.text === 'กวย')
{
	messageReturn = 'ไม่พูดหยาบคายนะค่ะสัส ';
}
else if (event.message.text.indexOf("ทำ") + 1)
{
	messageReturn = 'ไม่บอกหรอก ความลับ';
}
else if (event.message.text.indexOf(".") + 1)
{
	var item = messageRand[Math.floor(Math.random()*messageRand.length)];
	messageReturn = item;
}
else if (event.message.text.indexOf("55") + 1)
{
	var item = messageHa[Math.floor(Math.random()*messageHa.length)];
	messageReturn = item;
}
else if (event.message.text.indexOf("กี่โมง") + 1)
{
	var thday = new Array ("อาทิตย์","จันทร์","อังคาร","พุธ","พฤหัส","ศุกร์","เสาร์"); 
	var thmonth = new Array ("มกราคม","กุมภาพันธ์","มีนาคม","เมษายน","พฤษภาคม","มิถุนายน", "กรกฎาคม","สิงหาคม","กันยายน","ตุลาคม","พฤศจิกายน","ธันวาคม");
	var date = new Date();
	messageReturn = 'วัน '+ thday[now.getDay()]+ "ที่ "+ now.getDate()+ " " + thmonth[now.getMonth()]+ " " + (0+now.getYear()+543);
}
else if (event.message.text.indexOf("ร้องเพลง") + 1)
{
	
	messageReturn = 'ให้มัน หะ หะ หะ หะ หะ หายยยยย';
}
else if (event.message.text.indexOf("ขำ") + 1)
{
	
	messageReturn = 'แล้วแต่ ...';
}
else if (event.message.text.indexOf("น่ารัก") + 1)
{
	
	messageReturn = 'ใครๆก็ว่าแบบนั้นนะ';
}
else if (event.message.text.indexOf("อิอิ") + 1)
{
	var item = messageRand[Math.floor(Math.random()*messageRand.length)];
	messageReturn = item;
}
else
{
	messageReturn = '';
}
  const echo = { type: 'text', text: messageReturn };
  
  return client.replyMessage(event.replyToken, echo);
}



// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
