$(function () {
    var oldhash = null;
    var phfl = {};
    $('.title_more').on('click', 'a', function () {
        $('.title_more>a').removeClass('photo-colors__color-active');
        $(this).addClass('photo-colors__color-active');
        var hash = $(this).attr('href').split('#')[1].split('/')[0];
        if (hash === oldhash)return;
        // console.log(hash);
        oldhash = hash;
        var address = hash + 'Data.json';
        $('#photoBox').removeClass("loading");
        $('#photoBox').empty();
        $('#photoBox').attr('page', 1);

        // $.extend(true,phfl,photosFlow);
        Object.assign(phfl,photosFlow);
        phfl.init(phfl,'#photoBox', "php/pexelsPhoto.php", address);
    })
    $('#first').click();
    $(window).resize(function(){
        phfl.resizePF();
    });
    $(window).scroll(function(){
        phfl.scrollPF();
    });

})