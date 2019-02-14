const { ipcRenderer } = require('electron');
var logininfo={
    username:"",
    password:""
};
//login function
function login(){
logininfo.username=document.getElementById("username").value;
logininfo.password=document.getElementById("password").value;
console.log(logininfo.username);
console.log(logininfo.password);
if(logininfo.username==""||logininfo.password==""){
    alert("Please Input Value in username,password");
}else{
	loading_show();
        ipcRenderer.send('login',logininfo);
	//location.href="index_.html";
}
}

ipcRenderer.on('login-err',(event,arg)=>{
loading_hide();
});

ipcRenderer.on('handle-page',(event,arg)=>{
console.log(arg);
location.href=arg;
});
