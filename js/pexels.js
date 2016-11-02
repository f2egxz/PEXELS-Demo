$(function(){
    var winWidth = $(window).width();
    init();
    navbarChange();
    function init (){
        $(window).resize(function(){
             winWidth = $(window).width();
            navbarFormToggle();
            navbarSearchToggle();
        });
        asyncPopularSearches();
        asyncPopularPhotos();
        asyncphotographers();
    };
    function navbarChange (){
        $(window).scroll(function(){
            $(window).scrollTop()>200
                ? $(".navbar").css({"background-color": "#222222"})
                :$(".navbar").css({"background-color": "transparent"});
            $(window).scrollTop()>200
                ? $(".navbar-brand").css({ "display": "inherit"})
                :$(".navbar-brand").css({"display":"none"});
            navbarFormToggle();
            navbarSearchToggle();
        })
        $("#navbar-search").on("click",function(){
            $(".navbar .navbar-form").slideToggle(300);
        })
    };
    function navbarFormToggle(){
        if($(window).width()>850 && $(window).scrollTop()>200){
            $(".navbar .navbar-form").show();
        }else {
            $(".navbar .navbar-form").hide()
        };
    };
    function navbarSearchToggle(){
        if($(window).width()<850 && $(window).scrollTop()>200){
            $(".navbar .navbar-search").show();
        }else {
            $(".navbar .navbar-search").hide()
        }
    }
    function navbarMenue (){
        $("#navbarMenueBtn").on("click",function(){
            
        })
    };
    function asyncPopularSearches (){
        $.ajax({
            type:"get",
            url:"php/PopularSearches.php",
            dataType:'json',
            success:function(data){
                var html = template('PopularSearchesTemplate', data);
                $("#PopularSearches").html(html);
            },
            error:function(){
                $("#PopularSearches").html("请求出错，请重试！(请在服务器中打开)");
            }
        });
    };
    function asyncPopularPhotos(){
        $.ajax({
            type:"get",
            url:"php/PopularPhotos.php",
            dataType:'json',
            success:function(data){
                var html = template('PopularPhotosTemplate', data);
                $("#PopularPhotos").html(html);
            },
            error:function(){
                $("#PopularPhotos").html("请求出错，请重试！(请在服务器中打开)");
            }
        });
    };
    function asyncphotographers (){
        $.ajax({
            type : "get",
            url : "php/photographers.php",
            dataType:'json',
            success:function(data){
                var html = template("photographersTemplate",data);
                $("#photographersBox").html(html);
            },
            error:function(){
                $("#photographersBox").html("请求失败，请重试!(请在服务器中打开)");
            }
        })
    };

    var phfl = {};
    $.extend(true,phfl,photosFlow);
    var address = '../json/photodata.json';
    phfl.init('#photoBox', "php/pexelsPhoto.php", address);
})
