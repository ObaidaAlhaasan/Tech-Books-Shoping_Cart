'use strict';

var ManageModel = require('../models/manage');
var Book = require("../models/bookModel");
var Category = require("../models/categoryModel");

module.exports = function (router) {

    var model = new ManageModel();

    router.get('/', function (req, res) {
        res.render('manage/manage', model);
    });

    router.get("/books", function (req,res) {  

        Book.find({} , function (err , books) {  
            if (err) {
                console.log(err.message);
                
            } else {
                var model = {books:books};
                
                res.render("manage/books/index" , model);
            }

        });
    } ) ;


    router.get("/books/add/", function (req,res) {
        Category.find({} , function(err , categories) {
            if (err) {
                console.log(err);
                
            } else {
                var model = {categories:categories};
                res.render("manage/books/add"  , model);
            }
        });
    } ) ;

    /// post add book

    router.post("/book/add" ,function (req,res) {  
        var title       = req.body.title ,
            author      = req.body.author,
            description = req.body.description,
            publisher   = req.body.publisher,
            price       = req.body.price,
            category    = req.body.category ;

        if (title === "" || !title  ||author=="" || !author || description===""||!description||  publisher==="" || !publisher || isNaN(price) ||  category===""||!category
        ) {
            // give me error path shold be a string 
            // req.flash("error" ,"Erorr : please fill out all fields and price is Number" );
            res.location("/manage/books/add");
            res.redirect("/manage/books/add");
        } else {
            var newBook = new Book({
                title:title,
                author:author,
                description:description,
                publisher:publisher,
                price:price , 
                category:category
            });

            newBook.save(function (err) {  
                if (err) {
                    console.log(err.message);
                } else {
                    // give me error path shold be a string 
                    // req.flash("success" , "Book Added Successfuly .. ");
                    res.location("/manage/books");
                    res.redirect("/manage/books");
                }
            });


        }
    });
    


    router.get("/books/edit/:id", function (req,res) {  
        Book.findOne({_id:req.params.id} , function (err , book) { 
            if (err) {
                console.log(err);
                
            } else {

                if (!book) {
                    req.flash("User Not Found ");
                } else {

                    Category.find({} ,(err , cat) => {
                       if (err) {
                           throw err ; 
                       } else {
                           if (cat) {
                            var model = {book:book , cat:cat};
                            res.render("manage/books/edit" , model);
                           }
                       } 
                    });
                }

            }
         });
    } ) ;

// /////////////////////////////////////////// post edit book 

router.post("/books/edit/:id" , (req,res,next) => {
    var title       = req.body.title ,
    author      = req.body.author,
    description = req.body.description,
    publisher   = req.body.publisher,
    price       = req.body.price,
    category    = req.body.category ;

        Book.findOne({_id:req.params.id}  , (err , book ) => {
            if (err) {
             console.log(err);
             
            } else {
                if (!book) {
                    // req.flash("No Book Found .!");
                    res.location("/manage/books");
                    res.redirect("/manage/books");
                } else {
                    book.title = title ;
                    book.author = author ;
                    book.price = price ;
                    book.publisher = publisher ;
                    book.description = description ;
                    book.category  =category ;

                    book.save(function (err) { 
                        if (err) {
                        console.log(err);
                        
                        } else {
                            // req.flash("No Book Found .!");
                            res.location("/manage/books");
                            res.redirect("/manage/books");
                        }
                     });
                    
                }
            }
        } );
});

////////////////// Delete Book 
//manage/books/delete/"+id

router.delete("/books/delete/:id" ,(req,res) => {
    Book.remove({_id: req.params.id}  , (err) => {
        if (err) {
            throw err ;
        } else {
            // req.flash("success" , "Book Deleted ..");
            res.location("/manage/books");
            res.redirect("/manage/books");
            
        }
    });
});

// /////////////////////////////////////////////////////////

    // category
    router.get("/category", function (req,res) {
        Category.find({} , function(err , categories) {
            if (err) {
                console.log(err);
                
            } else {
                var model = {categories:categories};
                res.render("manage/category/index" , model);
            }
        });
    } ) ;


    router.get("/category/add", function (req,res) {  
        res.render("manage/category/add");
    } ) ;



  ///// /manage/category/add

  router.post("/category/add" ,function (req,res) {  
    var name       = req.body.name
    if (name=== "" || !name  ||name=="") {
        // give me error path shold be a string 
        // req.flash("error" ,"Erorr : please fill out all fields ");
        res.location("/manage/category/add");
        res.redirect("/manage/category/add");
    } else {
        var category = new Category({
            name:name 
        });

        category.save(function (err) {  
            if (err) {
                console.log(err.message);
            } else {
                // give me error path shold be a string 
                // req.flash("success" , "category Added Successfuly .. ");
                res.location("/manage/category");
                res.redirect("/manage/category");
            }
        });


    }
});

// 
    router.get("/category/edit/:id", function (req,res) {  
        Category.findOne({_id:req.params.id} , (err , categories) => {
           if (err) {
            console.log(err);
            
        } 
           var model  = {categories:categories};
           res.render("manage/category/edit" , model);
        });
    } ) ;



router.post("/category/edit/:id"  ,(req,res) => {
   var name = req.body.name ;
   
       Category.findOne({_id:req.params.id} , (err , cat) => {
           if (err) {
               console.log(err);
               
           } else {
               if (!cat) {
                    //    req.flash("error" , "name is required");
                    res.location("/manage/category/add");
                    res.redirect("/manage/category/add");
               } else {
                  cat.name = name ;

                  cat.save((err) => {
                     if (err) {
                         console.log(err);
                         
                     } else {
                    //    req.flash("error" , "name is required");
                    res.location("/manage/category");
                    res.redirect("/manage/category");
                     } 
                  });
               }
           }
       });
   
});

    ////////////////// Delete category 
//manage/category/delete/"+id

router.delete("/category/delete/:id" ,(req,res) => {
    Category.remove({_id: req.params.id}  , (err) => {
        if (err) {
            throw err ;
        } else {
            // req.flash("success" , "Book Deleted ..");
            res.location("/manage/category");
            res.redirect("/manage/category");
            
        }
    });
});


};
