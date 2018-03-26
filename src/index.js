const chokidar = require('chokidar');
// const shelljs = require('shelljs');
const path = require('path');
const fs = require('fs');
const child_process = require("child_process");

let command = (e, p) => {
    console.log(e, '   ', p);
    // shelljs.exec(com);
    if (exec) {
        exec = false;
        child_process.execFile(config.bat, null, { cwd: config.target }, (error, stdout, stderr) => {
            // if (error !== null) {
            //会提示具体哪句报的错
            //     console.log(error);
            // }
            //执行成功的会显示的值
            console.log(stdout);
            //执行失败显示的值
            console.log(stderr);
        })
    }
}
let exec = false;

let config = {
    dirPath: __dirname,//监听目录
    interval: 1000 * 20,//最小执行间隔
    target: null,//执行位置
    bat: null,//执行文件
}

//读取文件配置
try {
    let data = fs.readFileSync('./watcher.config').toString();

    //处理不同系统
    let splitStr = '\n';
    if (data.includes('\r\n')) {
        splitStr = '\r\n';
    }

    data.split(splitStr).forEach(item => {
        if (item.startsWith('dir:')) {
            config.dirPath = item.replace(/^dir\:/, '');
        }
        if (item.startsWith('target:')) {
            config.target = item.replace(/^target\:/, '');
        }
        if (item.startsWith('bat:')) {
            config.bat = item.replace(/^bat\:/, '');
        }
        if (item.startsWith('interval:')) {
            config.interval = parseInt(item.replace(/^interval\:/, ''));
        }
    });

    //校验路径的有效性
    fs.statSync(config.dirPath);
    fs.statSync(config.target);
    fs.statSync(config.bat);
} catch (err) {
    console.log(err);
    console.log('配置文件有问题');
    process.exit(1);
}

//开始监听文件
chokidar.watch(path.resolve(config.dirPath)).on('all', command);

//设置最小循环调用时间
setInterval(() => {
    // console.log('计时一次');
    exec = true;
}, config.interval);