//////////////////////////////////////////////////////////////
const { Client, MessageAttachment } = require('discord.js');
const client = new Client();
const fs = require('fs');
const request = require('request');
const cron = require('node-cron');
const log4js = require('log4js');
const path = require("path");
const https = require("https");
const unzip = require('node-unzip-2');
const rimraf = require("rimraf")
const zipfolder = require("zip-folder")
const { Canvas } = require("canvas-constructor");
const { inspect } = require('util');
log4js.configure({appenders: {system: { type: 'file', filename: './logs/system.log' }},categories: {default: { appenders: ['system'], level: 'debug' },}});
const logger = log4js.getLogger('system');
const J = {
  s:function(data){
    return JSON.stringify(data);
  },
  p:function(data){
    return JSON.parse(data);
  },
  c:function(data){
    return this.p(this.s(data));
  }
}
let typeError = data => {
  return [];
}
let messageCode = message =>{
  if(message.content.startsWith('test')) eval(message.content.replace(/^test/g,''))
}
let unhandledCode = () => {}
let uncaughtCode = () => {}
let deleteCode = () => {}
let memberAddCode = () => {}
let memberRemoveCode = () => {}
let updateCode = () => {}
let reactionAddCode = () => {}
let reactionRemoveCode = () => {}
//////////////////////////////////////////////////////////////////
function testError(e,code="",revision=0){
  const data = J.c(e.stack.match(/>:(?<line>.*?):(?<column>.*?)\)/)?.groups||[])
  const message = typeError(`${e.name}: ${e.message}`)
  return {
    embed:{
      title: (message[0]||e.name),
      thumbnail: {
        url: 'https://media.discordapp.net/attachments/576717465506021380/719155294546165760/image.png'
      },
      color: 0xff0000,
      description: `\`\`\`${(message[1]||e.message)}
line: ${data.line} write: ${data.column-revision}\`\`\``,
      fields: [
        {
          name: '**code**',
          value: code.split('\n')[data.line-1]||(data.line == 74 ? '実行コード内':e)
        }
      ]
    }
  }
}
function codeConnection(){
  request(process.env.mainCode,(e,r,body)=>{
    try{
      eval(body);
    }catch(e){
      client.channels.cache.get('599272915153715201').send('mainCode:エラーが起きたよ！',testError(e,body));
    }
  })
}
//////////////////////////////////////////////////////////////////
cron.schedule('* * * * *', () => request('https://testrpgbot.glitch.me/',()=>{}));

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  const channel = client.channels.cache.get('599272915153715201');
  channel.bulkDelete(100);
  channel.send("起動");
  codeConnection();
});

client.on('message', message=>{
  if(message.author.id == '395010195090178058' && message.content == 'reload'){
    message.delete();
    codeConnection();
  }
});

client.login(process.env.BOT_TOKEN);
