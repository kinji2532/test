const { Client, Attachment } = require('discord.js');
const client = new Client();
const fs = require('fs');
const request = require('request');
const cron = require('node-cron');

process.on('uncaughttException',(err)=>{
  client.channels.get('599272915153715201').send("予期せぬエラーが起きたよ！");
  try{
    client.channels.get('599272915153715201').send([err])
  }catch{}
  console.log(err)
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity('れきゅねこ教',{
    type : 'PLAYING'
  })
  client.channels.get('599272915153715201').bulkDelete(100)
  client.channels.get('599272915153715201').send("リログしました。")
  let url = 'https://www.dropbox.com/s/9hw6i2tdkz1dpf8/index-reki.js?dl=1'
  let text = fs.createWriteStream('reki.js');
  request.get(url).on('error',console.error).pipe(text)
  text.on('finish',()=>{
    try{
      let txt = fs.readFileSync('reki.js','utf-8');
      eval(txt);
    }catch(e){
      client.channels.get('599272915153715201').send(`エラーが起きたよ！\n${e.message}`);
    }
    fs.unlinkSync('reki.js')
  })
});

/*
https://dashboard.heroku.com/apps/kinjisbot/resources
cd discordbot2/
git init
heroku git:remote -a kinjisbot
git add .
git commit -m "First commit"
git push heroku master --force
*/

/*memo
let statusfile = new Attachment(pass + '/status.json')
message.channel.send(statusfile);
*/
client.login(process.env.BOT_TOKEN);
