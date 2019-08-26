const fs = require('fs')
let pass = __dirname
let file = require(pass + '/status.json');
file.status.push({"test":"json"})
console.log(file)
fs.writeFile('status.json', JSON.stringify(file,null,2), function (err) {
    if (err) {
        throw err;
    }
  });
// let json = JSON.stringify(obj.push({"test": "json"}))
// file.writeFile("status.json", json)
// node test.js
