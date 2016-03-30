angular.module('app', [])

.controller('PaymentController', function($scope, Payment) {

	$scope.payment  = Payment.create();
	$scope.showMask = false;
	$scope.isValid = false;
	$scope.isLoad = true;

	$scope.submitForm = function ($event, isValid) {
		$scope.isLoad = false;
		
		if ( !$scope.paymentForm.$valid && !isValid ) {
			$event.preventDefault();	
		} else {
			$scope.showMask = true;
		}
	};
}).factory('Payment', [ function () {
    return {
        create: function() {
            return {
                'email': null,
                'amount': null,  
                'currency': 'USD',    
                'message': null, 
                'cause': null,
                'created_at': null
            };
        }
    };
}]);

var App = App || {};

App.htmlElement = function (id, elem) {

    if ( id ) { elem = document.getElementById(id);  }
    this.e = elem;

    this.configString = function (str) {
        if ( str !== null ) { return (!(str instanceof Array)) ? str.split(' ') : str; }
        return [];
    };

    this.addClass = function (str) {
        var currClass = ( this.e.className.length > 0 ) ? this.e.className + ' ' : '';
        this.e.className = currClass + str;
    };

    this.removeClass = function (str) {
        var thisStr = this.configString(str);
        for ( var i = 0, len = thisStr.length; i < len; ++i ) {
            this.e.className = this.e.className.replace(new RegExp('(\\s+|^)' + thisStr[i] + '(\\s+|$)'), ' ').trim();
        }
    };

    this.hasClass = function (str) {
        return new RegExp('(?:^|\\s+)' + str + '(?:\\s+|$)').test(this.e.className);
    };

    this.addEvent = function (eventName, eventFunction) {
        var thisE = this.e;
        if ( thisE.addEventListener ) {
            thisE.addEventListener(eventName, eventFunction, false);
        } else if ( thisE.attachEvent ) {
            thisE.attachEvent('on' + eventName, function(){ eventFunction.apply( thisE, arguments ); });
        } else {
            thisE['on' + eventName] = eventFunction;
        }
    };

    this.setStyle = function (style) {
        this.e.style.cssText = style;
    };

    this.remove = function () {
        if ( this.e !== null && this.e.parentNode !== null) {
            return this.e.parentNode.removeChild(this.e);
        }
    };
};

App.bind = function ( thisObj, fn ) {
    return function() {
        fn.apply(thisObj, arguments);
    };
};

App.radio = function () {
    var htmlElement = App.htmlElement;
    var query = document.querySelectorAll('[data-radio]');
    var resetStatus = function () {
        for ( var i in query ) {
        	var elem = new htmlElement( false, query[i] );
            if ( typeof elem.e == 'object' ) {
            	var thisRadio = elem.e.getElementsByTagName('input')[0];
            	elem.removeClass('active');
            	thisRadio.removeAttribute('checked');
            }
        }
    };
    var changeStatus = function () {
    	var thisRadio = this.e.getElementsByTagName('input')[0];
    	if ( !this.hasClass('active') ) {
            this.addClass('active');
            thisRadio.setAttribute('checked', 'checked');
        } 
    };
    for ( var index in query ) {
        var elem = new htmlElement( false, query[index] );
        if ( typeof elem.e == 'object' ) {
    	 	elem.addEvent('click', resetStatus);
        	elem.addEvent('click', App.bind(elem, changeStatus));	
        }
    }
};

App.validate = function () {
    var htmlElement = App.htmlElement;
    var query = document.querySelectorAll('[data-validate]');

    var validate = function (e) {
    	e.preventDefault();
    	console.log(e);
    	console.log(this);

    	var forms = document.querySelectorAll('[name="' + this.e.dataset.validate + '"]');
    	var inputs = forms[0].getElementsByClassName('required');

    	for ( var i in inputs ) {
    		
    	}

    	console.log(forms);
    };

    for ( var index in query ) {
        var elem = new htmlElement( false, query[index] );
        if ( typeof elem.e == 'object' ) {
        	elem.addEvent('click', App.bind(elem, validate));	
        }
    }
};

(function (app) {
    var app = app || {};

    app.radio();

}(App || {}));