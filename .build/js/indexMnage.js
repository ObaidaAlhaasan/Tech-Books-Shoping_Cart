

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
        $(this).removeClass("animated infinite  jello");
        
    }
    );

    // nice text animation
    $('.tlt').textillate({ loop: true , in:{ effect: 'flash' } , out:{effect:'fadeIn'} });

    /// dashboard page 

     /*==================================================================
    [ Focus input ]*/
    $('.input100').each(function(){
        $(this).on('blur', function(){
            if($(this).val().trim() != "") {
                $(this).addClass('has-val');
            }
            else {
                $(this).removeClass('has-val');
            }
        }) ;   
    });
  
  
    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');

    $('.validate-form').on('submit',function(){
        var check = true;

        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                check=false;
            }
        }

        return check;
    });


    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
           hideValidate(this);
        });
    });

    function validate (input) {
        if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        }
        else {
            if($(input).val().trim() == ''){
                return false;
            }
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }
    
    /*==================================================================
    [ Show pass ]*/
    var showPass = 0;
    $('.btn-show-pass').on('click', function(){
        if(showPass == 0) {
            $(this).next('input').attr('type','text');
            $(this).addClass('active');
            showPass = 1;
        }
        else {
            $(this).next('input').attr('type','password');
            $(this).removeClass('active');
            showPass = 0;
        }
        
    });

/*==================================================================
    [ Delete Book ]*/    
    $(".RemoveBook").click(function (e) { 
    var id = $(this).data("id"),
        url = "/manage/books/delete/"+id,
        conf = confirm("Are You sure. !");

        if (conf) {
            $.ajax({
                type: "DELETE",
                url: url,
                success: function (response) {
                    
                }
            });
                window.location = "/manage/books";
        }

    });

/*==================================================================
    [ Delete category ]*/    
    $(".RemoveCat").click(function (e) { 
        var id = $(this).data("id"),
            url = "/manage/category/delete/"+id,
            conf = confirm("Are You sure. !");
    
            if (conf) {
                $.ajax({
                    type: "DELETE",
                    url: url,
                    success: function (response) {
                        
                    }
                });
                    window.location = "/manage/category";
            }
    
        });



});


