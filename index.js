const { Client, Attachment } = require('discord.js');
const client = new Client();
const fs = require('fs')
let one;
let two;
let logmessage;
let dl = [];
let el;
let saymode = true;
let dummy;
let component = [
  {
    "name":"minecraft:behavior.avoid_mob_type",
    "value": `
      "minecraft:behavior.avoid_mob_type": {
        "entity_types": [
          {
            "filters": {
              "test" :  "",
              "subject" : "",
               "value" :  ""
            },
            "max_dist": 6,
            "walk_speed_multiplier": 1,
            "sprint_speed_multiplier": 1.2
          }
        ]
      },`
},
  {
    "name":"minecraft:behavior.beg",
    "value": `
      "minecraft:behavior.beg": {
        "look_distance": 1,
        "look_time": 1,
        "items": [ "" ]
      },`
  },
  {
    "name":"minecraft:behavior.break_doors",
    "value": `
      "minecraft:behavior.break_door": {}`
  },
  {
    "name":"minecraft:behavior.stomp_turtle_egg",
    "value": `
    "minecraft:behavior.stomp_turtle_egg": {
      "priority": 4,
      "speed_multiplier": 1,
      "search_range": 10,
      "search_height": 3,
      "goal_radius": 1.14,
      "search_count": 4,
      "interval": 20
    },`
  },
  {
    "name":"minecraft:behavior.breed",
    "value": `
    "minecraft:behavior.breed": {},`
  },
  {
    "name":"minecraft:behavior.charge_held_item",
    "value": `
    "minecraft:behavior.charge_held_item": {
      "items": [ "minecraft:arrow" ]
    },`
  },
  {
    "name":"minecraft：behavior.defend_village_target",
    "value": `
    "minecraft:behavior.defend_village_target": {
      "filters": {},
      "max_dist": 1,
      "walk_speed_multiplier": 1,
      "sprint_speed_multiplier": 1,
      "must_see": 1,
      "must_see_forget_duration": 1
    },`
  },
  {
    "name":"minecraft：behavior.drink_potion",
    "value": `
    "minecraft:behavior.drink_potion": {
      "priority": 1,
      "speed_modifier": 0.0,
      "potions": [
        {
          "id": 7,
          "chance": 1.0,
          "filters": {}
        }
      ]
    },`
  },
  {
    "name":"minecraft：behavior.door_interact",
    "value": `
      "minecraft：behavior.door_interact": {},`
  },
  {
    "name":"minecraft：behavior.eat_block",
    "value": `
    "minecraft:behavior.eat_block": {
      "on_eat": {
        "event": "",
        "target": "self"
      }
    },`
  },
  {
    "name":"minecraft：behavior.explore_outskirts",
    "value": ``
  },
  {
    "name":"minecraft：behavior.flee_sun",
    "value": `
    "minecraft:behavior.flee_sun": {
      "speed_multiplier": 3
    },`
  },
  {
    "name":"minecraft：behavior.float",
    "value": `
      "minecraft：behavior.float": {},`
  },
  {
    "name":"minecraft：behavior.follow_owner",
    "value": `
    "minecraft:behavior.follow_owner": {
      "speed_multiplier": 1.0,
      "start_distance": 10,
      "stop_distance": 2
    },`
  },
  {
    "name":"minecraft：behavior.follow_parent",
    "value": `
    "minecraft:behavior.follow_parent": {
      "speed_multiplier": 1.1
    },`
  },
  {
    "name":"",
    "value": ``
  },
  {
    "name":"",
    "value": ``
  },
  {
    "name":"",
    "value": ``
  }
]
let replay = [
  {
    "name": "れきゅ",
    "message": "よんだ？"
  },
  {
    "name": "おはよ",
    "message": "おはよー！"
  },
  {
    "name": "おやすみ",
    "message": "おやすみなさーい"
  },
  {
    "name": "ただいま",
    "message": "おかえりなさい！"
  },
  {
    "name": "疲れた",
    "message": "お疲れ様です"
  }
]
let pass = __dirname
let status;
let chickenji = require(pass + '/chickenji.json')
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity('れきゅねこ教',{
    type : 'PLAYING'
  })
  client.channels.get('599272915153715201').send("リログしました。")
  client.channels.get('618798426758447114').fetchMessages({ limit: 10 }).then(messages =>{
    for(data of messages){
      if(data[1].content.startsWith('{"status":')){
        writefile(data[1].content,'status.json');
        break;
      }
    }
  })
});

function test(A){
  if (A == "equ"){
    return "has_equipment"
  }else if (A == "dam"){
    return "has_damage"
  }else if (A == "com"){
    return "has_component"
  }else if (A == "tag"){
    return "has_tag"
  }else if (A == "sne"){
    return "is_sneaking"
  }else if (A == "eff"){
    return "has_mob_effect"
  }else{
    return A
  }
}
function operator(A){
  if (A == "="){
    return "==";
  }else if (A == "!"){
    return "!=";
  }else if (A == undefined){
    return " ";
  }else{
    return A
  }
}
function value(A){
  if (A == undefined){
    return " ";
  }else {
    return A;
  }
}
function filter(A,B,C,D,E){
  if (D !== undefined){
    if (B == "self" || B == "other" || B == "target" || B == "player"){
      if (E !== undefined){
        let filter = `{
    "test": "${test(A)}",
    "subject": "${B}",
    "operator": "${operator(C)}",
    "domain": "${D}",
    "value": "${value(E)}"
  }`;
        return filter;
      }else if (/=|<|>|not|!|equals/.test(C)){
        let filter = `{
    "test": "${test(A)}",
    "subject": "${B}",
    "operator": "${operator(C)}",
    "value": "${value(D)}"
  }`;
        return filter;
      }else{
        let filter = `{
    "test": "${test(A)}",
    "subject": "${B}",
    "domain": "${C}",
    "value": "${value(D)}"
  }`;
        return filter;
      }
    }else{
      let filter = `{
  "test": "${test(A)}",
  "operator": "${operator(B)}",
  "domain": "${C}",
  "value": "${value(D)}"
}`;
      return filter;
    }
  }else if (C === "true" || C === "false"){
    if(B == "self" || B == "other" || B == "target" || B == "player"){
      let filter = `{
    "test": "${test(A)}",
    "subject": "${B}",
    "value": ${value(C)}
  }`;
      return filter;
    }else if (/=|<|>|not|!|equals/.test(B)){
      let filter = `{
    "test": "${test(A)}",
    "operator": "${operator(B)}",
    "value": ${value(C)}
  }`;
      return filter;
    }
  }else{
    if(B == "self" || B == "other" || B == "target" || B == "player"){
      let filter = `{
    "test": "${test(A)}",
    "subject": "${B}",
    "value": "${value(C)}"
  }`;
      return filter;
    }else if (/=|<|>|not|!|equals/.test(B)){
      let filter = `{
    "test": "${test(A)}",
    "operator": "${operator(B)}",
    "value": "${value(C)}"
  }`;
      return filter;
    }else if (B === "true" || B === "false"){
      let filter = `{
    "test": "${test(A)}",
    "value": ${value(B)}
  }`;
      return filter;
    }else{
      let filter = `{
    "test": "${test(A)}",
    "value": "${value(B)}"
  }`;
      return filter;
    }
  }
}
function uuid(test){
  var uuid = "", i, random;
  for (i = 0; i < 32; i++) {
    random = Math.random() * 16 | 0;
    if (i == 8 || i == 12 || i == 16 || i == 20) {
      uuid += "-"
    }
    uuid += (i == 12 ? 4 : (i == 16 ? (random & 3 | 8) : random)).toString(16);
  }
  if(test == "A"){
    one = uuid
  }else{
    two = uuid
  }
  return uuid;
}
function file(name){
  const attachment = new Attachment('/app/' + name);
  return attachment;
}
function writefile(data,file){
  fs.writeFile('/app/' + file,JSON.stringify(data,null,2),(err) => {
    if(err){
      client.channels.get('599272915153715201').send(err.message)
      throw err
    }else{
      client.channels.get('599272915153715201').send("ファイルが正常に書き出しされました")
    }
  });
}

client.on('message', message => {
  if(message.author.bot){
    return;
  }else if(message.content === "ちきんじ"　|| message.content === "チキンジ"){
    let randoms = Math.floor(Math.random() * 100)
    if (randoms >= 90 && message.author.id != "537560435336151041"){
      randoms = Math.floor(Math.random() * Object.keys(chickenji).length)
      message.channel.send(chickenji.rare[randoms])
    }else{
      message.channel.send(chickenji.normal);
    }
  }else if(message.content.startsWith("//test") || message.channel.id == "599272915153715201" ){
    if(message.author.id == '395010195090178058'){
      message.delete(1);
      try {
        eval(message.content);
      } catch (e) {
        message.channel.send("err")
        console.log(e)
      }
    }
  }else if(message.content === "お掃除終了～" && message.author.id == "537560435336151041"　&& message.channel.id == '593809602294841357'){
    status = require(pass + '/status.json')
    for (let set = 0;set < status.status.length;set ++){
      status.status[set].login = "未"
    }
    fs.writeFile('status.json', JSON.stringify(status,null,2), function (err) {
      if (err) {
        throw err;
      }else{
        console.log(JSON.stringify(status))
        client.channels.get('618798426758447114').send(JSON.stringify(status))
      }
    });
  }else if(message.content.startsWith("/")){
    let command = message.content.replace("/","").split(" ")
    if(command == ""){
      return;
    }else if (command[0] === "help"){
      message.channel.send(
        {
          embed: {
            title: 'help',
            description: 'はいはーい　れきゅだよ！',
            color: 0000255,
            fields: [
              {
                name: 'manifestの生成',
                value: '/m-(b,r,all) name description\nb behavior manifest\nr resource manifest\nall behavior & resource manifest'
              },
              {
                name: 'uuidの生成',
                value: '/u'
              },
              {
                name: 'おしゃべり',
                value: '/say 文字\n変なことに使わないでね？'
              },
              {
                name: 'filterの生成',
                value: '/filter test operator (domain) value\n/filterのみで簡易入力一覧が出せるよ'
              },
              {
                name: 'animation_controllers',
                value: '/ani name\nscripts,animationsと\nanimation_controllersを生成するよ'
              },
              {
                name: 'Molangのtimer',
                value: '/time 数値\n指定時間間隔のMolangを生成するよ'
              },
              {
                name: 'その他',
                value: '検索機能付いたよ\n/search component名(一部可能)'
              }
            ]
          }
        }
      );
    }else if(command[0] == "status"){
      message.delete(1);
      if(command[1] == "set"){
        status = require(pass + '/status.json')
        for (let set = 0;set < status.status.length;set ++){
          if(status.status[set].id == message.author.id){
            message.channel.send("既に登録済みです")
            return;
          }
        }
        let userid = message.author.id
        let username = message.author.username
        let userdata = `{"name": "${username}","id": "${userid}","coin": 100,"login": "済","comment": "Nothing here"}`
        status.status.push(JSON.parse(userdata))
        writefile(status,'status.json')
        console.log(JSON.stringify(status))
        client.channels.get('618798426758447114').send(JSON.stringify(status))
        message.channel.send("登録しました")
      }else if(command[1] == "comment"){
        status = require(pass + '/status.json')
        if(command[2] == null){
          message.channel.send("/status comment ひとこと だよ")
          return;
        }else{
          for (let set = 0;set < status.status.length;set ++){
            if(status.status[set].id == message.author.id){
              let comment = command[2]
              for(let f = 3; f < command.length;f ++){
                comment = comment + " " + command[f]
              }
              status.status[set].comment = comment
              writefile(status,'status.json')
              console.log(JSON.stringify(status))
              client.channels.get('618798426758447114').send(JSON.stringify(status))
              message.channel.send("登録しました")
              return;
            }
          }
          message.channel.send("まだ登録されていません。\n/set で登録しましょう")
        }
      }else if(command[1] == "login"){
        status = require(pass + '/status.json')
        for (let set = 0;set < status.status.length;set ++){
          if(status.status[set].id == message.author.id && status.status[set].login == "未"){
            status.status[set].login = "済"
            status.status[set].coin = status.status[set].coin + 100
            writefile(status,'status.json')
            console.log(JSON.stringify(status))
            client.channels.get('618798426758447114').send(JSON.stringify(status))
            message.channel.send("ログインに成功しました")
            return;
          }else if(status.status[set].id == message.author.id && status.status[set].login == "済"){
            message.channel.send("ログイン済みです")
            return;
          }
        }
        message.channel.send("まだ登録されていません。\n/status set で登録しましょう")
      }else if(command[1] == undefined){
        status = require(pass + '/status.json')
        let name = message.member.nickname
        if(name == null){
          name = message.author.username
        }
        for (let set = 0;set < status.status.length;set ++){
          if(status.status[set].id == message.author.id){
            message.channel.send({
              embed: {
                author: {
                  name: name
                },
                thumbnail: {
                  url: message.author.avatarURL
                },
                fields: [
                  {
                    name: "ひとこと",
                    value:　status.status[set].comment
                  }
                ],
                description: `coin: ${status.status[set].coin}\nlogin: ${status.status[set].login}`
              }
            });
            return;
          }
        }
        message.channel.send("まだ登録されていません。\n/status set で登録しましょう")
      }else if(command[1].startsWith('<')){
        status = require(pass + '/status.json')
        if(message.mentions.users.first() != undefined){
          for(user of message.mentions.users){
            let name = message.guild.members.get(user[1].id).nickname
            if(name == null){
              name = user[1].username
            }
            for (let set = 0;set < status.status.length;set ++){
              if(status.status[set].id == user[0]){
                message.channel.send({
                  embed: {
                    author: {
                      name: name
                    },
                    thumbnail: {
                      url: user[1].avatarURL
                    },
                    fields: [
                      {
                        name: "ひとこと",
                        value:　status.status[set].comment
                      }
                    ],
                    description: `coin: ${status.status[set].coin}\nlogin: ${status.status[set].login}`
                  }
                })
              }
            }
          }
        }
      }
    }else if(command[0] == "say"){
      message.delete(1);
      if (command[1] !== undefined){
        let say = command[1];
        for(let a = 2;a < command.length;a ++){
          say = say + " " + command[a];
        }
        message.channel.send(say);
      }else{
            message.channel.send("文字を入れてね");
      }
    }else if(command[0] == "dl"){
      message.delete(1);
      message.channel.send(dl);
    }else if(command[0] == "el"){
      message.delete(1);
      message.channel.send(el);
    }else if(command[0] == "u"){
      message.channel.send(uuid());
    }else if(command[0].startsWith("m-")){
      message.delete(1);
      if (command[0] == "m-b"){
        message.channel.send(`{
    "format_version": 1,
    "header": {
      "description": "${command[2]}",
      "name": "${command[1]}",
      "uuid": "${uuid()}",
      "version": [0, 0, 1],
      "min_engine_version": [0, 1, 1]
    },
    "modules": [
      {
        "description": "${command[2]}",
        "type": "data",
        "uuid": "${uuid()}",
        "version": [0, 0, 1]
      }
    ]
  }`);
      }else if (command[0] == "m-r"){
        message.channel.send(`{
    "format_version": 1,
    "header": {
      "description": "${command[2]}",
      "name": "${command[1]}",
      "uuid": "${uuid()}",
      "version": [0, 0, 1],
      "min_engine_version": [0, 1, 1]
    },
    "modules": [
      {
        "description": "${command[2]}",
        "type": "resources",
        "uuid": "${uuid()}",
        "version": [0, 0, 1]
      }
    ]
  }`)
      }else if (command[0] == "m-all"){
        message.channel.send(`{
    "format_version": 1,
    "header": {
      "description": "${command[2]}",
      "name": "${command[1]}",
      "uuid": "${uuid("A")}",
      "version": [0, 0, 1],
      "min_engine_version": [0, 1, 1]
    },
    "modules": [
      {
        "description": "${command[2]}",
        "type": "data",
        "uuid": "${uuid()}",
        "version": [0, 0, 1]
      }
    ],
    "dependencies": [
      {
        "uuid": "${uuid("B")}",
        "version": [0, 0, 1]
      }
    ]
  }`);
        message.channel.send(`{
    "format_version": 1,
    "header": {
      "description": "${command[2]}",
      "name": "${command[1]}",
      "uuid": "${two}",
      "version": [0, 0, 1],
      "min_engine_version": [0, 1, 1]
    },
    "modules": [
      {
        "description": "${command[2]}",
        "type": "resources",
        "uuid": "${uuid()}",
        "version": [0, 0, 1]
      }
    ],
    "dependencies": [
      {
        "uuid": "${one}",
        "version": [0, 0, 1]
      }
    ]
  }`);
      }
    }else if(command[0].startsWith("filter")){
      if (command[1] !== undefined){
        message.channel.send(filter(command[1],command[2],command[3],command[4],command[5]));
      }else{
        message.channel.send(`filter test:
  equ has_equipment
  dam has_damage
  com has_component
  tag has_tag
  sne is_sneaking
  eff has_mob_effect
        `);
      }
    }else if(command[0] == "ani"){
      message.delete(1);
      if (command[1] == undefined){
        command[1] = " "
      }
      message.channel.send(`"scripts": {
          "animate": [ "${command[1]}" ]
        },
        "animations": {
          "${command[1]}": "controller.animation.${command[1]}"
        }`);
      message.channel.send(`{
      "format_version": "1.10.0",
      "animation_controllers": {
        "controller.animation.${command[1]}": {
          "states": {
            "default": {
              "transitions": [
                { "stop": "query.variant == 1" },
                { "command": "(1.0)" }
              ],
              "on_entry": [
                ""
              ]
            },
            "command": {
              "transitions": [
                { "stop": "query.variant == 1" },
                { "default": "(1.0)" }
              ],
              "on_entry": [
                ""
              ]
            },
            "stop": {
              "transitions": [
                { "default": "query.variant != 1" }
              ]
            }
          }
        }
      }
    }`);
    }else if(command[0].startsWith("time")){
      if (command[1] !== undefined && isFinite(command[1])){
        let timeselect = command[1].split(".")
        message.channel.send(`variable.time = variable.time < ${timeselect[0]} ? variable.time + 1:0; return variable.time == 0;`);
      }else{
        message.channel.send("生成する時間をtick単位で入力してください");
      }
    }else if(command[0].startsWith("slot")){
      message.delete(1);
      if (command[1] == undefined){
        const first = Math.floor(Math.random()*9)+1
        const second = Math.floor(Math.random()*9)+1
        const third = Math.floor(Math.random()*9)+1
        let result = `|${first}|${second}|${third}|`
        if (first == second && first == third){
          if (first == "7"){
            message.channel.send(`${message.author.username}\n{result}\nおおあたり！！！おめでとー！\n今日は何かいいことあるかも？`);
          }else{
            message.channel.send(`${message.author.username}\n{result}\nあたり！おめでとー！`);
          }
        }else{
          message.channel.send(`${message.author.username}\n${result}\nはずれ　ざんねん...`);
        }
      }else{
        if (command[1] <= 0) {
          message.channel.send("数値が小さすぎるよ 1以上にしてね")
        }else if (command[1] <= 1000){
          let atari = 0;
          let ooatari = 0;
          let result = "";
          for (let n = 1;n <= command[1];n ++){
            const first = Math.floor(Math.random()*9)+1
            const second = Math.floor(Math.random()*9)+1
            const third = Math.floor(Math.random()*9)+1
            let slot = `|${first}|${second}|${third}|`
            if (first == second && first == third){
              atari += 1
              if (first == "7"){
                result = result + slot + "\nおおあたり！！！おめでとー！\n今日は何かいいことあるかも？\n"
                ooatari += 1
              }else{
                result = result + slot + "\nあたり！おめでとー！\n"
              }
            }
          }
          if (atari == 0){
            message.channel.send(`${message.author.username}\n${command[1]}回まわしたけど全部外れだったよ...`);
          }else{
            message.channel.send(`${message.author.username}\n以上、${command[1]}回まわした結果でした！\nあたり${atari}回　内大当たり${ooatari}回`);
          }
        }else if (isFinite(command[1])) {
          message.channel.send("数値が大きすぎるよ 1000以下にしてね")
        }else{
          message.channel.send("数値にしてね")
        }
      }
    }else if(command[0] == "search" || command[0] == "s"){
      for(let co = 0;co < component.length;co ++){
        if(component[co].name.match(command[1])){
          message.channel.send("```\n" + component[co]["value"] + "```")
        }
      }
    }
  }else if(message.content.startsWith("(")){
  let random = Math.floor(Math.random() * 4);
  if (random == 0){
    if (message.content　=== "( 'ω')") {
      message.channel.send("( 'ω')");
    }else if (message.content　=== "(っ'ヮ'c)"){
      message.channel.send("(っ'ヮ'c)");
    }else if (message.content　=== "( - . -)") {
      message.channel.send("( - . -)");
    }
  }
  }else{
    for(let me = 0;me < replay.length;me ++){
      if(replay[me].name.match(message.content)){
        message.channel.send(replay[me].message)
      }
    }
  }
});

client.on('messageDelete',(message)=>{
  if(!message.content.startsWith("/")){
    console.log(`${message.author.username}削除=>${message.content}`)
    dl = `${message.author.username}削除=>${message.content}`
  }
});

client.on('messageUpdate',(oldMe,newMe)=>{
  if(oldMe != ""){
    console.log(`${oldMe.author.username}編集:${oldMe}=>${newMe}`)
    el = `${oldMe.author.username}編集:${oldMe}=>${newMe}`
  }
});

/*
https://dashboard.heroku.com/apps/kinjisbot/resources
cd discordbot2/
git init
heroku git:remote -a kinjisbot
git add .
git commit -m "First commit"
git push heroku master --force
heroku logs -a kinjisbot
node t.js
*/

/*memo
let statusfile = new Attachment(pass + '/status.json')
message.channel.send(statusfile);
*/
client.login(process.env.BOT_TOKEN);
