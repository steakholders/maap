#!/usr/bin/env node

/*
* Name : installer.js
* Module : Back-end::Lib
* Location : /lib/
*
* History :
* 
* Version         Date           Programmer
* =================================================
* 0.0.1          2014-03-01     Federico Poli
* -------------------------------------------------
* Codifica modulo.
* =================================================
*/

"use strict";

var fs = require('fs');
var ncp = require('ncp').ncp;
var program = require('commander');

var scaffold_folder = __dirname + '/../scaffold';
var filter = "";

program
	.version(JSON.parse(fs.readFileSync(__dirname + '/../package.json', 'utf8')).version);

program
	.command('create <project-name>')
	.description('create a new scaffold project in the folder <project-name>')
	.action(function(project_name){
		var destination = './'+project_name;

		console.log('Preparing scaffold into '+destination+' ...');
		ncp(scaffold_folder, destination, {filter: filter}, function (err) {
			if (err) {
				return console.error(err);
			}
			console.log('Done!');
			console.log('Now you can install the dependencies and start the server:');
			console.log('cd "'+project_name+'" && npm install && npm start');
		});
	});

program
	.command('*')
	.description('show help')
	.action(program.help);

program
	.parse(process.argv);

if (process.argv.length === 2) {
	program.help();
}