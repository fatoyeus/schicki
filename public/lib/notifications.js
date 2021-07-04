let		Notification 	= 	require('../../models/notification'),
		User 			=	require('../../models/user'),
	    notStream		=	require('../../notifications/notStream');

const	action			=	require('../../templates/notification');

function notify(req ,res, next){
	console.log('notify is active');
	req.notify 		= function (x, y){
	//	if(req.user||req.admin){
			//var notid = ( req.user ?  req.user.notification_id : req.admin.notification_id);
			Notification.findById( y, 'notifications',(err, fnotification)=>{
			if(fnotification){
				fnotification.notifications.push({notif_id: action.find(v => v.code === x).message, link: action.find(v => v.code === x).link, timestamp: Date.now()});
				fnotification.unreadNot = fnotification.notifications.filter(notification => !notification.readStatus ).length += 1;
				fnotification.save();
				var not = fnotification.notifications[fnotification.notifications.length - 1];
				if(x > 1999){
					notStream(res, not);
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