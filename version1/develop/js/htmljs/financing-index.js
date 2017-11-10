define(["mashanglc"], function(mashanglc) {
    return function(){
        //获取当前城市下的专区列表
        function getSections(){
            var $sections = $("#sections");
            var $item = $sections.find("li");
            $.get(mashanglc.api.sectionList,{cityId:mashanglc.cityId},function(response){
                var data = response.data;
                $item.each(function(index, el) {
                    var sectionId = $(this).data("section");
                    for(var i=0;i<data.length;i++){
                        if(sectionId==data[i].id && data[i].exist){
                            $(this).removeClass('not');
                        }
                    }
                    $(this).removeClass('end');
                });
            })
        }

        //统一添加tip
        function addTip(){
            var $item = $("#sections").find("li");
            var html = '<p class="tip"><span class="tip-space"></span><span class="tip-cont"><i><img src="/img/ico-section-not.png"></i>您所在城市尚未开通该专区</span></p>';
            $item.append(html);
        }
        
        //切换城市
        mashanglc.selectCity(function(currentCity){
            var $item = $("#sections").find("li");
            $item.addClass('not end');
            getSections();
        })

        addTip();
        getSections();
    }();
})
