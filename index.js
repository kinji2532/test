const { Client, Attachment } = require('discord.js');
const client = new Client();
const fs = require('fs');
const request = require('request');
const cron = require('node-cron');
const log4js = require('log4js')

log4js.configure({
  appenders: {
    system: { type: 'file', filename: './logs/system.log' }
  },
  categories: {
    default: { appenders: ['system'], level: 'debug' },
  }
});
const logger = log4js.getLogger('system');

process.on('uncaughttException',(err)=>{
  client.channels.get('599272915153715201').send("予期せぬエラーが起きたよ！");
  try{
    client.channels.get('599272915153715201').send([err])
  }catch{}
  console.log(err)
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.channels.get('599272915153715201').send("test")
});

client.login(process.env.BOT_TOKEN);
