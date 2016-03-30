var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Payment = mongoose.model('Payment');

router.get('/', function(req, res, next) {

	Payment.find(function (err, payments) {
		if (err) {
			console.log(err)
		}
		res.render('history', {
			title: 'Transaction History',
			payments: payments
		});
	});

	console.log();

});

module.exports = router;
