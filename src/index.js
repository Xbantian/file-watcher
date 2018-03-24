var chokidar = require('chokidar');
var shelljs = require('shelljs');

let command = (e, p) => {
    console.log(e, '   ', p);
    // shelljs.echo("node helper.js");
    //shelljs.exit(1);   执行完就退出
    // shelljs.exec('git pull');
}

chokidar.watch(__dirname).on('all', command);

