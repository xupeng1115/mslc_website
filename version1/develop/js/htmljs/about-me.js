define(["mashanglc"], function (mashanglc) {
    return function () {

        var $item = $('.about-me-tab li');
        var $itemCont = $('.about-me-cont .item-cont');
        var $coreTeamIcon = $('.exchange-icon li');
        var $joinMeIcon = $('.position-icon li');
        var $map = $('.contact-me .pop-map');

        $item.click(function () {
            var index = $(this).index();
            if($(this).hasClass('current')){
                return;
            }
            $(this).addClass("current").siblings().removeClass("current");
            $itemCont.eq(index).addClass('current-tab').siblings().removeClass('current-tab');
            $map.hide();
        });

        $coreTeamIcon.click(function(){
            var index = $(this).index();
            $(this).addClass("active").siblings().removeClass("active");
            $('.non-current').eq(index).addClass('show').siblings().removeClass('show');
        })

        $joinMeIcon.click(function(){
            var index = $(this).index();
            $(this).addClass("active").siblings().removeClass("active");
            $('.position-content').eq(index).addClass('show').siblings().removeClass('show');
        })

        function selected(indexId){
            var id = indexId || 0;
            $item.eq(id).addClass('current');
            $itemCont.eq(id).addClass('current-tab');
        }

        function mapEvent(){
            var $viewMap = $('.contact-me .contact-me-map');
            var $close = $map.find(".close");

            $viewMap.click(function(){
                $map.show();
            })

            $close.click(function() {
                $map.hide();
            });

        }

        mapEvent();
        
        var indexId = mashanglc.getUrlParameter("index");
        selected(indexId);

        //切换城市
        mashanglc.selectCity();
    }();
});
