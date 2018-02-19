'use strict';

var Book = require('../models/bookModel');
module.exports = function (router) {
   
 router.get('/', function (req, res) {
    Book.find({} , function (err , books) {  
        if (err) {
            throw err ;
        } else {
            books.forEach(book => {
           book.limittext = book.limittext(40) ;
            });
            var model = { books:books } ;
            res.render('index' , model);
        }
 
    });
});

};
