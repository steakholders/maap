/*
* Name : createUser.js
* Module : Back-end::Lib::Model::UserModel
* Location : /lib/model/
*
* History :
* 
* Version         Date           Programmer
* =================================================
* 0.0.1          2014-03-03     Federico Poli
* -------------------------------------------------
* Codifica test.
* =================================================
* 0.0.2          2014-03-16     Giacomo Fornari
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

	describe("updateLevel() TU-20", function () {

		it("Aggiorna il livello dell'utente con l'id dato", function (done) {

			app.db.user.userSchema.methods.save = function (cb) {
				cb(null, 1);
			};

			app.db.user.userSchema.methods.updateLevel(
				{ _id: 123 },
				function (results) {
					assert.strictEqual(results,1);
				},
				function (err) {}
			);

			done();
		});

		it("Gestisce gli errori se il salvataggio degli aggiornamenti dell'utente fallisce", function (done) {

			app.db.user.userSchema.methods.save = function (cb) {
				cb(1000, null);
			};

			app.db.user.userSchema.methods.updateLevel(
				{ _id: 123 },
				1,
				function (results) {},
				function (err) {
					assert.deepEqual(err, new MaapError(1000));
				}
			);

			done();
		});
	});
});