MaaP - MongoDB as an Admin Platform
====

MaaP is an admin platform for generating administration style interfaces usefull for your business. The purpose is to provide a very simple and fast framework which allows developers to build-up a MongoDB data management application in just few minutes. How can it be so simple? 

Table of contents
---
* [Requirements](#requirements);
* [Get started](#get-started);
* Configure your project;
* Create a DSL configuration;
* Admin your application;
* Deploy your application;
* Support;
* Demo;

<a name="requirements"></a>Requirements {#requirements}
---

In order to create a new MaaP application you need at least:

* **Node.js**, version `>= 0.10.0.1`;
* **NPM* (*node package manager*), version `>= 1.3.0.2`, for back-end. Further dependencies will be resolved during the installation process;
* **Bower** for front-end dependencies which will be installed during the installation process;
* A *MongoDB* database for your data;
* A *MongoDB* database for your users;

Supported browser:

* **Chrome**, version `>= 30.0.x`;
* **Firefox**, version `>= 24.x`.

Get started {#get-started}
---

You need to download MaaP as a global package from npm. For other informations you can refer to MaaP's npm [page](https://www.npmjs.com/package/maap). You will probably need root permission in order to perform this operation. Open a terminal and type:

```
$ npm install -g maap
```
Nice, now it's time to create a new MaaP application in a dedicated directory:

```
$ maap install <ProjectName>
```

where *<ProjectName>* will be the name of your application. Once you submit this command a process will start to make the scaffolding of a new project and it will place all the files you need inside a new directory with the same name you typed.

```
$ cd <ProjectName>
```

The following step is to install all the **dependencies** you need in order to start your application. So, as you are probably familiar, you need to install *npm* and *bower* packages:

```
$ npm install
```
```
$ bower install
```  
cd project
npm install
vim config.js
npm start
```

For more details see [*First usage*](https://github.com/steakholders/maap/wiki/First-Usage) from wiki.

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
