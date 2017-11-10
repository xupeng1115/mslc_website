define(["mashanglc","Handlebars","mashanglcMarquee","mashanglcModule","handlebars/bank-section-tab.hbs","handlebars/product.hbs"], function(mashanglc,Handlebars,mashanglcMarquee,mashanglcModule) {
    return function(){

    	//创建银行列表
        function createBankList(context,deliverType){
            var defaultType,type; 
            var template = Handlebars.templates['bank-section-tab'];
            

            defaultType = $("#bankList").find("li").eq(0).data("section");
            type = defaultType;
            if(deliverType){
                for(var i in context.data){
                    if(context.data[i].sectionId==deliverType && context.data[i].exist){
                        type = deliverType;
                    }
                }
            }

            var html = template(context);
            $("#bankList").html(html);
            
            createMarquee(type);
            getBankProduct(type);
        }

        //创建银行列表marquee
        function createMarquee(type){
            var marqueeAreaList = new mashanglcMarquee("#bankMarquee",{
                screen:6,
                step:1,
                loop:false,
                dir:"bottom",
                animateTime:500
            });

            var $active = $("#bankMarquee").find("li[data-section="+type+"]");
            var $activeImg = $active.find("img");
            var activeSrc = $activeImg.data("hover");
            var index = $active.index();

            $("#bankMarquee").on("click","li",function(){
                var type = $(this).data("section");
                var oldActive = $("#bankMarquee").find("li.active");
                var oldActiveDefaultSrc = oldActive.find("img").data("default");
                var newActiveHoverSrc = $(this).find("img").data("hover");

                oldActive.removeClass('active');
                oldActive.find("img").attr("src",oldActiveDefaultSrc);

                $(this).addClass('active');
                $(this).find("img").attr("src",newActiveHoverSrc);
                
                getBankProduct(type);
            })

            marqueeAreaList.to(index);
            $active.addClass('active');
            $activeImg.attr("src",activeSrc);
        }

        //获取指定银行产品列表
        function getBankProduct(type){
            var request = {
                cityId:mashanglc.cityId,
                sectionId:type
            }
            $.get(mashanglc.api.sectionBankProduct,request,function(response){
                var context = {
                    products:response.data.products
                }

                for(var i=0;i<context.products.length;i++){
                    context.products[i].sectionId = request.sectionId;
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
        
        //获取当前城市下的银行精选列表数据
        function getSections(deliverType){
            $.get(mashanglc.api.sectionBankList,{cityId:mashanglc.cityId},function(response){
                var context = {
                    data:response.data,
                    ctrl:true
                }
                if(response.data.length<6){
                    context.ctrl = false;
                }
                if(response.data.length>0){
                    createBankList(context,deliverType);

                }

                var nullProductList = '<div class="null-product-list"><p class="p1"><img src="/img/product-list-null1.png" /></p><p class="p2"><img src="/img/product-list-null2.png" /></p><p class="p3">该城市产品数据更新中...敬请期待！</p></div>';
                if(!$("#bankList").find("li").length){
                    $(".m-financing-list .content").append(nullProductList);
                }
            })
        }

        //切换城市
        mashanglc.selectCity(function(currentCity){
            $("#bankList").html("");
            $("#productList").html("");
            $(".m-financing-list .content .null-product-list").remove();
            getSections();
        })

        var sectionId = mashanglc.getUrlParameter("sectionId");
        getSections(sectionId);
    }();
})
