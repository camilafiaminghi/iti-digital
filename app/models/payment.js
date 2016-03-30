var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PaymentSchema = new Schema({
	email: String,
	amount: Number,
	currency: String,
	message: String,
	cause: Boolean,
	send: Boolean,
	updated : Date
});

mongoose.model('Payment', PaymentSchema);
