//////////////////////////////////////////////////////////////////
const { Client, Attachment } = require('discord.js');
const client = new Client();
const fs = require('fs');
const request = require('request');
const cron = require('node-cron');
const log4js = require('log4js')
log4js.configure({appenders: {system: { type: 'file', filename: './logs/system.log' }},categories: {default: { appenders: ['system'], level: 'debug' },}});
const logger = log4js.getLogger('system');
//////////////////////////////////////////////////////////////////
function testError(e,code){
  let data = [0,0]
  let test = e.stack.split('\n').find(c=>c.startsWith('    at eval (eval at <anonymous> (eval at <anonymous>'))
  if(test) data = test.replace(/\(|\)/g,'').split(':').slice(-2)
  return [...data,code.split('\n')[data[0]-1]]
}
//////////////////////////////////////////////////////////////////
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.channels.get('599272915153715201').send("test2")
});

client.on('message', async message => {
  if(!message.author.bot){
    if(message.content.startsWith("/code")){
      let code = message.content.replace(/\/code\n|client.destroy()/g,"")
      try {
        let data = await eval(message.content.replace(/\/code\n|client.destroy()/g,""))
        message.channel.send(inspect(data).slice(0,10000),{split:true}).then(msg=>{
          setTimeout(()=>{
            if(msg instanceof Array){
              for(data of msg) data.delete()
            }
            else msg.delete()
          },30*1000);
        });
      } catch (e) {
        let err = testError(e,code);
        message.channel.send({embed:{
          title: e.name,
          thumbnail: {
            url: 'https://media.discordapp.net/attachments/576717465506021380/719155294546165760/image.png'
          },
          color: 0xff0000,
          description: `\`\`\`${e.message}
line: ${err[0]} write: ${err[1]}\`\`\``,
          fields: [
            {
              name: '**code**',
              value: err[2] ? err[2]:'undefined'
            }
          ]
        }})
        console.log(e.message)
      }
    }
  }
});

client.login(process.env.BOT_TOKEN);
