'use strict';

var Book = require("../models/bookModel");
module.exports = function (router) { 
router.get("/" , (req, res) => {
    var cart        = req.session.cart ,
        displaycart =  {items:[],total:0},
        total       = 0 ;

    // get total
    for (const item in cart) {
            displaycart.items.push(cart[item]) ;
            total+=(cart[item].qty *cart[item].price);
    }
    displaycart.total = total ;
    res.render("cart/index" , {cart:displaycart});
});


    router.post("/:id" , (req,res) => {
    
        req.session.cart = req.session.cart || {};
        var cart = req.session.cart ;

        Book.findById({_id:req.params.id} , (err , book) => {
            if (err ) {
                console.log(err);
                
            } else {
                if (cart[req.params.id]) {
                    cart[req.params.id].qty++ ;

                } else {
                    cart[req.params.id] = {
                        item:book._id  ,
                        title:book.title,
                        price:book.price,
                        qty:1
                    };
                }
                res.redirect("/cart");
            }    
        });
    });
};