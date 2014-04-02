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
//var MaapError = require("../../../../lib/utils/MaapError");
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

	describe("init() TU-17", function () {

		it("Inizializza il metodo isUser", function (done) {
			assert.notEqual(app.db.user.userSchema.methods.isUser, null);
			done();
		});

		it("Inizializza il metodo setUser", function (done) {
			assert.notEqual(app.db.user.userSchema.methods.setUser, null);
			done();
		});

		it("Inizializza il metodo isAdmin", function (done) {
			assert.notEqual(app.db.user.userSchema.methods.isAdmin, null);
			done();
		});

		it("Inizializza il metodo setAdmin", function (done) {
			assert.notEqual(app.db.user.userSchema.methods.setAdmin, null);
			done();
		});

		it("Inizializza il metodo isSuperAdmin", function (done) {
			assert.notEqual(app.db.user.userSchema.methods.isSuperAdmin, null);
			done();
		});
		
		it("Inizializza il metodo setSuperAdmin", function (done) {
			assert.notEqual(app.db.user.userSchema.methods.setSuperAdmin, null);
			done();
		});
		
		it("Inizializza il metodo createUser", function (done) {
			assert.notEqual(app.db.user.userSchema.statics.createUser, null);
			done();
		});
		
		it("Inizializza il metodo countAll", function (done) {
			assert.notEqual(app.db.user.userSchema.statics.countAll, null);
			done();
		});
		
		it("Inizializza il metodo findAll", function (done) {
			assert.notEqual(app.db.user.userSchema.statics.findAll, null);
			done();
		});
		
		it("Inizializza il metodo findAllPaginated", function (done) {
			assert.notEqual(app.db.user.userSchema.statics.findAllPaginated, null);
			done();
		});
		
		it("Inizializza il metodo safeFindById", function (done) {
			assert.notEqual(app.db.user.userSchema.statics.safeFindById, null);
			done();
		});
		
		it("Inizializza il metodo safeFindByIdAndRemove", function (done) {
			assert.notEqual(app.db.user.userSchema.statics.safeFindByIdAndRemove, null);
			done();
		});
		
		it("Inizializza il metodo updatePassword", function (done) {
			assert.notEqual(app.db.user.userSchema.methods.updatePassword, null);
			done();
		});
		
		it("Inizializza il metodo updateLevel", function (done) {
			assert.notEqual(app.db.user.userSchema.methods.updateLevel, null);
			done();
		});
		
		it("Inizializza il metodo generateResetPasswordToken", function (done) {
			assert.notEqual(app.db.user.userSchema.methods.generateResetPasswordToken, null);
			done();
		});
		
		it("Inizializza il metodo invalidateResetPasswordToken", function (done) {
			assert.notEqual(app.db.user.userSchema.methods.invalidateResetPasswordToken, null);
			done();
		});
		
		it("Inizializza il metodo consumeResetPasswordTokenAndUpdatePassword", function (done) {
			assert.notEqual(app.db.user.userSchema.methods.consumeResetPasswordTokenAndUpdatePassword, null);
			done();
		});
		
		it("Inizializza il metodo safeFindByResetPasswordToken", function (done) {
			assert.notEqual(app.db.user.userSchema.statics.safeFindByResetPasswordToken, null);
			done();
		});
	});
});