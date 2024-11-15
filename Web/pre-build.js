console.log('Replacing Utils.js file in @angular/cli...');
let fs = require('fs');
let utilFileName = './node_modules/@angular-devkit/build-angular/src/angular-cli-files/models/webpack-configs/utils.js';
fs.readFile(utilFileName, 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  let result = data.replace(/hash:\${length.*[`]/g, 'hash:\${length}]${Date.now()}`');

  fs.writeFile(utilFileName, result, 'utf8', function (err) {
    if (err) return console.log(err);
  });
});
console.log('Replaced successfully.');
