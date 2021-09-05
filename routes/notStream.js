var 	express			=		require('express'),
	 	router			=		express.Router(),
		Notification	=		require('../models/notification'),
		title			=		'schicki',
	    cid;

const	action			=		require('../templates/notification');

function eventHandler(req, res, next){
		res.set({
					'Content-Type'		:	'text/event-stream',
					'Connection'		: 	'keep-alive',
					'Cache-Control'		:	'no-cache',
					'Content-Encoding'	:	'identity'
				});	
	    if(req.user && req.app.locals.csessions.find( element  => element.agent.toString  === req.user._id.toString)){
			const data = `data: ${JSON.stringify((req.app.locals.csessions.find( ele => ele.agent.toString()  === req.user._id.toString())).notf)}`;
			console.log(data);
			res.write(data);
	   		(req.app.locals.csessions.find( element  => element.agent.toString()  === req.user._id.toString())).notf = 0;
		}
	}

//function notHandler(req, res, next){
//										console.log("notHandler called"+" "+res.body);
//									}
router.get('/notificationread/:notfnid/*', (req, res)=>{
	Notification.findById(req.user.notification_id._id, (nerr, fnotf)=>{
		console.log("found notification " + fnotf);
		console.log("found notif_id " + req.params.notfnid);
		fnotf.notifications[(fnotf.notifications.findIndex((rnotf) => rnotf._id.toString() === req.params.notfnid))].readStatus = true;
		fnotf.unreadNot = fnotf.notifications.filter(notification => !notification.readStatus ).length;
		fnotf.save();
	})
	var plen 	= 18 + req.params.notfnid.length;
	var redpath	= req._parsedUrl.pathname.slice(plen);
	res.redirect(redpath);
})
router.get('/notStream', eventHandler);

//router.post('/notStream', notHandler);

module.exports		=		router;