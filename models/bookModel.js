"use strict";

var mongoose = require("mongoose");

var bookModel = function () {
    var bookSchema = mongoose.Schema({
    title:{ type:String , required:true },
    author:{ type:String , required:true },
    category:{ type:String , required:true },
    description:{ type:String , required:true },
    publisher:{ type:String , required:true },
    price:{ type:Number , required:true },
    cover:{ type:String  , default:"https://www.packtpub.com/sites/default/files/7306OS_Web%20Development%20with%20MongoDB%20and%20NodeJS.jpg" },
    });

    bookSchema.methods.limittext = function (length) {  
     return this.description.substring(0 , length);
    };

    return mongoose.model('Book'  , bookSchema);
};

module.exports = new bookModel();