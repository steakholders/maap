MaaP - MongoDB as an Admin Platform
====

MaaP is an admin platform for generating administration style interfaces usefull for your business. The purpose is to provide a very simple and fast framework which allows developers to build-up a MongoDB data management application in just few minutes. 

It works with the MongoDB familiar concept of **collections**, which is a set of **documents**. For each collection you want to show and mananage with MaaP you will have two kind of views of your data:

* **Index Page**, which represents a list of all your document in the collection. By the DSL configuration you can specify what attrbutes you want to display and how many documents to show per page;
* **Show Page**, which represents a single document of your collection. Such as the *Index Page* you can configure a custom view of your document.

In addition to simple view of your data you can also **delete** or **edit** your documents directly in your browser in a really fast and easy way. 

All this customization can be performed in few minutes: you just need to write a DSL file and you're done. I guess that making such a kind of application by yourself would take days and days of work and effort. With MaaP you can do and mantain it in less than one hour. Did I get your curiosity?

Table of contents
---
* [Requirements](#requirements);
* [Get started](#get-started);
* [Project structure](#project-structure);
* [Configure your project](#configure);
* [Create a DSL configuration file](#dsl);
	- [Collection configuration](#dsl-collection);
	- [Index configuration](#dsl-index);
	- [Show configuration](#dsl-show);
	- [Row configuration](#dsl-row);
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

<a name="dsl"></a>Create a DSL configuration file
---

Inside `./collection` folder you can find two examples of DSL files. As previously described, it's possible to manually specify in which folder take your own files by changing the application's configuration editing the config.js file. The DSL file can be modified with your favorite text editor. 

The basic configuration has to comply with the following syntax:

```
collection(
    name   : "NomeCollection",
    label  : "CollectionLabel",
    id     : "CollectionId",
    weight : CollectionWeight
) {
    index(
        perpage  : DocumentsPerPage,
        populate : AttributePopulate,
        sortby   : "DefaultSort",
        order    : "DefaultSortOrder",
        query    : CollectionQuery
    ) {
        column(
            name           : "AttributeName",
            label          : "ColumnLabel",
            sortable       : IndexSortable,
            selectable     : IndexSelectable,
            transformation : TransformationFunction
        )
        // ...
    }
    show(
        populate: AttributePopulate
    ) {
        row(
            name           : "AttributeName",
            label          : "RowLabel",
            transformation : TransformationFunction
        )
        // ...
    }
} 
```

When the server is started, the back-end reads the directory and sequentially get all the files with extension `.dsl` inside it. The DSL interpreter parses these files and interfaces with the API of MaaP in order to generate all the classes and Schemas required to display the given collection.

If during this process some errors occur (i.e. wrong file interpretation, code execution) they will be reported in the application, so you can easily debug and fix. Inside the file, in addition to pure DSL syntax, you can write all the usefull javascript you want: you can declare functions or variables, just be careful with the errors.

Each expression of DSL code accepts a list of parameters in Javascript style: `parameterKey: parameterValue`. Some parameters are **required** while other are **optional** and take eventually a default value.

### <a name="dsl-collection"></a>Collection configuration

### <a name="dsl-index"></a>Index configuration

### <a name="dsl-column"></a>Column configuration

### <a name="dsl-show"></a>Show configuration

