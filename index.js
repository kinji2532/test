const Discord = require('discord.js');
const client = new Discord.Client();
let one;
let two;
let saymode = true;
let dummy;
let chickenji = [
  "ちきんじいうなし( 'ω')",
  "ちきんじいうなし( 'ω')",
  "ちきんじいうなし( 'ω')",
  "ちきんじいうなし( 'ω')",
  "ちきんじいうなし( 'ω')",
  "ちきんじいうなし( 'ω')",
  "ちきんじいうなし( 'ω')",
  "ちきんじいうなし( 'ω')",
  "ちきんじいうなし( 'ω')",
  "ちきんじいうなし( 'ω')",
  "ちきんじいうなし( 'ω')",
  "ちきんじいうなし( 'ω')",
  "ちきんじいうなし( 'ω')",
  "ちきんじいうなし( 'ω')",
  "ちきんじいうなし( 'ω')",
  "ちきんじいうなし( 'ω')",
  "ちきんじいうなし( 'ω')",
  "ちきんじいうなし( 'ω')",
  "ちきんじいうなし( 'ω')",
  "ちきんじいうなし( 'ω')",
  "ちきんじいうなし( 'ω')",
  "ちきんじいうなし( 'ω')",
  "ちきんじいうなし( 'ω')",
  "ちきんじいうなし( 'ω')",
  "ちきんじいうなし( 'ω')",
  "ちきんじいうなし( 'ω')",
  "ちきんじいうなし( 'ω')",
  "ちきんじいうなし( 'ω')",
  "ちきんじいうなし( 'ω')",
  "ちきんじいうなし( 'ω')",
  "ちきんじいうなし( 'ω')",
  "ちきんじいうなし( 'ω')",
  "ちきんじいうなし( 'ω')",
  "ちきんじいうなし( 'ω')",
  "ちきんじいうなし( 'ω')",
  "ちきんじいうなし( 'ω')",
  "ちきんじいうなし( 'ω')",
  "ちきんじいうなし( 'ω')",
  "ちきんじいうなし( 'ω')",
  "ちきんじいうなし( 'ω')",
  "じー",
  "",
  "べーだ",
  "( 'ω')",
  "...",
  "へーあなたのこと見損ないました",
  "あ、そういうこと言っちゃうんですかー？",
  "ふんだ",
  "もー",
  "そういうこと言う人きらいです",
  "ばーかばーか"
]
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
}
]
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity('れきゅねこ教',{
    type : 'PLAYING'
  })
});

function test(A) {
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
function operator(A) {
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
function value(A) {
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
function uuid(test) {
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

client.on('message', message => {
  if (message.author.bot) {
    return;
  }else if (message.content.startsWith("/m-")) {
    const set = message.content.split(" ")
    if (set[0] == "/m-b"){
      message.channel.send(`{
  "format_version": 1,
  "header": {
    "description": "${set[2]}",
    "name": "${set[1]}",
    "uuid": "`+uuid()+`",
    "version": [0, 0, 1],
    "min_engine_version": [0, 1, 1]
  },
  "modules": [
    {
      "description": "${set[2]}",
      "type": "data",
      "uuid": "`+uuid()+`",
      "version": [0, 0, 1]
    }
  ]
 }`)
}else if (set[0] == "/m-r"){
  message.channel.send(`{
  "format_version": 1,
  "header": {
    "description": "${set[2]}",
    "name": "${set[1]}",
    "uuid": "` + uuid() + `",
    "version": [0, 0, 1],
    "min_engine_version": [0, 1, 1]
  },
  "modules": [
    {
      "description": "${set[2]}",
      "type": "resources",
      "uuid": "`+uuid()+`",
      "version": [0, 0, 1]
    }
  ]
}`)
}else if (set[0] == "/m-all"){
    message.channel.send(`{
  "format_version": 1,
  "header": {
    "description": "${set[2]}",
    "name": "${set[1]}",
    "uuid": "`+uuid("A")+`",
    "version": [0, 0, 1],
    "min_engine_version": [0, 1, 1]
  },
  "modules": [
    {
      "description": "${set[2]}",
      "type": "data",
      "uuid": "`+uuid()+`",
      "version": [0, 0, 1]
    }
  ],
  "dependencies": [
    {
      "uuid": "`+uuid("B")+`",
      "version": [0, 0, 1]
    }
  ]
}
`);
    message.channel.send(`{
  "format_version": 1,
  "header": {
    "description": "${set[2]}",
    "name": "${set[1]}",
    "uuid": "` + two + `",
    "version": [0, 0, 1],
    "min_engine_version": [0, 1, 1]
  },
  "modules": [
    {
      "description": "${set[2]}",
      "type": "resources",
      "uuid": "`+uuid()+`",
      "version": [0, 0, 1]
    }
  ],
  "dependencies": [
    {
      "uuid": "` + one + `",
      "version": [0, 0, 1]
    }
  ]
}`);
  }
  }else if (message.content.startsWith("/slot")) {
  const slot = message.content.split(" ")
  message.delete(1);
  if (slot[1] == undefined){
    const first = Math.floor(Math.random()*9)+1
    const second = Math.floor(Math.random()*9)+1
    const third = Math.floor(Math.random()*9)+1
    let result = `|${first}|${second}|${third}|`
    if (first == second && first == third){
      if (first == "7"){
        message.channel.send(result + "\nおおあたり！！！おめでとー！\n今日は何かいいことあるかも？");
      }else{
        message.channel.send(result + "\nあたり！おめでとー！");
      }
    }else{
      message.channel.send(result + "\nはずれ　ざんねん...");
    }
  }else{
    if (slot[1] <= 0) {
      message.channel.send("数値が小さすぎるよ 1以上にしてね")
    }else if (slot[1] <= 1000){
      let atari =　0;
      let ooatari = 0;
      for (let n = 1;n <= slot[1];n ++){
        const first = Math.floor(Math.random()*9)+1
        const second = Math.floor(Math.random()*9)+1
        const third = Math.floor(Math.random()*9)+1
        let result = `|${first}|${second}|${third}|`
        if (first == second && first == third){
          atari += 1
          if (first == "7"){
            message.channel.send(result + "\nおおあたり！！！おめでとー！\n今日は何かいいことあるかも？");
            ooatari += 1
          }else{
            message.channel.send(result + "\nあたり！おめでとー！");
          }
        }
      }
      if (atari == 0){
        message.channel.send(`${slot[1]}回まわしたけど全部外れだったよ...`);
      }else{
        message.channel.send(`以上、${slot[1]}回まわした結果でした！\nあたり${atari}回　内大当たり${ooatari}回`);
      }
    }else if (isFinite(slot[1])) {
      message.channel.send("数値が大きすぎるよ 1000以下にしてね")
    }else{
      message.channel.send("数値にしてね")
    }
  }
  }else if (message.content === '/u') {
    message.channel.send(uuid());
  }else if (message.content === "ちきんじ"　|| message.content === "チキンジ") {
    let randoms = Math.floor(Math.random() * chickenji.length)
    message.channel.send(chickenji[randoms]);
  }else if (message.content === "れきゅ") {
  message.channel.send("呼んだ？");
  }else if (message.content.match("おはよ")) {
  message.channel.send("おはよ－！");
  }else if (message.content.match("おやすみ")) {
  message.channel.send("おやすみなさーい");
  }else if (message.content.startsWith("/filter")) {
  const type = message.content.split(" ")
  if (type[1] !== undefined){
    message.channel.send(filter(type[1],type[2],type[3],type[4],type[5]));
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
  }else if (message.content === '/help') {
    message.channel.send(`はいはーいれきゅだよー
manifestの生成は/m-mode name description
\`\`\`/m-b behavior manifest
/m-r resource manifest
/m-all all manifest\`\`\`
uuid単体生成は/uだよ
/say 文字 で私にしゃべらせれるよ！
変なことに使わないでね？
/filterでfilter部分の生成ができるよ
\`\`\`/filter test operator (domain) value\`\`\`
/ani で scripts,animations と　animation_controllers を生成するよ
/time 数値　で時間間隔のMolangを生成するよ！`);
  }else if (message.content.startsWith("/ani")) {
    let name = message.content.split(" ");
    if (name[1] == undefined){
      name[1] = " "
    }
    message.channel.send(`"scripts": {
        "animate": [ "${name[1]}" ]
      },
      "animations": {
        "${name[1]}": "controller.animation.${name[1]}"
      }`);
      message.channel.send(`{
    "format_version": "1.10.0",
    "animation_controllers": {
      "controller.animation.${name[1]}": {
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
  }else if (message.content.startsWith("/time")) {
    const time = message.content.split(" ")
    if (time[1] !== undefined && isFinite(time[1])){
      let timeselect = time[1].split(".")
      message.channel.send(`variable.time = variable.time < ${timeselect[0]} ? variable.time + 1:0; return variable.time == 0;`);
    }else{
      message.channel.send("生成する時間をtick単位で入力してください");
    }
  }else if (message.content.match("/saymode")) {
    const mode = message.content.split(" ")
    if (mode[0] === "/saymode"){
      message.delete(1);
      if (mode[1] == "sayon"){
        saymode = true
      }else{
        saymode = false
      }
    }
  }else if (message.content.startsWith("/say")) {
  const msg = message.content.split(" ")
  message.delete(1);
  if (saymode){
    if (msg[0] === "/say"){
      if (msg[1] !== undefined){
        let say = msg[1];
        for(let a = 2;a < msg.length;a ++){
            say = say + " " + msg[a];
        }
        message.channel.send(say);
      }else{
        message.channel.send("文字を入れてね");
      }
    }
  }

  }else if (message.content.startsWith("/")) {
    for(let co = 0;co < component.length;co ++){
      let com = message.content.replace("/","")
      if(com == ""){
        return;
      }else if(component[co].name.match(com)){
        message.channel.send("```" + component[co]["value"] + "```")
      }
    }
  }else{
  let random = Math.floor(Math.random() * 5);
  if (random == 0){
    if (message.content　=== "( 'ω')") {
      message.channel.send("( 'ω')");
    }else if (message.content　=== "(っ'ヮ'c)"){
      message.channel.send("(っ'ヮ'c)");
    }else if (message.content　=== "( - . -)") {
      message.channel.send("( - . -)");
    }
  }
}
});

/*
https://dashboard.heroku.com/apps/kinjibot/resources
cd discordbot2/
git init
heroku git:remote -a kinjisbot
git add .
git commit -m "First commit"
git push heroku master --force
heroku logs -a kinjisbot
*/
client.login(process.env.BOT_TOKEN);
