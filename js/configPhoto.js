/**
 * 郭栩志写的用于页面请求图片并将图片渲染到页面,要求页面中有下面的标签和模板
 * init:初始化对象执行，scrollPF：页面滚动时执行，resizePF：页面宽度改变时执行
 * @type {{winWidth: (any), photoData: Array, num: number, oldNum: number, config: {item: string, url: string, reqjson: string}, object: null, init: photosFlow.init, scrollPF: photosFlow.scrollPF, resizePF: photosFlow.resizePF, _setPhoto: photosFlow._setPhoto, _asyncRequestPhoto: photosFlow._asyncRequestPhoto}}
 */
//<div class="photos clearfix" id="photoBox"></div>
// <div id="alert" >没有更多数据了！</div>
//
// <script type="javascript/template" id="photoTemplate">
//     {{each}}
// <article class="photo-item">
//     <a href="{{$value.a.href}}"  title="{{$value.a.title}}">
//     <img  style= "{{$value.img.style}}" alt="{{$value.img.alt}}"  src="{{$value.img.src}}">
//     </a>
//     <button class="js-like js-like-132996 btn-like btn-like--small photo-item__info" data-photo-id="132996">
//     <svg viewBox="0 0 100 100" class="icon-heart"><use xmlns:xlink="icons-f2fe61c7dbcfb844b56cd303311c6a901d16f94d093bc733c9ec4e5bc612233a.svg" xlink:href="#iconHeart"></use></svg>
//     </button>
//     </article>
//     {{/each}}
// </script>


var photosFlow = {
    winWidth : null,
    photoData : [],
    num : 0,
    oldNum : 0,
    config:{item:'xx',url:'xx',reqjson:'xx'},
    object:null,
    /**
     *
     * @param object:创建出来的对象名
     * @param item：string 容器的Id
     * @param url: string 请求地址
     * @param reqjson：string 请求的JSON地址
     */
    init:function (object,item,url,reqjson){
        photosFlow.object = object;
        photosFlow.config.item=item;
        photosFlow.config.url=url;
        photosFlow.config.reqjson=reqjson;
        photosFlow.object.winWidth = $(window).width();
        this._asyncRequestPhoto(photosFlow.config.item,photosFlow.config.url,photosFlow.config.reqjson);
    },
    scrollPF: function(){
        if($("#photoBox .photo-item:last").offset().top <= $(window).scrollTop() + $(window).height() &&!$("#photoBox").hasClass('loading')){
            photosFlow.object._asyncRequestPhoto(photosFlow.config.item,photosFlow.config.url,photosFlow.config.reqjson);
        }
    },
    resizePF:function(){
        photosFlow.object.winWidth = $(window).width();
        photosFlow.object.num = 0;
        photosFlow.object.oldNum = 0;
        photosFlow.object._setPhoto();
    },
    _setPhoto : function () {
        //父盒子的宽度
        var contentWidth = this.winWidth - 30;
        // 图片宽度，高度
        var imgWidth = 0;
        var imgHeight = 0;
        //最大索引
        var maxIndex = this.photoData.length-1;
        //图片的数据
        var photoData = this.photoData;
        //图片的中间的间隙
        var space = 5;
        // 计算中使用到的两个参数
        var num = this.num;
        var oldNum = this.oldNum;
        //逻辑：算出容器的宽度，根据原始图片宽度计算出每行图片的张数，然后按比例缩放进入一行，且每次只渲染规定部分图片
        while( num <= maxIndex ){
            //单行已渲染图片的总宽度
            var imgsWidth = 0;
            while(contentWidth+space>imgsWidth && num <= maxIndex){
                imgsWidth += +photoData[num++].img.width+space;
            }
            for(var i = oldNum; i < num; i++ ){
                //间距数
                var spaceNum = num - oldNum;
                // 图片的缩放比例：总的容器的宽度减去总间距除以总的图片宽度减总间距
                var ratio = (contentWidth-(spaceNum-1)*space)/(imgsWidth-space*spaceNum);
                // 计算并设置每张图片的宽高，
                imgWidth = Math.min( ratio * photoData[i].img.width  , +photoData[i].img.width );
                imgHeight= Math.min( ratio * photoData[i].img.height , +photoData[i].img.height );
                $("#photoBox .photo-item:eq("+i+")").width( imgWidth );
                $("#photoBox .photo-item:eq("+i+")").height( imgHeight );
            }
            //设置图片的间距
            for(var j = oldNum;j <num-1;j++){
                $("#photoBox .photo-item:eq("+j+")").css("margin-right","5px");
            }
            //取消最右侧图片的右间距
            $("#photoBox .photo-item:eq("+(num-1)+")").css("margin-right","0px");
            oldNum = maxIndex >= num ? num : oldNum ;
        };
    },
    _asyncRequestPhoto : function (item,url,json){
        var box = $(item);
        var self=this;
        $.ajax({
            type:"get",
            url:url,
            data:{page:box.attr('page')||1,pageSize:8,reqJson:json},
            dataType:'json',
            beforeSend:function(){
                if(box.hasClass('loading'))return false;
                box.addClass('loading')
                $("#alert").css("bottom","0").text("正在加载中...");
            },
            success:function(data){
                self.photoData = self.photoData.concat(data.items);
                // console.log(self.photoData);
                box.attr('page',data.page);
                var htmlP = template('photoTemplate',data.items);
                box.append(htmlP);
                self.num = self.oldNum;
                self._setPhoto();
                if(data.items.length === 0){
                    box.addClass("loading");
                    $("#alert").text("没有更多数据了！").css("bottom","0");
                } else{
                    $("#alert").css("bottom","-100%");
                    box.removeClass("loading");
                }
            },
            error:function(error){
                $("#alert").text("请求失败，请稍后重试！(在服务器中打开)").css("bottom","0");
            }
        })
    }
}

