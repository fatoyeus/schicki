let		Notification 	= 	require('../../models/notification'),
		User 			=	require('../../models/user'),
	    notStream		=	require('../../notifications/notStream');

const	action			=	require('../../templates/notification');
const 	querystring		=	require('querystring');
const	{Curl}			=	require('node-libcurl');


const   curl			=	new Curl;
const  	close			=	curl.close.bind(curl);



function notify(req ,res, next){
	req.notify 		= function (y, ...w){
		Notification.findById(y, 'notifications',(err, fnotification)=>{
			if(fnotification){
				w.forEach((x)=>{
									fnotification.notifications.push({notif_id: action.find(v => v.code === x).message, link: action.find(v => v.code === x).link, timestamp: Date.now()});
									fnotification.unreadNot = fnotification.notifications.filter(notification => !notification.readStatus ).length;
									if(x > 1999){
													req.app.locals.notf = 1;
												}
								});
									fnotification.save();
									return true;
			}else{
									return false;
				}
																		}) 
		  
										}
	
									next();
								}

module.exports = notify;