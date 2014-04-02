/*
 * Name : forgotMailView.js
 * Module : Back-end::Lib::View::ForgotMailView
 * Location : /lib/utils
 *
 * History :
 *
 * Version         Date           Programmer
 * =================================================
 * 0.0.1          2014-03-03     Giacomo Fornari
 * -------------------------------------------------
 * ...
 * Codifica test.
 * ...
 * =================================================
 */

"use strict";

var forgotMailView = require("../../../lib/view/forgotMailView");
var assert = require('assert');

describe("forgitMailView", function() {
	
	var mail = null;

	describe("buildForgotMail TU - 108", function() {

		it("Creo oggetto mail", function (done) {
			mail = forgotMailView.buildForgotMail("userMail@gmail.com", "senderMail@gmail.com", "http://www.tokenLink.foo");
			done();
		});

		it("Controllo che non sia null", function(done) {
			assert.notEqual(mail, null, "L'oggetto mail è null");
			done();
		});

		it("Contollo i campi dato dell oggetto restituito", function (done) {
			assert.equal(mail.from, "senderMail@gmail.com", "Mittente non corretto");
			assert.equal(mail.to, "userMail@gmail.com", "Destinatario non corretto");
			assert.equal(mail.subject, "MaaP - Reset Password", "Subject non corretto");
			assert.equal(mail.headers["X-Laziness-level"], 1000, "headers non corretto");
			assert.equal(mail.text, "Link for reset your password on MaaP!", "");
			assert.equal(mail.html, '<p>Hello from <b>MaaP</b>!</p><p>Here the link for reset your password: http://www.tokenLink.foo </p>', "Token link non corretto");
			done();
		});


	});
});
