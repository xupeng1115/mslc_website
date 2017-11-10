define(["mashanglc","mashanglcMarquee"], function(mashanglc,mashanglcMarquee) {
    return function(){
        var marqueeProHot = new mashanglcMarquee("#itemHot",{
            auto:true,
            step:3
        });
        var marqueeProNew = new mashanglcMarquee("#itemNew",{
            auto:true,
            step:3
        });

        marqueeProNew.pause();

        //热门推荐和新品预告切换
        $("#product .tab li:not(:eq(2))").on("click",function(){
            var index = $(this).index();
            if($(this).hasClass('active')){
                return false;
            }
            $(this).addClass('active').siblings().removeClass('active');
            $("#product .content .item").eq(index).show().siblings().hide();
            if(index==0){
                marqueeProNew.pause();
                marqueeProHot.play();
            }else{
                marqueeProNew.play();
                marqueeProHot.pause();
            }
        })

        //切换城市
        mashanglc.selectCity(function(cityId){
            location.replace(location.href);
        });

        //创建banner
        $("#banner").load(mashanglc.wwwHost+"/pages/common-section/banner.html?v=_WEBSITE_VERSION_",function(){
            var $carousel = $("#banner").find(".carousel");
            var $banner = $carousel.find("ul");
            var $loading = $carousel.find(".loading");
            var $bannerItem;

            var itemArr = [];

            itemArr.push('<li class="item item0" data-imgurl="/img/banner/banner20160229001.jpg"></li>');

            itemArr.push('<li class="item item3" data-imgurl="/img/banner/banner4.jpg"><a href="http://tieba.baidu.com/f?kw=%E9%A9%AC%E4%B8%8A%E7%90%86%E8%B4%A2&fr=wwwt" target="_blank"></a></li>');

            var bannerHtml ="";

            for(var i=0;i<itemArr.length;i++){
                bannerHtml +=itemArr[i];
            }

            $banner.append(bannerHtml);

            $bannerItem = $banner.find("li");
            
            var carousel = function(){
                
                var $btnPrev,$btnNext,btnWidth;
                var setBtn = function(){
                    var width = $(window).width();
                    var left = 0,right = 0;
                    if(width>1090){
                        left = (width - 1090)/2;
                        right = (width - 1090)/2;
                    }
                    $btnPrev.css("left",left);
                    $btnNext.css("right",right);
                }

                mashanglc.carousel($carousel);
                $btnPrev = $carousel.find(".carousel-left");
                $btnNext = $carousel.find(".carousel-right");
                btnWidth = $btnPrev.width();

                $(window).resize(function(event) {
                    setBtn();
                });
                
                setBtn();
            }

            var firstImgSrc = $bannerItem.eq(0).data("imgurl");
            mashanglc.loadImage(firstImgSrc,function(){
                $loading.hide();
                $bannerItem.each(function(index, el) {
                    var src = $(this).data("imgurl");
                    var imgHtml = "<img src='"+src+"' />";
                    $(this).append(imgHtml);
                });
                carousel();
            })
        });

        mashanglc.channelCount($("body"),"get");
    }();
})
 