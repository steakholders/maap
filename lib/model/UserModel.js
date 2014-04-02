/*
* Name : UserModel.js
* Module : Back-end::Lib::Model::UserModel
* Location : /lib/model/
*
* History :
* 
* Version         Date           Programmer
* =================================================
* 0.0.1          2014-03-01     Serena Girardi
* -------------------------------------------------
* Definizione schema utente.
* Configurazione mongoose.
* =================================================
* 0.0.2          2014-03-14     Luca De Franceschi
* -------------------------------------------------
* Codifica metodi UserSchema.
* =================================================
*/

'use strict';

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var MaapError = require("../utils/MaapError");
var passportLocalMongoose = require('passport-local-mongoose');
var crypto = require("crypto");

exports.init = function(app) {
	var levels = [ '1', '2', '3']; // user admin superadmin
	
	// cambia l'identificativo da username a email.
	var options = {
		usernameField: 'email'
	};

	var UserSchema = new Schema({   
		email: {
			type: String,
			required: true,
			index: { unique: true },
			validate: /\b[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}\b/
		},
		password: {
			type: String
		},
		level: {
			type: String, 
			required: true,
			enum: levels // user admin superadmin  
		},
		resetPasswordToken: {
			token: {
                type: String
            }, 
			expiration: {
				type: Date
			} 
		}
	});

	UserSchema.plugin(passportLocalMongoose, options);
	
	UserSchema.methods.isUser = function() {
		return this.level === "1";
	};

	UserSchema.methods.setUser = function() {
		this.level = "1";
	};

	UserSchema.methods.isAdmin = function() {
		return this.level === "2";
	};

	UserSchema.methods.setAdmin = function() {
		this.level = "2";
	};

	UserSchema.methods.isSuperAdmin = function() {
		return this.level === "3";
	};
	
	UserSchema.methods.setSuperAdmin = function() {
		this.level = "3";
	};
	
	UserSchema.statics.createUser = function(newUser, callback, errback) {
		var nuovo = new this({
			email: newUser.email,
			level: newUser.level
		});
		this.register(nuovo, newUser.password, function(err, result) {
			if (err) {
				errback(new MaapError(err));
			} else {
				callback(result);
			}
		});
	};

	/* Ottiene la lista di tutti gli utenti */
	UserSchema.statics.countAll = function(callback, errback) {
		this.count({}, function (err, count) {
			if (err) {
				errback(new MaapError(err));
			}
			else {
				callback(count);
			}
		});
	};
	
	/* Ottiene la lista di tutti gli utenti */
	UserSchema.statics.findAll = function(callback, errback) {
		this.find({}, function (err, result) {
			if (err) {
				errback(new MaapError(err));
			}
			else {
				callback(result);
			}
		});
	};
	
	/* Ottiene la lista di tutti gli utenti, divedendo per pagine e partendo da 1 */
	UserSchema.statics.findAllPaginated = function(perpage, page, callback, errback) {
		if (page < 1) {
			errback(new MaapError(2004));
		}

		var query = this.find({}).limit(perpage).skip(perpage*(page-1));

		query.exec(function (err, result) {
			if (err) {
				errback(new MaapError(err));
			} else {
				callback(result);
			}
		});
	};
	
	UserSchema.statics.safeFindById = function(id, callback, errback) {
		this.findById(id, function(err, result) {
			if (err) {
				errback(new MaapError(err));
			}
			else {
				if (result) {
					callback(result);
				} else {
					errback(new MaapError(2000));
				}
			}
		});
	};

	UserSchema.statics.safeFindByEmail = function(userEmail, callback, errback) {
		this.findByUsername(userEmail, function(err, result) {
			if (err) {
				errback(new MaapError(err));
			}
			else {
				if (result) {
					callback(result);
				} else {
					errback(new MaapError(2001));
				}
			}
		});
	};

	UserSchema.statics.safeFindByIdAndRemove = function(userId, callback, errback) {
		this.safeFindById(userId,
			function success(result) {
				result.remove(function(err, result) {
					if (err) {
						errback(err);
					} else {
						callback(result);
					}
				});
			},
			errback
		);
	};

	UserSchema.methods.updatePassword = function(newPassword, callback, errback) {
		this.setPassword(newPassword, function(err, result) {
			if (err) {
				errback(new MaapError(err));
			} else {
				result.save(function(err, result) {
					if (err) {
						errback(new MaapError(err));
					} else {
						callback(result);
					}
				});
			}
		});
	};

	UserSchema.methods.updateLevel = function(newLevel, callback, errback) {
		this.level = newLevel;
		
		this.save(function(err, result) {
			if (err) {
				errback(new MaapError(err));
			} else {
				callback(result);
			}
		});
	};

	UserSchema.methods.generateResetPasswordToken = function(callback, errback) {
		var tokenLife = app.config.resetPassword.tokenLife;
		var token = crypto.randomBytes(32).toString('hex');
		var today = new Date();
		
		this.resetPasswordToken.token = token;
		this.resetPasswordToken.expiration = new Date(today.getTime() + tokenLife);
		
		this.save(function(err, result) {
			if (err) {
				errback(new MaapError(err));	
			} else {
				callback(result);
			}
		});
	};
	
	UserSchema.methods.invalidateResetPasswordToken = function(callback, errback) {
		this.resetPasswordToken.expiration = new Date(0);
		
		this.save(function(err, result) {
			if (err) {
				errback(new MaapError(err));	
			} else {
				callback(result.resetPasswordToken.token);
			}
		});
	};
	
	UserSchema.methods.consumeResetPasswordTokenAndUpdatePassword = function(newPassword, callback, errback) {
		var today = new Date();
		var expireDate = this.resetPasswordToken.expiration;
		var diff = today.getTime() - expireDate.getTime();
		
		if (diff < 0) {
			this.resetPasswordToken.expiration = new Date(0);
			this.updatePassword(
				newPassword,
				callback,
				errback
			);
		} else {
			errback(new MaapError(2003));
		}
	};

	UserSchema.statics.safeFindByResetPasswordToken = function(token, callback, errback) {
		this.findOne({ "resetPasswordToken.token": token }, function (err, result) {
			if(err){
				errback(new MaapError(err));
			} else {
				if (result) {
					callback(result);
				} else { 
					errback(new MaapError(2002)); 
				}
			}
		});
	};

	app.db.user.model('users', UserSchema);
	app.db.user.userSchema = UserSchema;
};
