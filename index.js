#!/usr/bin/env node

var program = require('commander');
var request = require('superagent');
var cowsay = require('cowsay');

checkparams = () => {
  if (!process.argv[2] || !process.argv[3]) {
    var msg = '';
    msg += 'Usage 1: rudecow :name :from'
    msg += '\nUsage 2: rudecow :message :name :from';
    msg += '\n';
    msg += '\nExample messages:';
    msg += '\noff :name :from';
    msg += '\nyou :name :from';
    msg += '\nthis :from';
    msg += '\nthat :from';
    msg += '\ndonut :name :from';
    msg += '\nshakespeare :name :from';
    msg += '\nlinus :name :from';
    msg += '\nking :name :from';
    msg += '\nlife :from';
    msg += '\nflying :from';
    console.info(msg);
    process.exit(0);
  }
}


createurl = (params) => {
  url = '';
  for (var p in params) {
    url += '/' + params[p];
  }
  return url;
}


program
  .version('1.0.0')
  .arguments('<name> [from]')
  .action( (params) => {
    query = createurl(process.argv.slice(2));
    request
      .get('https://foaas.com' + query)
      .set('Accept', 'text/plain')
      .end( (err, res) => {
        checkparams();
        var msg = res.text;
        if (msg.slice(0, 3) == '622') {
          console.log(cowsay.say({
            text    : 'Type rudecow -h to get help',
            e       : 'oo'
          }));
        } else {
          console.log(cowsay.say({
            text  : msg,
            e     : 'oO',
            T     : 'U',
          }));
        }
      }, (err) => {
      console.log(err)
      });
  })

program.on('--help', () => {
  console.log('Examples:');
  console.log('');
  console.log('   rudecow chainsaw :name :from');
  console.log('   rudecow thanks :from');
  console.log('');
})
  
program.parse(process.argv);
