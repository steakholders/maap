/*
* Name : createUser.js
* Module : Back-end::Lib::Model::UserModel
* Location : /lib/model/
*
* History :
* 
* Version         Date           Programmer
* =================================================
* 0.0.1          2014-03-01     Federico Poli
* -------------------------------------------------
* Codifica test.
* =================================================
* 0.0.2          2014-03-14     Giacomo Fornari
* -------------------------------------------------
* Codifica test.
* =================================================
*/
"use strict";

var UserModel = require("../../../../lib/model/UserModel");
var MaapError = require("../../../../lib/utils/MaapError");
var assert = require('assert');

describe("UserModel", function() {
	
	var app = {
			db: {
				user: {
					model: function (a, b) {
					}
				}
			},
			config: {
				usersPerPage: 1
			}
		};
		
	UserModel.init(app);

	describe("createUser() TU-21", function() {

		it("Registra un utente nel database degli utenti", function (done) {
			
			var StubClass = function(obj) {
				assert.deepEqual(obj, {
					email: "email",
					level: "1"
				});
			};
			
			StubClass.register = function (user, password, cb) {
				cb(null, 1);
			};
			
			StubClass.createUser = app.db.user.userSchema.statics.createUser;

			StubClass.createUser({
					email: "email",
					level: "1",
					password: "password"
				},
				function (results) {
					assert.strictEqual(results, 1);
					done();
				},
				function (err) {}
			);
		});

		it("Gestisce gli errori se la registrazione dell'utente fallisce", function (done) {

			var StubClass = function(obj) {
				assert.deepEqual(obj, {
					email: "email",
					level: "1"
				});
			};

			StubClass.register = function (user, password, cb) {
				cb(1000, null);
			};
			
			StubClass.createUser = app.db.user.userSchema.statics.createUser;

			StubClass.createUser({
					email: "email",
					level: "1",
					password: "password"
				},
				function (results) {},
				function (err) {
					assert.deepEqual(err, new MaapError(1000));
				}
			);

			done();
		});
	});
});