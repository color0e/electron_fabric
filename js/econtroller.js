module.exports=(function(helper){
var econtroller = {};

econtroller.query = function(ipc_event,userid,chainid,fnc,cname,args){

        var tx_id = null;
        var user = userid;

        const request = helper.getChaincodeRequest(chainid, tx_id, fnc, cname, args);
        helper.query(user,request, handler);

        function handler(query_responses){
                // res.header('Cache-Control', 'no-cache, no-store, must-revalidate')
                console.log("Query has completed, checking results");
                // query_responses could have more than one  results if there multiple peers were used as targets
                if (query_responses && query_responses.length == 1) {
                        if (query_responses[0] instanceof Error) {
                                console.error("error from query = ", query_responses[0]);
                        } else {
                                console.log("Response is ", query_responses[0].toString());
								ipc_event.sender.send("reply-query",query_responses[0].toString());
                        }
                } else {
                        console.log("No payloads were returned from query");
                }
        }
}

var invokeHandler = function(ipc_event, results, tx_id) {
	console.log('Send transaction promise and event listener promise have completed');
	// check the results in the order the promises were added to the promise all list
	function isAvailalbe(data, data_index, data_key, statement){
		if(data  && data[data_index] && data[data_index][data_key] === statement){
			return true;
		}
		return false;
	}
	if (isAvailalbe(results, 0, "status", "SUCCESS")) {
		// if (results && results[0] && results[0].status === 'SUCCESS') {
		console.log('Successfully sent transaction to the orderer.');		
		
	} else {
		// console.error('Failed to order the transaction. Error code: ' + response.status);
	}

	if(isAvailalbe(results, 1, "event_status", "VALID")) {
		// if(results && results[1] && results[1].event_status === 'VALID') {
		console.log('Successfully committed the change to the ledger by the peer');
		//event를 받아와서 renderer로 날리기위함
		ipc_event.sender.send("reply-invoke",tx_id.getTransactionID());
		//res.send(tx_id.getTransactionID());
	} else {
		console.log('Transaction failed to be committed to the ledger due to ::'+results[1].event_status);
	}
}

econtroller.invoke = function(ipc_event,uesrid,chainid,fnc,cname,args){
	console.log("submit recording of a Cargo: ");
	var tx_id = null;
		const request = helper.getChaincodeRequest(chainid, tx_id, fnc, cname, args); 
		helper.transaction(user,request, invokeHandler.bind(this, ipc_event));
}


return econtroller;
});

