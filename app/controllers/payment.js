var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Payment = mongoose.model('Payment');

router.get('/', function(req, res, next) {
	
	res.render('payment', {
		title: 'Send Money', 
		currencies: [{name:'USD'},{name:'EUR'},{name:'GBP'}]
	});

});

router.post('/', function(req, res, next) {

	var paymentModel = new Payment( req.body );

	paymentModel.save( function savePayment( error, savePaymentModel ) {
		var message = "Money don't send, please try again.";
		var error = true;
		
		if ( error != null ) {
			error = false;	
			message = "You have send " + paymentModel.currency + ' ' + paymentModel.amount + ' to ' + paymentModel.email;

		}
		res.render('sendpayment', {
			title: 'Send Money', 
			msg: message,
			error: error,
			payment: paymentModel
		});
	});
});

module.exports = router;
