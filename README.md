MaaP - MongoDB as an Admin Platform
====

MaaP it's an admin platform for generating administration style interfaces, based on **Node.js** and **MongoDB** stack.          
Its purpose is to make it simple for developers to implement interfaces for manage business data with ease, providing a DSL that allows you to define the content of your webpages in minutes.


Usage
---

MaaP is an npm package.
Setting up MaaP new Project:

```
npm install -g maap
maap create project
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
