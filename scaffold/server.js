"use strict";

var maap = require("maap");

var env = process.env.NODE_ENV || "development";

var config = require("./config")[env];

maap.start(config);
