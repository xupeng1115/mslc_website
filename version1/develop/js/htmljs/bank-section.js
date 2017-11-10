define(["mashanglc","Handlebars","mashanglcMarquee","handlebars/bank-list.hbs"], function(mashanglc,Handlebars,mashanglcMarquee) {
    return function(){

    	//创建mashanglcMarquee
    	function createMarquee(){
    		var bankSection = new mashanglcMarquee("#bankListMarquee",{
		        auto:true,
		        step:3
		    });
    	} 

	    //获取银行列表
	    function getBankList(){
            $.get(mashanglc.api.sectionBankList,{cityId:mashanglc.cityId},function(response){
                var context = response;
                createList(context);
            })
	    }

	    //创建银行列表
	    function createList(context){
            var template = Handlebars.templates['bank-list'];
            $("#bankList").html(template(context));

            if(!$("#bankList").find("li").length){
            	var nullProductList = '<div class="null-product-list"><p class="p1"><img src="/img/product-list-null1.png" /></p><p class="p2"><img src="/img/product-list-null2.png" /></p><p class="p3">该城市产品数据更新中...敬请期待！</p></div>';
                $("#bankList").append(nullProductList);
            }
            createMarquee();
	    }

	    //切换城市
	    mashanglc.selectCity(function(cityId){
	        $("#bankList").html("");
	        getBankList();
	    })

	    getBankList();
    }();
})
