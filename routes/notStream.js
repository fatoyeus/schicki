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
			let cnotf = (req.app.locals.csessions.find( element  => element.agent.toString()  === req.user._id.toString())).notf;
			if(cnotf){
						console.log(`event: notify\n data: ${JSON.stringify(cnotf)}  \n\n`);
						res.send(`event: notify\n data: ${JSON.stringify(cnotf)}  \n\n`);
						(req.app.locals.csessions.find( element  => element.agent.toString()  === req.user._id.toString())).notf = cnotf = 0;
			}else{
						res.send(":keep-alive");
				}
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
router.get('/notStream', eventHandler, (req, res)=>{
	res.sendStatus(200);
});

//router.post('/notStream', notHandler);

module.exports		=		router;