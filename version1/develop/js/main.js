

requirejs.config({
	paths : {
        "jquery" : "lib/jquery-1.8.3.min",
        "Handlebars" : "lib/handlebars.runtime-v4.0.5",
        "jqCookie" : "lib/jquery.cookie",
        "jqMD5" : "lib/jquery.md5",
        "mashanglc" : "common/mashanglc",
        "mashanglcReady" : "common/mashanglcReady",
        "mashanglcMarquee" : "common/mashanglcMarquee",
        "mashanglcValidate" : "common/mashanglcValidate",
        "mashanglcModule" : "common/mashanglcModule"
    },
    urlArgs : "v=" + "_WEBSITE_VERSION_"
});

requirejs(["jquery","Handlebars","jqCookie","jqMD5","mashanglc","mashanglcReady","mashanglcMarquee","mashanglcValidate","mashanglcModule"], function($,accountRelated) {
	var id = $(".main-content").attr("id");
	var $body = $("body");

	switch (id){
		case "pIndex" : 
			require(["htmljs/index"]);
			break;
		case "pFinancingIndex" : 
			require(["htmljs/financing-index"]);
			break;
		case "pFinancingList" : 
			require(["htmljs/financing-list"]);
			break;
		case "pAboutMe" : 
			require(["htmljs/about-me"]);
			break;
		case "pProductDetail" : 
			require(["htmljs/product-detail"]);
			break;
		case "pBankSection" : 
			require(["htmljs/bank-section"]);
			break;
		case "pBankProduct" : 
			require(["htmljs/bank-product"]);
			break;
		case "pAccountRelated" : 
			require(["htmljs/account-related"]);
			break;
		case "pHomepage" :
			require(["htmljs/home-page"]);
			break;
	}

	if(!$body.hasClass('notOther')){
		//第三方客服
		var customService = "<script type='text/javascript' src='http://webchat.7moor.com/javascripts/7moorInit.js?accessId=8af7cff0-7c81-11e5-8399-9b5c3ce295fe&autoShow=true' async='async'></script>";
		$("body").append(customService);

		//百度统计
		var _hmt = _hmt || [];
		(function() {
		  var hm = document.createElement("script");
		  hm.src = "//hm.baidu.com/hm.js?7c5c8b8ebd37c5976fffbd8bdcf45858";
		  var s = document.getElementsByTagName("script")[0]; 
		  s.parentNode.insertBefore(hm, s);
		})();
	}
	
});