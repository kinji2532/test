//////////////////////////////////////////////////////////////
const { Client, MessageAttachment } = require('discord.js');
const client = new Client();
const fs = require('fs');
const request = require('request');
const cron = require('node-cron');
const log4js = require('log4js');
const path = require("path");
const https = require("https");
const rimraf = require("rimraf")
const zipfolder = require("zip-folder")
const { Canvas } = require("canvas-constructor");
const { inspect } = require('util');
log4js.configure({appenders: {system: { type: 'file', filename: './logs/system.log' }},categories: {default: { appenders: ['system'], level: 'debug' },}});
const logger = log4js.getLogger('system');
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
  let data = [0,0]
  let test = e.stack.split('\n').find(c=>c.match('eval'));
  if(test) data = test.replace(/\(|\)/g,'').split(':').slice(-2)
  return {
    embed:{
      title: e.name,
      thumbnail: {
        url: 'https://media.discordapp.net/attachments/576717465506021380/719155294546165760/image.png'
      },
      color: 0xff0000,
      description: `\`\`\`${e.message}
line: ${data[0]} write: ${data[1]-revision}\`\`\``,
      fields: [
        {
          name: '**code**',
          value: code.split('\n')[data[0]-1] ? code.split('\n')[data[0]-1]:'undefined'
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
      client.channels.cache.get('599272915153715201').send('mainCode:エラーが起きたよ！',testError(e,contxt));
    }
  })
}
//////////////////////////////////////////////////////////////////
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

process.on('unhandledRejection',async error => {
  client.channels.cache.get('599272915153715201').send('unhandled:'+inspect(error),{split:true}).then(msg=>setTimeout(()=>try{msg.delete()}catch{},5000))
});

process.on('uncaughtException',async (reason,p) => {
  client.channels.cache.get('599272915153715201').send('uncaught:'+inspect(reason),{split:true}).then(msg=>setTimeout(()=>try{msg.delete()}catch{},5000))
});

client.login(process.env.BOT_TOKEN);
