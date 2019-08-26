console.log("start")
const fs = require('fs')
let pass = __dirname
let status = require(pass + '/status.json');
let userid = "395010195090178058"
for (let set = 0;set < status.status.length;set ++){
  if(status.status[set].id == userid){
    console.log("既に登録済みです")
    return;
  }
}
let userdata = `{"id": "${userid}","coin": "100","login": false}`
status.status.push(JSON.parse(userdata))
fs.writeFile('status.json', JSON.stringify(status,null,2), function (err) {
  if (err) {
    throw err;
  }
});
console.log("登録しました")
// let json = JSON.stringify(obj.push({"test": "json"}))
// file.writeFile("status.json", json)
/*
node test.js
*/
