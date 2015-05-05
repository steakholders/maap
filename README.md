MaaP - MongoDB as an Admin Platform
====

MaaP is an admin platform for generating administration style interfaces usefull for your business. The purpose is to provide a very simple and fast framework which allows developers to build-up a MongoDB data management application in just few minutes. How can it be so simple? 

Table of contents
---
* [Requirements](#requirements);
* [Get started](#get-started);
* [Project structure](#project-structure);
* [Configure your project](#configure);
* [Create a DSL configuration](#dsl);
* [Admin your application](#admin);
* [Deploy your application](#deploy);
* [Support](#support);
* [Demo](#demo);

<a name="requirements"></a>Requirements
---

In order to create a new MaaP application you need at least:

* **Node.js**, version `>= 0.10.0.1`;
* *npm* (*node package manager*), version `>= 1.3.0.2`, for back-end. Further dependencies will be resolved during the installation process;
* **Bower** for front-end dependencies which will be installed during the installation process;
* A *MongoDB* database for your data;
* A *MongoDB* database for your users;

Supported browser:

* **Chrome**, version `>= 30.0.x`;
* **Firefox**, version `>= 24.x`.

<a name="get-started"></a>Get started
---

You need to download MaaP as a **global package** from npm. For other informations you can refer to MaaP's npm [page](https://www.npmjs.com/package/maap). You will probably need root privileges in order to perform this operation. Open a terminal and type:

```
$ npm install -g maap
```

Now you can create a new MaaP application in a dedicated directory chosen by you:

```
$ maap install <ProjectName>
```

where *<ProjectName>* will be the name of your application. Once you submit this command a process will start to make the scaffolding of a new project and it will place all the files you need inside a new directory with the same name you typed.

```
$ cd <ProjectName>
```

If you get lost try to type:

```
$ maap --help
```

The following step is to install all the **dependencies** you need in order to start your application. So, as you are probably familiar, you need to install *npm* and *bower* packages:

```
$ npm install
```
```
$ bower install
```

Your application is ready and you can start it by typing:

```
$ npm start
```

Then open a browser instance and connect to `localhost:3000`. You should see the login page of your application. If everything is correct now let's take a look at how the application scaffolding look:

<a href="project"></a>Project structure
---

MaaP is a framework based on two main technologies:

* [Node.js](https://nodejs.org/) for the *back-end*;
* [Angular.js](https://angularjs.org/) for the *front-end*.

All the back-end scripts and API are provided by the package itself, so you will not find in your application. You can always take a look at the directory `./lib` of this repository if you want to know something more about how MaaP works. On the other hand you've the complete control on the front-end side of your application, so you can edit HTML, CSS and Angular scripts however you so desire, in order to customize your application. If you have no time for this don't worry: we provided a nice and professional template based on [Bootstrap](http://getbootstrap.com/). From the root of your project you can find the following files and directories:

* `./app`: here you can find the static files served by the back-end, in particular:
	- `./views`, where resides the html template files;
	- `./scripts`, where resided all the Angular scripts;
	- `./styles`, where resides all the stylesheets.
* `./collections`: here you will place your **DSL** configuration files;
* `./extra`: a collection of utilities scripts (for instance population scripts);
* `./test`: a collection of front-end unit test with *karma*;
* `package.json`: here you'll describe your application and define all back-end dependencies;
* `bower.json`: here you'll manage all the front-end dependencies;
* `config.js`: a very important file where you will configure your application.
* `server.js`: the script which starts the application.


<a href="configure"></a>Configure your project
---

In order to connect your application with your personal Mongo database and configure other parameters you need to edit the `config.js` file in the root directory of your project. Here you have to set two main environment:

* **Development**;
* **Production**.

Now let's take a look at all the parameters you have to configure:

* `env` [String]: the name of the environment;
* `webServer` [Json]:
	- `port` [Integer]: the server port;
	- `static` [String]: the location at which the server is serving static files.
* `userDb`: this is the database where you will store the users of your application;
	- `url` [String]: this is the resource identifier of your user Mongo database;
* `dataDb` [Json]: this is the database where you store all the data you want to manage;
	- `url` [String]: this is the resource identifier of your data Mongo database;
* `smtp` [Json]: this is the mail service for user's password recovering system;
	- `service` [String]: this is the name of the service which is responsible of sending emails;
	- `auth` [Json]: here you have to provide `user` of the service, represented by the email, and the `password`.
* `resetPassword` [Json]: this object describes the configuration of password recovery system;
	- `tokenLife` [Integer]: represents the amount of milliseconds at the end of which the recovery page expires;
	- `link` [String]: represents the page where you will show the password recovery system;
* `collectionPath` [String]: this is the path where you want to place your DSL configuration files;
* `allowSignup` [Boolean]: indicates whether is possible or not to perform a signup in your application.
* `superAdmins` [Json Array]: it's an array of defaults super admins which can access to your application. This is really usefull if you still don't have any users in your database. Each object must be composed of:
	- `email` [String]: represents the email address of the superadmin;
	- `password` [String]: represents the password of the superadmin;

Now your back-end is completely configured and you have complete control on your application. We need to configure the front-end now. Open the file `./app/scripts/config.js`. In this file an Angular module is defined and it expose (with *constants*) all the front-end configuration parameters you need:

* `debug` [Boolean]: choose whether to show details in errors;
* `navBarCollections` [Integer]: choose how many collections to show in the navigation header bar;
* `showSignup` [Boolean]: choose whether to show or hide the signup button;
* `reportLink` [String]: this is the address where the users of your application will report any bugs.

Configuration Files 
---
You can edit these configuration files:

```
config.js                    # Back-end configuration
app/scripts/config.js        # Front-end configuration
collections/*.dsl            # DSL configuration File 
```
For more information see [*New Project configuration*](https://github.com/steakholders/maap/wiki/New-project-configuration) from wiki.


Populate test database
---
For populate the database with test collections, move to `./extra/` directory.
JSON files contain test data. 

`populate-users-db.sh` and `populate-data-db.sh` are scripts that populate the database with example data, To use them on a local database, do:

`./populate-users-db.sh --host localhost:27017 --db users`
`./populate-data-db.sh --host localhost:27017 --db data`

For more details see [*First usage*](https://github.com/steakholders/maap/wiki/First-Usage) from wiki.



DSL Configuration
---
Here are a few common configurations for a DSL file:


```  javascript
collection(
	name: "userscollection", 
	label: "Users", 
	id: "myId", 
	weight: 1 
) {
	index( 
		perpage: 50, 
		populate: "father", 
		sortby: "username", 
		order: "asc", 
		query: { country: "Italy"}
	) {
		column(
			name: "username", 
			label: "Username", 
			sortable: true, 
			selectable: true, 
			transformation: function(val) { return "The Great " + val; }
		)
		// ...
	}
	show(
		populate: "father"
	) {
		row(
			name: "username", 
			label: "Username", 
			transformation: function(val) { return "The Great " + val; }
		)
		// ...
	}
} 

```

For see more details [*DSL File Configuration*](https://github.com/steakholders/maap/wiki/DSL-File-Configuration) and [*DSL Configuration File Example*](https://github.com/steakholders/maap/wiki/DSL-Configuration-File-Example) from wiki.
