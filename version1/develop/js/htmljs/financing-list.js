define(["mashanglc","Handlebars","mashanglcMarquee","mashanglcModule","handlebars/section-tab.hbs","handlebars/product.hbs"], function(mashanglc,Handlebars,mashanglcMarquee,mashanglcModule) {
    return function(){
        //创建专区列表
        function createSectionList(context,deliverType){
            var defaultType,type;
            var template = Handlebars.templates['section-tab'];
            
            $("#sectionList").html("")

            defaultType = $("#sectionList").find("li").eq(0).data("section");
            type = defaultType;
            if(deliverType){
                for(var i in context.data){
                    if(context.data[i].id==deliverType && context.data[i].exist){
                        type = deliverType;
                    }
                }
            }

            var html = template(context);
            $("#sectionList").html(html);
            
            createMarquee(type);
            getSectionProduct(type);
        }

        //创建专区marquee
        function createMarquee(type){
            var marqueeAreaList = new mashanglcMarquee("#sectionMarquee",{
                screen:6,
                step:1,
                loop:false,
                dir:"bottom",
                animateTime:500
            });

            var $active = $("#sectionMarquee").find("li[data-section="+type+"]");
            var index = $active.index();

            $("#sectionMarquee").on("click","li",function(){
                $(this).addClass('active').siblings().removeClass('active');
                var type = $(this).data("section");
                getSectionProduct(type);
            })

            marqueeAreaList.to(index);
            $active.addClass('active');
        }

        //获取指定专区产品列表
        function getSectionProduct(type){
            var request = {
                cityId:mashanglc.cityId,
                type:type
            }

            $.get(mashanglc.api.sectionProductList,request,function(response){
                var context = {
                    products:response.data.products
                } 

                $("#productList").html("");

                if(response.data.products && response.data.products.length>0){
                    mashanglcModule.productList.createProductList(context,$("#productList"));
                    $("#productList").scrollTop(0);
                }else{
                    createNullProductList();
                }
            })
        }

        //创建空产品列表
        function createNullProductList(){
            var nullProductList = '<div class="null-product-list"><p class="p1"><img src="/img/product-list-null1.png" /></p><p class="p2"><img src="/img/product-list-null2.png" /></p><p class="p3">本专区产品数据更新中...敬请期待！</p></div>'
            $("#productList").append(nullProductList);
        }
        
        //获取当前城市下的专区列表数据
        function getSections(deliverType){
            $.get(mashanglc.api.sectionList,{cityId:mashanglc.cityId},function(response){
                var context = {
                    data:response.data,
                    ctrl:true
                }
                if(response.data.length<6){
                    context.ctrl = false;
                }

                if(response.data.length>0){
                    createSectionList(context,deliverType);
                }

                var nullProductList = '<div class="null-product-list"><p class="p1"><img src="/img/product-list-null1.png" /></p><p class="p2"><img src="/img/product-list-null2.png" /></p><p class="p3">该城市产品数据更新中...敬请期待！</p></div>';
                if(!$("#sectionList").find("li").length){
                    $(".m-financing-list .content").append(nullProductList);
                }
            })
        }

        //切换城市
        mashanglc.selectCity(function(currentCity){
            $("#sectionList").html("");
            $("#productList").html("");
            $(".m-financing-list .content .null-product-list").remove();
            getSections();
        })

        var urlType = mashanglc.getUrlParameter("section");
        getSections(urlType);

        var urlTip = mashanglc.getUrlParameter("tip");
        var productId = $.cookie("productId");
        if(urlTip && urlTip==productId){
            $("#productTip").show();
            setTimeout(function(){
                $("#productTip").animate({top:"-32px"}, 500);
            },2000)
        } 
    }()
})

