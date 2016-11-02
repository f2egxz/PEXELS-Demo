$(function(){
    navSearch();
    navbarForm();
    $(window).resize(function(){
        navSearch();
        navbarForm();
    })
    $("#navbar-search").on("click",function(){
        $(".navbar .navbar-form").slideToggle(300);
    })
    function navSearch (){
        $(window).width()<850 ? $(".navbar .navbar-search").show():$(".navbar .navbar-search").hide();
    }
    function navbarForm (){
        $(window).width()>850 ? $(".navbar .navbar-form").show():$(".navbar .navbar-form").hide();
    }
})
