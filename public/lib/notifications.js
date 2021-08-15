let		Notification 	= 	require('../../models/notification'),
		User 			=	require('../../models/user'),
	    notStream		=	require('../../notifications/notStream');

const	action			=	require('../../templates/notification');
const 	querystring		=	require('querystring');
const	{Curl}			=	require('node-libcurl');


const   curl			=	new Curl;
const  	close			=	curl.close.bind(curl);



function notify(req ,res, next){
	//console.log(`notify is active for ${req.user._id}`);
	req.notify 		= function (x, y){
	//	if(req.user||req.admin){
			//var notid = ( req.user ?  req.user.notification_id : req.admin.notification_id);
			Notification.findById(y, 'notifications',(err, fnotification)=>{
			if(fnotification){
				fnotification.notifications.push({notif_id: action.find(v => v.code === x).message, link: action.find(v => v.code === x).link, timestamp: Date.now()});
				fnotification.unreadNot = fnotification.notifications.filter(notification => !notification.readStatus ).length += 1;
				fnotification.save();
				var not = fnotification.notifications[fnotification.notifications.length - 1];
				if(x > 1999){
						console.log('calling curl');
						req.app.locals.notf = not;
					
	//				 	curl.setOpt(Curl.option.URL, 'https://localhost:3000/notStream');
		//				curl.setOpt(Curl.option.POST, true);
		//				curl.setOpt(Curl.option.HTTPHEADER, ['application/x-www-form-urlencoded'])
		//				curl.setOpt(Curl.option.POSTFIELDS, querystring.stringify(not));
		//					curl.on("end", function (statusCode, data, headers) {
		//						console.info("Status code " + statusCode);
		//						console.info("***");
		//						console.info("Our response: " + data);
		//						console.info("***");
		//						console.info("Length: " + data.length);
		//						console.info("***");
		//						console.info("Total time taken: " + this.getInfo("TOTAL_TIME"));
		//						this.close();
		//				});
		//				    curl.on("error", close);
		//					curl.perform();
				}
				return true;
				}else{
				return false;
				}
			}) 
	//	}else{
	//		next();
	//	}
			  
								}
	
	next();
	
	
}

module.exports = notify;