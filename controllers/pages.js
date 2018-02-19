'use strict';


module.exports = function (router) { 

    router.get('/about' ,(req,res,next) => {
        res.render("pages/about");
    });
 };