/*
* Name : userModel.js
* Module : Back-end::Lib::Model
* Location : /lib/model/
*
* History :
* 
* Version         Date           Programmer
* =================================================
* 0.0.0          2014-03-01     Federico Poli
* -------------------------------------------------
* ...
* 
* ...
* =================================================
*/
"use strict";

// Development

var development = {
	env: "development",

	webServer: {
		port: 3000,
		static: __dirname+"/app"
	},
	
	userDB: {
		url: "localhost:27017/users"
	},

	usersPerPage: 5,

	dataDB: {
		url: "localhost:27017/data"
	},
	
	smtp: {
		service: 'NodemailerService', // See http://www.nodemailer.com/docs/smtp for valid services
		auth: {
			user: "your.team@example.com",
			pass: "secretpassword" // or use process.env.SMTP_PASSWORD
		},
	},

	resetPassword: {
		tokenLife: 2*7*24*60*60*1000, // Two weeks in milliseconds
		link: "http://localhost:3000/#/reset_password"
	},
	
	collectionPath: __dirname+"/collections",

	allowSignup: true,

	superAdmins: [
		{
			email: "superadmin@example.com"
		},
		{
			email: "superman@example.com",
			password: "defaultpass"
		}
	]
};

// Production

var production = {
	env: "production",

	webServer: {
		port: process.env.PORT,
		static: __dirname+"/app"
	},

	userDB: {
		url: process.env.USER_DB_URL
	},
	
	usersPerPage: 20,
	
	dataDB: {
		url: process.env.DATA_DB_URL
	},

	smtp: {
		service: 'NodemailerService', // See http://www.nodemailer.com/docs/smtp for valid services
		auth: {
			user: "your.team@example.com",
			pass: process.env.SMTP_PASSWORD
		},
	},
	
	resetPassword: {
		tokenLife: 2*7*24*60*60*1000, // Two weeks in milliseconds
		link: "http://"+process.env.HOST+":"+process.env.PORT+"/#/reset_password"
	},
	
	collectionPath: __dirname+"/collections",

	allowSignup: false,

	superAdmins: [
		{
			email: "superadmin@example.com"
		},
		{
			email: "superman@example.com"
		}
	]
};

// Esporta

module.exports = {
	development: development,
	production: production
};
