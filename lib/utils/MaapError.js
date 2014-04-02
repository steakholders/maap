/*
* Name : MaapError.js
* Module : Back-end::Lib::Utils::MaapError
* Location : /lib/utils
*
* History :
* 
* Version         Date           Programmer
* =================================================
* 0.0.1          2014-02-27     Federico Poli
* -------------------------------------------------
* Codifica modulo.
* =================================================
*/

"use strict";

/*
	Per _file_, non per funzione
	1xxx = Authentication
	2xxx = UserModel
	3xxx = DslDomain
	5xxx = DslConcreteStrategy
	6xxx = NotFoundHandler
	7xxx = IndexService
	8xxx = DslCollectionModel
	9xxx = UserService
	10xxx = ProfileService
	12xxx = DocumentSchema
	13xxx = ShowModel
	14xxx = IndexModel
	15xxx = Column
	16xxx = Row
	17xxx = DslLoaderHandler
	18xxx = ShowService
*/
var error_by_code = {
	1000: ["Login error", "Wrong username or password"],
	1001: ["Access denied", "You must be logged"],
	1002: ["Access denied", "You must not be logged"],
	1003: ["Access denied", "Unknow user Level"],
	1004: ["Access denied", "You must be Admin"],
	1005: ["Access denied", "You must be SuperAdmin"],
	
	2000: ["User not found", "The user you are looking for by id can not be found in our database"],
	2001: ["User not found", "The user you are looking for by email can not be found in our database"],
	2002: ["User not found", "The user you are looking for by reset password token can not be found in our database"],
	2003: ["Reset password error", "Invalid token"],
	2004: ["Page not found", "The page number must be a positive integer"],

	3000: ["Collection not found", "The collection you are looking for can not be found"],
	3001: ["Multiple definition"],

	5001: ["DSL parsing error"],
	5002: ["DSL execution error"],

	6000: ["Not found", "The resource you requested does not exist"],

	7000: ["Collection not found", "The collection you requested can not be found"],

	8000: ["DSL execution error"],
	8001: ["Collection id malformed"],

	9000: ["Access denied", "Signup is disabled"],
	9001: ["Access denied", "Request denied, you can't delete a Super Admin or yourself"],
	9002: ["Access denied", "Request denied, you can't create a Super Admin"],
	9003: ["Access denied", "Request denied, you can't modify a Super Admin or yourself"],
	9004: ["Invalid credentials", "You must specify a valid email and a password"],
	
	10000: ["Wrong password", "The old password you insered is not correct"],

	12000: ["Document not found", "The document you requested can not be found"],

	13000: ["DSL execution error"],

	14000: ["DSL execution error"],

	15000: ["DSL execution error"],

	16000: ["DSL execution error"],
	
	17000: ["DSL error", "An error occurred while loading the DSL"],

	18000: ["Collection not found", "The collection you requested can not be found"]
};

var MaapError = function (error, message, details) {
	// Check if it is Error
	if (error instanceof Error) {
		console.error("MaapError received an Error instead of an error code:", error);
		this.code = 0;
		this.title = error.name;
		this.message = error.message;
		this.details = error.stack;
	}
	else
	// Check if it is MaapError
	if (error instanceof MaapError) {
		console.error("MaapError received a MaapError instead of an error code:", error);
		this.code = error.code;
		this.title = error.title;
		this.message = error.message;
		this.details = error.details;
	}
	else
	// Check if it is Integer
	if (error === parseInt(error)) {
		this.code = error;
		if (error_by_code[error] === undefined) {
			console.error("MaapError received an unknown error code:", error);
			this.title = "Unknown error";
			this.message = "Error number "+error;
		} else {
			var err = error_by_code[error];
			this.title = err[0];
			this.message = err[1];
		}
	}
	else {
		// Something else
		console.error("MaapError received a strange argument:", error);
		this.code = 0;
		this.title = "Unknown error";
		this.message = error;
	}

	// Overwrite if defined
	if (message) {
		this.message = message;
	}
	if (details) {
		this.details = details;
	}
};

MaapError.prototype.toDict = function(){
	var dict = {
		title: this.title,
		code: this.code, // NON è il codice http
		message: this.message
	};
	if (this.details) {
		dict.details = this.details;
	}
	return dict;
};

MaapError.prototype.toString = function(){
	var str = "MaapError:";
	str += " " + this.title;
	str += " [" + this.code + "]";
	str += ": " + this.message;
	if (this.details) {
		str += "\n" + this.details;
	}
	return str;
};

MaapError.prototype.toError = function(){
	return new Error(this.toString());
};

module.exports = MaapError;
