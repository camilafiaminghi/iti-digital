module.exports = function(app, config) {
	var home = require(config.root + '/app/controllers/home.js');
	var payment = require(config.root + '/app/controllers/payment.js');
	var history = require(config.root + '/app/controllers/history.js');
	
	app.use('/history', history);
	app.use('/payment', payment);	
	app.use('/', home);

	app.use(function (req, res, next) {
	var err = new Error('Not Found');
		err.status = 404;
		next(err);
	});
	
}


