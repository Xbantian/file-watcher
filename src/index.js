const chokidar = require('chokidar');
const shelljs = require('shelljs');
const path = require('path');
const fs = require('fs');

let command = (e, p) => {
    // console.log(e, '   ', p);
    // shelljs.echo(e, '   ', p);
    //shelljs.exit(1);   执行完就退出
    // shelljs.exec('git pull');
}

let dirPath = null;
try {
    let data = fs.readFileSync('./path.config').toString();
    dirPath = fs.statSync(data);
} catch (err) {
    console.log('path not exist...');
    console.log('watch current dir');
}
dirPath = __dirname;
console.log(path.resolve(dirPath))
chokidar.watch(path.resolve(dirPath)).on('all', command);

