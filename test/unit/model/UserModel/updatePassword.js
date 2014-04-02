/*
* Name : createUser.js
* Module : Back-end::Lib::Model::UserModel
* Location : /lib/model/
*
* History :
* 
* Version         Date           Programmer
* =================================================
* 0.0.1          2014-03-04     Federico Poli
* -------------------------------------------------
* Codifica test.
* =================================================
* 0.0.2          2014-03-15     Giacomo Fornari
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

	describe("updatePassword() TU-23", function () {

		it("Aggiorna la password con la nuova data", function (done) {

			var obj = {
				save: null
			};

			obj.save = function (cb) {
				cb(null, 1);
			};

			app.db.user.userSchema.methods.setPassword = function (newPassword, cb) {
				cb(null, obj);
			};

			app.db.user.userSchema.methods.updatePassword(
				"pass",
				function (result) {
					assert.strictEqual(result, 1);
					done();
				},
				function (err) {}
			);
		});

		it("Gestisce l'errore generato dalla modifica della password", function (done) {

			app.db.user.userSchema.methods.setPassword = function (newPassword, cb) {
				cb(1000);
			};

			app.db.user.userSchema.methods.updatePassword(
				"pass",
				function (result) {},
				function (err) {
					assert.deepEqual(err, new MaapError(1000));
					done();
				}
			);
		});

		it("Gestisce l'errore generato dal salvataggio delle modifiche", function (done) {

			var obj = {
				save: null
			};

			obj.save = function (cb) {
				cb(1000);
			};

			app.db.user.userSchema.methods.setPassword = function (newPassword, cb) {
				cb(null, obj);
			};

			app.db.user.userSchema.methods.updatePassword(
				"pass",
				function (result) {},
				function (err) {
					assert.deepEqual(err, new MaapError(1000));
					done();
				}
			);
		});
	});
});