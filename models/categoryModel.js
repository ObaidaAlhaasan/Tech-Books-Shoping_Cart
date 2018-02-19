"use strict";

var mongoose = require("mongoose");

var categoryModel = function () {
    var categorySchema = mongoose.Schema({
        name:{type:String , required:true}
    });

    return mongoose.model('Category'  , categorySchema);
};

module.exports = new categoryModel();