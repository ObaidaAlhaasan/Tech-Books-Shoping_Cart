"user strict";
var mongoose = require("mongoose");

var db = function () {  
    return{
        config:function (con) { 
            mongoose.connect("mongodb://localhost:27017/Bookstore");
            var db = mongoose.connection ;
            db.on("error" ,console.error.bind(console , "Connection error") );
            db.once("open" , function () {  
                console.log("Connected TO DATABASE");
                
            });
         }
    };  
};


module.exports = db();