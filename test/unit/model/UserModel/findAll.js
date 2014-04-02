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

	describe("findAll() TU-18", function () {
		
		it("Ritorna la lista degli utenti", function (done) {

			app.db.user.userSchema.statics.find = function (obj, cb) {
				cb(null, { users: true });
			};

			app.db.user.userSchema.statics.findAll(
				function (results) {
					assert.strictEqual(results.users, true);
				},
				function (err) {}
			);

			done();
		});

		it("Gestisce gli errori generati", function (done) {
			
			app.db.user.userSchema.statics.find = function (obj, cb) {
				cb(1000, null);
			};

			app.db.user.userSchema.statics.findAll(
				function (results) {},
				function (err) {
					assert.deepEqual(err, new MaapError(1000));
				}
			);

			done();
		});
	});
});