//////////////////////////////////////////////////////////////////
const { Client, Attachment } = require('discord.js');
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
let messageCode = message =>{}
let deleteCode = message =>{}
let memberAddCode = member =>{}
let memberRemoveCode = member =>{}
let updateCode = (Omsg,Nmsg) =>{}
//////////////////////////////////////////////////////////////////
function testError(e,code){
  let data = [0,0]
  let test = e.stack.split('\n').find(c=>c.startsWith('    at eval (eval at <anonymous> (eval at <anonymous>'))
  if(test) data = test.replace(/\(|\)/g,'').split(':').slice(-2)
  return {
    embed:{
      title: e.name,
      thumbnail: {
        url: 'https://media.discordapp.net/attachments/576717465506021380/719155294546165760/image.png'
      },
      color: 0xff0000,
      description: `\`\`\`${e.message}
line: ${data[0]} write: ${data[1]}\`\`\``,
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
  let url = process.env.mainCode
  let text = fs.createWriteStream('main.txt');
  request.get(url).on('error',console.error).pipe(text)
  text.on('finish',async ()=>{
    let contxt;
    try{
      contxt = fs.readFileSync('main.txt','utf-8');
      await eval(contxt);
    }catch(e){
      client.channels.cache.get('599272915153715201').send('mainCode:エラーが起きたよ！',testError(e,contxt));
    }
    fs.unlinkSync('main.txt')
    console.log(messageCode)
    console.log(deleteCode)
    console.log(updateCode)
    console.log(memberAddCode)
    console.log(memberRemoveCode)
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

client.on('message', messageCode);

client.login(process.env.BOT_TOKEN);
