module.exports=(function(cahelper){
var econtroller = {};

econtroller.loginuser = function(userid,password,ipc_event){
cahelper.enrollCaUser(userid,password,handler.bind(this,ipc_event),errhandler.bind(this,ipc_event));

function handler(ipc_event,user){
//    ipc_event.sender.send('reply-enroll',user);
    ipc_event.sender.send('handle-page','index_.html');
}

function errhandler(ipc_event,err){
	ipc_event.sender.send('login-err',err);
}

}//loginuser end


return econtroller;
});

