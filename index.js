//////////////////////////////////////////////////////////////
const { Client, MessageAttachment, MessageEmbed } = require('discord.js');
const client = new Client({
  restTimeOffset:1,
  intents: [
    "GUILDS", "GUILD_MEMBERS", "GUILD_BANS", "GUILD_EMOJIS",
    "GUILD_INTEGRATIONS", "GUILD_WEBHOOKS", "GUILD_INVITES",
    "GUILD_VOICE_STATES", "GUILD_PRESENCES", "GUILD_MESSAGES",
    "GUILD_MESSAGE_REACTIONS", "GUILD_MESSAGE_TYPING", "DIRECT_MESSAGES",
    "DIRECT_MESSAGE_REACTIONS", "DIRECT_MESSAGE_TYPING"
  ]
});
const fs = require('fs');
const request = require('request');
const cron = require('node-cron');
const path = require("path");
const https = require("https");
const unzip = require('node-unzip-2');
const rimraf = require("rimraf");
const zipfolder = require("zip-folder");
const { Canvas } = require("canvas-constructor");
const { inspect } = require('util');
const Py = require('python-shell').PythonShell;
const J = {
  s:function(data,what,indent){
    return JSON.stringify(data,what,indent);
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
let interactionCode = () => {}
//////////////////////////////////////////////////////////////////

function testError(e,code="",revision=0){
  const data = J.c(e.stack.match(/>:(?<line>.*?):(?<column>.*?)\)/)?.groups||{line:-1,column:-1})
  const message = typeError(`${e.name}: ${e.message}`)
  return {
    embeds:[
      {
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
            value: data.line == -1 ? 'error':code.split('\n')[data.line-1]||'実行コード内'
          }
        ]
      }
    ]
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

function firstExecution(){
  client.channels.resolve('638962687719768085').messages.fetch({limit:100}).then(msgs=>msgs.map(msg=>eval(msg.content)));
}
//////////////////////////////////////////////////////////////////
cron.schedule('* * * * *', () => request('http://testrpgbot.glitch.me/',()=>{}));

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  const channel = client.channels.cache.get('599272915153715201');
  channel.bulkDelete(100);
  channel.send("起動");
  codeConnection();
  firstExecution();
});

client.on('message', message=>{
  if(message.author.id == '395010195090178058' && message.content == 'reload'){
    message.delete();
    codeConnection();
  }
});
client.on('message',(...eventData)=>messageCode(...eventData));
client.on('messageReactionAdd',(...eventData)=>reactionAddCode(...eventData));
client.on('messageDelete',(...eventData)=>deleteCode(...eventData));
client.on('messageUpdate',(...eventData)=>updateCode(...eventData));

client.ws.on('INTERACTION_CREATE',interaction=>interactionCode(interaction));

client.login(process.env.BOT_TOKEN);
