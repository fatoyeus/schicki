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
		console.log('Notify Called');
		Notification.findById(y, 'userId notifications',(err, fnotification)=>{
			if(fnotification){
				for(let x = 0; x< w.length; x++){
									fnotification.notifications.push({notif_id: action.find(v => v.code === w[x]).message, link: action.find(v => v.code === w[x]).link, timestamp: Date.now()});
									fnotification.unreadNot = fnotification.notifications.filter(notification => !notification.readStatus ).length;
									if(w[x] > 1999 && req.app.locals.csessions.find( element  => element.agent.toString()  === fnotification.userId.toString())){
										            console.log("increment on notf");
													(req.app.locals.csessions.find( element  => element.agent.toString()  === fnotification.userId.toString())).notf+=1;
													console.log((req.app.locals.csessions.find( element  => element.agent.toString()  === fnotification.userId.toString())).notf);
												}else{
													console.log('************ no update *************');
												}
								}
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