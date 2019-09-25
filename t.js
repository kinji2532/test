console.log("start")
const fs = require('fs')
let pass = __dirname
let status = require(pass + '/status.json');
fs.writeFile('status.json', JSON.stringify(status,null,2), function (err) {
  if (err) {
    throw err;
  }
});
console.log("整形しました")
// let json = JSON.stringify(obj.push({"test": "json"}))
// file.writeFile("status.json", json)
/*
node test.js
*/
