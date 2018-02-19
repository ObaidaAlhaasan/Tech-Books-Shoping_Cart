$(document).ready(function () {
    'use strict';  
    // nice scrolling

    $("html").niceScroll({
        cursorcolor:"skyblue",
        cursorwidth:"11px",
        cursorborder:"none",
    });
    
    // animation button 


    $(".btn, button").hover(function () {
        // over
        $(this).addClass("animated infinite  pulse");
    }, function () {
        // out
        $(this).removeClass("animated infinite  pulse");
        
    }
    );

    // nice text animation
    $('.tlt').textillate({  in:{ effect: 'bounceIn' }  , loop:true,out:{effect:'flash'}});

    
});