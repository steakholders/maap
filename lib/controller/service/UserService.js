/*
* Name : UserService.js
* Module : Back-end::Lib::Controller::Service::UserService
* Location : /lib/controller/controller
*
* History :
* 
* Version         Date           Programmer
* =================================================
* 0.0.1           2014-03-04     Luca De Franceschi
* -------------------------------------------------
* Codifica modulo.
* =================================================
* 0.0.2          2014-03-26     Luca De Franceschi
* -------------------------------------------------
* Modifiche ed incrementi metodi
* =================================================
*/

'use strict';
var MaapError = require("../../utils/MaapError");

/* Restituisce la lista di tutti gli utenti presenti nel sistema */
exports.usersList = function(req, res, next) {
	var User = req.app.db.user.model('users');
	var perpage = req.app.config.usersPerPage || 50;
	User.findAllPaginated(
		perpage,
		req.query.page,
		function success(result) {
			User.countAll(
				function success(count) {
					var object = {
						perpage: perpage,
						numusers: count,
						users: result
					};
					res.json(object);
				},
				function error(err) {
					next(err);
				}
			);
		},
		function error(err) {
			next(err);
		}
	);
};

/* Inserisce un nuovo utente nel database degli utenti che non sia Super Admin */
exports.insertUser = function(req, res, next) {
	var User = req.app.db.user.model('users');
	
	if (req.body.level !== "3") {
		var userobj = { 
			email: req.body.email,
			password: req.body.password,
			level: req.body.level
		};
		
		User.createUser(
			userobj,
			function success(result) {
				res.json(result);
			},
			function error(err) {
				next(err);
			}
		);
	}
	else{
		next(new MaapError(9002));
	}
};

/* Registra un utente indicando solo email e password */
exports.registerUser = function(req, res, next) {
	var User = req.app.db.user.model('users');

	if (!req.body.email || !req.body.password) {
		next(new MaapError(9004));
		return;
	}
	
	var userobj = {
		email: req.body.email || "",
		password: req.body.password || "",
		level : "1"
	};

	User.createUser(
		userobj,
		function success(result) {
			res.json(result);
		},
		function error(err) {
			next(err);
		}
	);
};

exports.disabledRegisterUser = function(req, res, next) {
	res.send(401, new MaapError(9000).toDict());
};

/* Restituisce i dati dell'utente con l'id indicato */
exports.userIdShowPage = function(req, res, next) {
	var User = req.app.db.user.model('users');

	User.safeFindById(
		req.params.id,
		function success(result) {
			res.json(result);
		},
		function error(err) {
			next(err);
		}
	);
};

/* Elimina l'utente con l'id indicato se non è Super Admin o l'utente è se stesso*/
exports.deleteUser = function(req, res, next) {
	var User = req.app.db.user.model('users');

	User.safeFindById(req.params.id,
		function success(result){
			if ((result.email !== req.user.email) && (result.level !== "3")) {
				User.safeFindByIdAndRemove(
					req.params.id,
					function success(result) {
						res.json(result);
					},
					function error(err) {
						next(err);
					}
				);
			}
			else{
				next(new MaapError(9001));
			}
		},
		function error(err){
			next(err);
		}
	);
};	

/* Aggiorna il livello dell'utente indicato con i parametri inseriti 
controllando che non stia facendo update con level==3 o che non stia modificando un Super Admin */
exports.updateLevel = function(req, res, next) {
	var User = req.app.db.user.model('users');
	if(req.body.level !== "3"){
		User.safeFindById(req.params.id,
			function success(result) {
				if((result.email !== req.user.email) && (result.level !== "3")){
					result.updateLevel(
						req.body.level,
						function success(result) {
							res.json(result);
						},
						function error(err) {
							next(err);
						}
					);
				}
				else{
					next(new MaapError(9003));
				}
			},
			function error(err) {
				next(err);
			}
		);
	}
	else {
		next(new MaapError(9003));
	}
};
