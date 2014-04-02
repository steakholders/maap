/*
* Name : ForgotMailView.js
* Module : Back-end::Lib::View::ForgotMailView
* Location : /lib/view
*
* History :
* 
* Version         Date         Programmer
* =================================================
* 0.0.1       2014-03-04       Serena Girardi
* -------------------------------------------------
* Codifica modulo.
* =================================================
*/

'use strict';

// Non serve la callback perchè è un'operazione cpu, non ci sono richieste I/O o al db e quindi non ci sono rallentamenti
exports.buildForgotMail= function(userMail, senderMail, tokenlink) {
	return {
		// sender info
		from: senderMail,
		// Comma separated list of recipients
		to: userMail,

		// Subject of the message
		subject: 'MaaP - Reset Password', //

		headers: {
			'X-Laziness-level': 1000
		},

		// plaintext body
		text: 'Link for reset your password on MaaP!',

		// HTML body
		html:
			'<p>Hello from <b>MaaP</b>!</p>'+
			'<p>Here the link for reset your password: ' + tokenlink + ' </p>'
	};
};