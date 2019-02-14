const { app,BrowserWindow,ipcMain } = require('electron');
var cahelper = require('./js/cahelper.js')('http://localhost:7054');
var create_econtroller_ca = require('./js/econtroller_ca.js');
var econtroller_ca = create_econtroller_ca(cahelper);

app.on('ready',() => {
console.log("hello electron");
var win = new BrowserWindow({width:1100,height:600});
win.loadFile("./view/login.html");
});

//login listenner
ipcMain.on('login',(event,logininfo)=>{
    console.log('login()');
    console.log(logininfo.username+","+logininfo.password);
    econtroller_ca.loginuser(logininfo.username,logininfo.password,event);
});

ipcMain.on('reply-enroll',(event,arg)=>{
    console.log('reply-enroll()');
    console.log(arg);
});

ipcMain.on('reply-err',(event,arg)=>{
    console.log(arg);
})
