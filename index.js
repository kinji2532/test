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
