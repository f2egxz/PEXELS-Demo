$(function(){
    var winWidth = $(window).width();
    init();
    navbar();
    setPhoto();

    function init (){
        $(window).resize(function(){
            winWidth = $(window).width();
            setPhoto();
            if(winWidth>850 && $(window).scrollTop()>200){
                $(".navbar .navbar-form").show();
            }else {
                $(".navbar .navbar-form").hide()
            }
            if(winWidth<850 && $(window).scrollTop()>200){
                $(".navbar .navbar-search").show();
            }else {
                $(".navbar .navbar-search").hide()
            }
        })
    }
    function navbar (){
        $(window).scroll(function(){
            $(window).scrollTop()>200? $(".navbar").css({"background-color": "#222222"}):$(".navbar").css({"background-color": "transparent"})
            $(window).scrollTop()>200? $(".navbar-brand").css({ "display": "inherit"}):$(".navbar-brand").css({"display":"none"});
            if($(window).width()>850 && $(window).scrollTop()>200){
                $(".navbar .navbar-form").show();
            }else {
                $(".navbar .navbar-form").hide()
            }
            if($(window).width()<850 && $(window).scrollTop()>200){
                $(".navbar .navbar-search").show();
            }else {
                $(".navbar .navbar-search").hide()
            }
        })
        $("#navbar-search").on("click",function(){
            $(".navbar .navbar-form").slideToggle(300);
        })
    }
    function navbarMenue (){
        $("#navbarMenueBtn").on("click",function(){
            
        })
    }
    function setPhoto () {
        var contentWidth = winWidth - 30;
        var imgWidth = 0;
        var imgHeight = 0;
        var num = 0;
        var oldNum = num;
        var maxIndex = photoData.length-1;
        var space = 5;
        while( num <= maxIndex ){
                var imgsWidth = 0;
                while(contentWidth+space>imgsWidth && num <= maxIndex){
                    imgsWidth += +photoData[num++].img.width+space;
                }
                for(var i = oldNum; i < num; i++ ){
                    var spaceNum = num - oldNum;
                    var ratio = (contentWidth-(spaceNum-1)*space)/(imgsWidth-space*spaceNum);
                    imgWidth = Math.min( ratio * photoData[i].img.width  , +photoData[i].img.width );
                    imgHeight= Math.min( ratio * photoData[i].img.height , +photoData[i].img.height );
                    $("#photoBox .photo-item:eq("+i+")").width( imgWidth );
                    $("#photoBox .photo-item:eq("+i+")").height( imgHeight );
                }
                for(var j = oldNum;j <num-1;j++){
                    $("#photoBox .photo-item:eq("+j+")").css("margin-right","5px");
                }
                $("#photoBox .photo-item:eq("+(num-1)+")").css("margin-right","0px");          
                oldNum = maxIndex >= num ? num : oldNum ;
        };
    }
})
