/*
* Name : CreateSuperAdmins.js
* Module : Back-end::Lib::Utils::CreateSuperAdmins
* Location : /lib/utils
*
* History :
* 
* Version         Date           Programmer
* =================================================
* 0.0.1          2014-02-28     Federico Poli
* -------------------------------------------------
* Codifica modulo.
* =================================================
*/

"use strict";

var async = require("async");
var crypto = require("crypto");

var createSuperAdmins = function(superAdmins, User) {
	
	// Dizionario delle mail dei SuperAdmin
	var existsSuperAdmin = {};
	for (var i=0; i<superAdmins.length; i++) {
		existsSuperAdmin[superAdmins[i].email] = true;
	}
	
	var createSuperAdmin = function(superadmin, callback) {
		superadmin.level = "3"; // SuperAdmin
		
		if (!superadmin.password) {
			// Sarà costretto a fare il "recupera password"
			superadmin.password = crypto.randomBytes(32).toString('hex');
		}

		User.createUser(superadmin,
			function success(result) {
				callback(null, result);
			},
			function error(err) {
				callback(err);
			}
		);
	};

	// Eleva o crea i SuperAdmin che sono nella lista dei superAdmins configurata
	var ensureSuperAdmin = function(superadmin, callback) {
		User.findByUsername(superadmin.email, function(err, result) {
			if (err) {
				callback(err);
			}
			else {
				if (result) {
					// Esiste: settalo SuperAdmin
					if (!result.isSuperAdmin()) {
						result.setSuperAdmin();
						result.save(callback);
					} else {
						callback();
					}
				} else {
					// Non esiste: crea SuperAdmin
					createSuperAdmin(superadmin, callback);
				}
			}
		});
	};

	// Abbassa ad Admin tutti i SuperAdmin che non sono nella lista dei superAdmins configurata
	var pruneSuperAdmin= function(user, callback) {
		if (!existsSuperAdmin[user.email]) {
			user.setAdmin();
			user.save(callback);
		} else {
			callback();
		}
	};

	async.parallel(
		[
			function parallel(callback) {
				async.map(superAdmins, ensureSuperAdmin, callback);
			},
			function parallel(callback) {
				User.find({ level: "3" }, function (err, result) {
					if (err) {
						console.error("Error createSuperAdmins:", err);
						callback(err);
					} else {
						async.map(result, pruneSuperAdmin, callback);
					}
				});
			}
		],
		function then(err, results) {
			if (err) {
				console.error("Error createSuperAdmins:", err);
			} else {
				console.log("SuperAdmins created.");
			}
		}
	);
};

module.exports = createSuperAdmins;
