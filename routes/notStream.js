var 	express			=		require('express'),
	 	router			=		express.Router(),
		title			=		'schicki',
	    cid,
		notf			=		{};
const	action			=		require('../templates/notification');

function eventHandler(request, response, next){
		response.set({
					'Content-Type'	:	'text/event-stream',
					'Connection'	: 	'keep-alive',
					'Cache-Control'	:	'no-cache'
				});	
	    
			const data = `data: ${JSON.stringify(response.app.locals.notf)}`;
			console.log(data);
			response.write(data);
	   		request.app.locals.notf = {};
		
	}

//function notHandler(req, res, next){
//										console.log("notHandler called"+" "+res.body);
//									}
router.get('/notStream', eventHandler);

//router.post('/notStream', notHandler);

module.exports		=		router;