define('mashanglcReady',["mashanglc","Handlebars"], function(mashanglc,Handlebars) {
	var mashanglcReady = function(){
		//关闭谷歌浏览器自带填充表单功能input[type="text"]
		if (navigator.userAgent.toLowerCase().indexOf("chrome") >= 0){
			var $autoInput = $('input[type="text"]');
			$autoInput.attr("autocomplete","off");
		}

		//二维码弹窗
		$("body").on("click","*[data-qrcode]",function(){
			var qrcode = $(this).data("qrcode");
			var config = {
				otherClick : true,
				hadBtn:false,
				diyClass:"m-pop-qrcode"
			}
			
			switch (qrcode) {
				case "downloadCustomer" :
					config.title = "马上理财客户端";
					config.msg = "<p class='qr-img'><img class='appQrCode' src='/img/channel-code/4.png' /></p><p class='qr-tip'>马上理财-银行的线上柜台</p>";
					mashanglc.mPopUp(config);
					mashanglc.channelCount($(".m-pop-up"));
					break;
				case "downloadManager" :
					config.title = "马上理财经理端";
					config.msg = "<p class='qr-img'><img src='/img/qr-code/qr-code-2.png' /></p><p class='qr-tip'>理财客户都在这里</p>";
					mashanglc.mPopUp(config);
					break;
				case "weixin" :
					config.title = "马上理财官方微信二维码";
					config.msg = "<p><img src='/img/qr-code/weixin.png' /></p><p class='qr-tip'>关注官方微信，获取最新动态</p>";
					mashanglc.mPopUp(config);
					break;
			};
			
			return false;
		})

		$("#header").load("/pages/common-section/header.html?v=_WEBSITE_VERSION_",function(){
			var pageMain = $(".main-content");
			var header = $(".header");
			var loginBox = header.find(".login-box");

			//设置当前页面导航状态
			if(pageMain.hasClass('index')){
				$("#nav").find(".nav-index").addClass('current');
			}else if(pageMain.hasClass('p-financing-section')){
				$("#nav").find(".nav-financing-index").addClass('current');
			}else if(pageMain.hasClass('p-bank-section')){
				$("#nav").find(".nav-bank-section").addClass('current');
			}else if(pageMain.hasClass('p-about-me')){
				$("#nav").find(".nav-about-me").addClass('current');
			}

			//登录注册页不显示导航等其它信息
			if($("body").hasClass('account-related')){
				header.find('.content').remove();
			}else{
				//判断登录状态
				if(mashanglc.sessionKey){
					$.post(mashanglc.api.isLogin,{sessionKey:mashanglc.sessionKey},function(response){
						var content = header.find(".content");
						
						var userHtml,userElement,btnShowLogout,btnLogout;
						var picUrl = response.data.picUrl || "/img/default.png";

						if(response.data.status==0){
							loginBox.hide();
							userHtml = '<div class="user"><span class="line"></span><a href="/pages/personal-center/homepage.html" class="inline"><span class="head-portrait"><img src="'+picUrl+'" /></span><span class="nickname">个人中心</span></a><span class="ico"></span><div class="logout"><span class="btn">安全退出</span></div></div>';

							content.prepend(userHtml);
							userElement = header.find(".user");
							btnShowLogout = userElement.find(".ico");
							btnLogout = userElement.find(".btn");

							btnShowLogout.on("click",function(){
								userElement.toggleClass('showLogout');
							})

							btnLogout.on("click",function(){
								$.ajax({
									type:"POST",
									url:mashanglc.api.logout,
									data:{
										sessionKey:mashanglc.sessionKey
									},
									success:function(response){
										mashanglc.errorCode({
											data:response,
											noTip:true
										},function(){
											$.cookie("sessionKey",null,{path: '/'});
											userElement.remove();
											loginBox.show();
										})
									}
								});
							});
						}else{
							loginBox.show();
						}
					})
				}else{
					loginBox.show();
				}
			}

			//设置当前城市
			var cityId = mashanglc.cityId;
			var $current = $("#city .current");
			if($current.length){
				var $currentTxt = $current.find(".txt");
				var currentCity = function(className,cityId,cityName){
					$current.addClass(className);
					$current.data("city",cityId);
					$currentTxt.text(cityName);
				}

				switch (parseInt(cityId)) {
					case 2:
						currentCity("c-shanghai-c",2,"上海");
						break;
					case 3:
						currentCity("c-wenzhou-c",3,"温州");
						break;
					case 4:
						currentCity("c-nanjing-c",4,"南京");
						break;
					case 5:
						currentCity("c-suzhou-c",5,"苏州");
						break;
					case 6:
						currentCity("c-hangzhou-c",6,"杭州");
						break;
					case 7:
						currentCity("c-shenzhen-c",7,"深圳");
						break;
					case 8:
						currentCity("c-dalian-c",8,"大连");
						break;
				}
			}
		});

		$("#footer").load("/pages/common-section/footer.html?v=_WEBSITE_VERSION_");

		//通用HandlebarsHelper
		var commonHandlebarsHelper = function(){
	        //收益率保留两位小数
	        Handlebars.registerHelper('twoDecimals', function(number) {
	            return mashanglc.NDecimals(number,2);
	        });
	    }

	    commonHandlebarsHelper();

	}

    return mashanglcReady();
});



