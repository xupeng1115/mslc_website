define('mashanglc',["jquery","jqCookie","jqMD5"], function($) {
	//本地调试时调用sit环境API
	var wwwHost = "";

	if(location.hostname=="127.0.0.1" || location.hostname=="localhost"){
		wwwHost = "http://www.sit.licai66.com";
	}

	var mashanglc = {
        //获取城市cookie
		"cityId":2,//$.cookie("cityId") || 2

		"wwwHost" : wwwHost,

		//获取url指定参数值
		"getUrlParameter" : function(name){
		    var url = location.search.substr(1);
		    var value,arr1=[],arr2=[];

		    if(url){
		        arr1 = url.split("&");
		        for(var i=0;i<arr1.length;i++){
		            arr2=arr1[i].split("=");
		            if(arr2[0]==name){
		                value = arr2[1];
		            }
		        }
		    }
		    return value;
		},

		//判断图片加载是否完成
		"loadImage" : function(url, callback){
			var img = new Image(); 
			img.src = url; 
			if(img.complete) { 
				callback.call(img); 
				return; 
			} 
			img.onload = function () { 
				callback.call(img);
			}; 
		},

		//渠道统计并更改客户端二维码图片
		channelCount : function(element,get){
			var currentId = this.getUrlParameter("id") || 4;
            var $appQrCode = element.find(".appQrCode");
            var imgUrl = "/img/channel-code/"+currentId+".png";
            
            $.ajax({
            	url:imgUrl,
            	method:"GET",
            	success:function(){
            		$appQrCode.attr("src",imgUrl);
            	}
            })

            //统计来源渠道(仅在首页加载后执行一次)
            if(get=="get"){
            	$.get(this.otherApi.indexOrigin+currentId);
            }
		},

		//倒计时(开售、停售)
		countdown : function(element){
			var timer = null;
			var surplus = element.data("surplus");//剩余秒数
			var $day = element.find(".day");
			var $hour = element.find(".hour");
			var $minute = element.find(".minute");
			var $second = element.find(".second");		
			countMsec(surplus);

			timer = setInterval(function(){
				if(surplus<1){
					clearInterval(timer);
					return;
				}
				surplus = surplus-1;
				countMsec(surplus);
			},1000)

			function countMsec(surplus){
				var d = Math.floor(surplus/60/60/24);
				var h = Math.floor(surplus/60/60%24);
				var m = Math.floor(surplus/60%60);
				var s = Math.floor(surplus%60);
				$day.text(d);
				$hour.text(h);
				$minute.text(m);
				$second.text(s);
			}
		},

		//悬浮提示
		"suspendedTips" : function($element,tip){
			var tipTxt = '<div class="suspended-tip">'+tip+'<i></i></div>';
			var left = $element.offset().left;
			var top = $element.offset().top;
			var height1 = $element.outerHeight();
			var width1 = $element.outerWidth();
			var width2,height2;

			$("body").append(tipTxt);

			width2 = $(".suspended-tip").outerWidth();
			height2 = $(".suspended-tip").outerHeight();

			left = left+(width1-width2)/2;
			top = top-height2-8;

			$(".suspended-tip").css({left:left,top:top});
			$(".suspended-tip").css("opacity",1);
		},

		//删除文本所有非数字的字符(并自动计算收益)
		repNumber : function(domElement,options) {
			var timer,profitResult;
			var self = this;
			var $parent = $(domElement).parents(".formCountProfit");
			var $profitValueDom = $parent.find(".profit-value");
			var $purchase = $parent.find(".moneyInput")
			var $duration = $parent.find(".durationInput")
			var estimatedYearRate = $parent.data("profit");
			var minimumPurchase = $parent.data("purchase");

			var public = {
				digit :11
			}

			$.extend(public, options);

			var deleteIllegal = function(dom){
				var reg = /^[\d]+$/g;
				var txt,classifyRate;
				var purchase = $purchase.val().replace(/,/gi, "");
				var duration = $duration.val();

				if(public.classify){
					for(var i=0;i<public.classify.length;i++){
		                if(public.classify[i].start<=duration && duration<=public.classify[i].end){
		                  estimatedYearRate = public.classify[i].rate/100;
		                }
		            }
				}

				//若第一位是0，则删除
				if (dom.value.charAt(0)=="0"){
					dom.value = dom.value.substr(1);
				}
				
				if (!reg.test(dom.value)) {
					txt = dom.value;
					txt.replace(/[^0-9]+/, function (char, index, val) {
						dom.value = val.replace(/\D/g, "");
						var rtextRange = null;
						//设置光标位置
						if (dom.setSelectionRange) {
							dom.setSelectionRange(index, index);
						} else {//支持ie
							rtextRange = dom.createTextRange();
							rtextRange.moveStart('character', index);
							rtextRange.collapse(true);
							rtextRange.select();
						}
					})
				}

				if(dom.value.length>public.digit){
			      	dom.value = dom.value.substring(0,public.digit);
			    }

			    if($(dom).data('count')=="count"){
			    	if(purchase>=minimumPurchase*10000 && purchase>0){

				    	if(duration){
				    		profitResult = self.countProfit({
					    		purchase:purchase,
					    		duration:duration,
					    		estimatedYearRate : estimatedYearRate
					    	});
				    		$profitValueDom.text(profitResult);
				    	}else{
				    		$profitValueDom.text("0");
				    	}
				    	
				    	$(".suspended-tip").remove();
			    	}else{
			    		if($(dom).hasClass('moneyInput') && $(dom).val().length>0 && !$(".suspended-tip").length){
			    			mashanglc.suspendedTips($(dom),"购买金额应≥"+minimumPurchase+"万元");
			    		}
			    		if($(dom).val().length<1){
			    			$(".suspended-tip").remove();
			    		}      
			    		$profitValueDom.text("0");
			    	}
			    }
			}

			$(domElement).on("focus",function(){
 				var domSelf = this;
 				var purchase,value;
 				if($(this).hasClass('moneyInput') && $(this).val().length>3){
 					$(this).val($(this).val().replace(/,/g, function(){

	 					if (!!window.ActiveXObject || "ActiveXObject" in window) {
	 						var rtextRange = domSelf.createTextRange();
	 						var index = $(domSelf).val().length;
							rtextRange.moveStart('character', index);
							rtextRange.collapse(true);
							rtextRange.select();
	 					}
	 					return "";
	 				}));
				}
		 		clearInterval(timer); 
			    timer = setInterval(function(){
			    	deleteIllegal(domSelf);
			    }, 200);
 			})

 			$(domElement).on("blur",function(){
		 		clearInterval(timer);
		 		var reg = /(-?\d+)(\d{3})/;
		 		var num;
		 		if($(this).hasClass('moneyInput')){
		 			num = $(this).val();
		 			while (reg.test(num)) { 
	        			num = num.replace(reg, "$1,$2"); 
	        		}
	        		$(this).val(num);
		 		}
		 		$(".suspended-tip").remove();
 			})
		},

		//计算收益结果
		"countProfit" : function(options){
			var result;
			var purchase = parseFloat(options.purchase);
			var duration = parseFloat(options.duration);
			var estimatedYearRate = parseFloat(options.estimatedYearRate);

			result = (estimatedYearRate*1000*purchase*duration/100000)/365;
			if(result>Math.pow(10,8)-1){
		    	result = parseInt(result,10).toExponential(5);
		    }else{
		    	result = result.toFixed(2);
		    }
			return result;
		},

		//保留N位小数
		"NDecimals" : function(number,places){
			return parseFloat(number).toFixed(places);
		},

		//计算弹出框top值并显示
		"popUpPosition" : function(element){
			element.show();
			var $content = element.find(".m-pop-cont");
			var contentHeight = $content.outerHeight();
			var windowHeight = $(window).height();
			var scrollTop = $(window).scrollTop();

		    if(contentHeight>=windowHeight){
		    	$content.css("top",scrollTop+10);
		    }else{
		    	$content.css("top",scrollTop+(windowHeight-contentHeight)/2);
		    }
			element.css("opacity","1");
		},

		//模拟弹出框
		"mPopUp" : function(options){
			var self = this;
		    var popUp, popHtml, popUpContent;
		    var remove;
		    var body = $("body");
		    var btnHtml = "";
		    var close, btnDefault, btnCancel;
		    var activeElement = document.activeElement;
		    var pugin = {
		        type: "alert", //弹出框类型(默认alert，可设置confirm)
		        skin: "",//弹出框皮肤(默认空为蓝色皮肤，可选皮肤red)
		        diyClass: "",//自定义pop样式名称
		        title: "温馨提示",//弹出框标题
		        msg: "",//弹出框消息(html或者纯文本)
		        hadBtn: true,//是否有button
		        btnDefault: "我知道了",//alert弹出框按钮文字
		        btnOK: "确定",//confirm弹出框确定按钮文字
		        btnCancel: "取消",//confirm弹出框取消按钮文字
		        callbackDefault: null, //单击确定按钮后的回调函数
		        callbackOK: null, //单击确定按钮后的回调函数
		        callbackCancel: null, //单击取消按钮后的回调函数
		        offDefault: false, //是否取消默认绑定的关闭和按钮事件
		        handle: null, //其它自定义函数
		        otherClick:false //单击弹出框外其它位置是否自动关闭弹出框(仅type:alert时)
		    }

		    activeElement.blur();

		    $.extend(pugin, options);

		    if (pugin.hadBtn && pugin.type == "alert") {
		        btnHtml = '<div class="button-bar"><a href="javascript:;" class="btnPop btnPop-default">' + pugin.btnDefault + '</a></div>';
		    } else if (pugin.hadBtn && pugin.type == "confirm") {
		        btnHtml = '<div class="button-bar"><a href="javascript:;" class="btnPop btnPop-ok">' + pugin.btnOK + '</a><a href="javascript:;" class="btnPop btnPop-cancel">' + pugin.btnCancel + '</a></div>'
		    }

		    popHtml = '<div class="m-pop-up m-pop-'
		        + pugin.type + " " + pugin.skin + " " + pugin.diyClass
		        + '"><div class="m-pop-mask"></div><div class="m-pop-cont"><div class="closePop"></div><div class="mTitle">'
		        + pugin.title
		        + '</div><div class="mContent"><div class="msg">'
		        + pugin.msg
		        + '</div>'
		        + btnHtml
		        + '</div></div></div>';

		    body.append(popHtml);
		    
		    popUp = $(".m-pop-up:last");
		    popUpContent = popUp.find(".m-pop-cont");
		    close = popUp.find(".closePop");
		    btnDefault = popUp.find(".btnPop-default");
		    btnOK = popUp.find(".btnPop-ok");
		    btnCancel = popUp.find(".btnPop-cancel");

		    self.popUpPosition(popUp);

		    remove = function () {
		        popUp.remove();
		        body.off("click.alert");
		    }

		    if (!pugin.offDefault) {
		        close && close.on("click", remove);
		        btnDefault && btnDefault.on("click", remove);
		        btnOK && btnOK.on("click", remove);
		        btnCancel && btnCancel.on("click", remove);
		    }

		    if (pugin.callbackDefault) {
		        btnDefault.on("click", function () {
		            pugin.callbackDefault(popUp);
		        });
		        close.on("click", function () {
		            pugin.callbackDefault(popUp);
		        });
		    }

		    if (pugin.callbackOK) {
		        btnOK.on("click", function () {
		            pugin.callbackOK(popUp);
		        });
		    }

		    if (pugin.callbackCancel) {
		        btnCancel.on("click", function () {
		            pugin.callbackCancel(popUp);
		        });
		    }

		    if (pugin.handle) {
		        pugin.handle(popUp);
		    }

		    if(pugin.otherClick && pugin.type=="alert"){
		    	body.on("click.alert",function(){
		    		remove();
		    	})
		    }

		    popUpContent.on("click",function(){
		    	return false;
		    })

		},

		//切换城市
		"selectCity" : function(callback){

			//单击当前城市
			$("#header").on("click",".city .current",function(e){
				var $list = $("#header .city").find("ul");
				var self = $(this);
				$(this).toggleClass('show');
				$list.toggleClass('show');
				if($(this).hasClass('show')){
					$(document).on("click.city",function(){
						self.removeClass('show');
						$list.removeClass('show');
						$(document).off("click.city");
					})
				}
				e.stopPropagation();
			})

			//选择列表中的城市
			$("#header").on("click",".city li",function(e){
				var $list = $("#header .city").find("ul");
				var $current = $("#header .city .current");
				var attrClass = $(this).attr("class");
				var currentClass = $current.attr("class");
				var oldCityId = parseInt($current.data("city"));
				var newCityId = parseInt($(this).data("city"));
				var newCityName = $(this).find("span").text();
				var targetClass = currentClass.replace(/c-.+/, attrClass);

				$list.toggleClass('show');
				if(oldCityId!=newCityId){
					$current.find(".txt").text(newCityName);
					$current.data("city",newCityId);
					$current.attr("class",targetClass);
					mashanglc.cityId = newCityId;
					$.cookie('cityId',newCityId,{path: '/'});
					//如果有回调函数则执行
					if(callback){
						callback(newCityId);
					}
				}
				e.stopPropagation();
			})
		},

		//banner轮播
		"carousel" : function(q){
			var n = q.find(".carousel-inner > .item");
			var qCtrl = q.data("has-ctrl");
			var qBtn  = q.data("has-btn");
			var qTime = q.data("slide-time");
			var qAuto = q.data("auto");
			var qHandle = q.data("handle");
			var length = n.length;
			var dir = true;
			var index = 0;
			var btnL, btnR, t,slide,objSlide,timer;

			if(q.hasClass("carousel-move")){
				slide = slide2;
				n.eq(0).addClass('active current');
			}else{
				slide = slide1;
				n.eq(0).addClass('current');
			}

			objSlide = {
				time : 5000,
				inter : function(){
					if(index == length-1){
						slide(index,0,true);
						index = 0;
					} else {
						slide(index,index+1,true);
						index++;
					}
				},
				cycle : function(){
					var self = this;
					clearInterval(timer);
					timer = setInterval(function(){
						self.inter()
					}, self.time)
				},
				pause : function(){
					var self = this;
					clearInterval(timer);
				 	timer = null;
				}
			}

			if(length>1){
				if(qBtn!=false){
				 	var btnLtxt = "<span class='carousel-control carousel-left'><span class='ico'></span></span>"
					var btnRtxt = "<span class='carousel-control carousel-right'><span class='ico'></span></span>"
					q.append(btnLtxt+btnRtxt);
			        btnL = q.find(".carousel-left");
			        btnR = q.find(".carousel-right");
					btnL.on("click",{direction:"left"},myHandler)
					btnR.on("click",{direction:"right"},myHandler)
				}
				if(qCtrl!=false){
					var indicatorsTxt = '<ol class="carousel-indicators"><li class="active"></li>';
					for(var i=1;i<length;i++){
						indicatorsTxt += '<li></li>';
					}
					indicatorsTxt +='</ol>';
					
					q.append(indicatorsTxt);
					t = q.find(".carousel-indicators > li");
					if(qHandle == "click"){
						t && t.on("click",{direction:"on"},myHandler)
					}else{
						t && t.on("mouseenter",{direction:"on"},myHandler)
					}
					
				}
				
				if(qTime){
					objSlide.time = qTime;
				}

				if(qAuto){
					q.on("mouseenter",function(){
						objSlide.pause();
					})
					 .on("mouseleave",function(){
						objSlide.cycle();
					})
					 .trigger("mouseleave")
				}
			}				
			
			function myHandler(event){
				var oldIndex = n.filter(".current").index();
				var newIndex;
				
				if(event.data.direction == "on"){
					newIndex = $(this).index();
					
				} else if(event.data.direction == "left"){
					if (oldIndex==0){
						newIndex = length-1;
					} else {
						newIndex = oldIndex-1;
					}
				} else if(event.data.direction == "right"){
					if (oldIndex==length-1){
						newIndex = 0;
					} else {
					 	newIndex = oldIndex+1;
					}
				}
				if(newIndex!=oldIndex){
					if(newIndex>oldIndex){
						dir = true;
					} else {
						dir = false;
					}
					slide(oldIndex,newIndex,dir)
				}
				index = newIndex;
			}
			
			//透明度动画
			function slide1(oldIndex,newIndex,dir){
				t && t.eq(oldIndex).removeClass("active");
				t && t.eq(newIndex).addClass("active");
				n.eq(oldIndex).removeClass("current");
				n.eq(oldIndex).stop(true,false).animate({opacity:0},500,function(){
					n.eq(oldIndex).css("display","none");
					
				})
				n.eq(newIndex).addClass("current")
				n.eq(newIndex).css("display","block");
				n.eq(newIndex).stop(true,false).animate({opacity:1},1000)
				
			}
			
			//水平移动动画
			function slide2(oldIndex,newIndex,dir){
				var distance;
				var dirClass;
				dir ? distance = "-100%" : distance = "100%";
				dir ? dirClass = "right" : dirClass = "left";
				t && t.eq(newIndex).addClass("active").siblings().removeClass("active");
				n.not(":eq("+oldIndex+"),"+":eq("+newIndex+")").removeClass("active current "+dirClass);
				n.eq(newIndex).siblings().stop(true,true);
				n.eq(oldIndex).removeClass("current "+dirClass);
				n.eq(newIndex).addClass("current "+dirClass);
				n.eq(oldIndex).animate({left:distance},1000,"easeInOutQuint",function(){
					n.eq(oldIndex).removeClass("active "+dirClass);
					n.eq(oldIndex).removeAttr("style");
				})	
				
				n.eq(newIndex).stop(true,false).animate({left:0},1000,"easeInOutQuint",function(){
					n.eq(newIndex).addClass("active").removeClass(dirClass);
					n.eq(newIndex).removeAttr("style");
				})
			}
		},

		//去除字符串首尾空格
        'trim': function (value) {
        	if(value){
        		return value.replace(/(^\s*)|(\s*$)/g, '');
        	}else{
        		return "";
        	}
        },

        //md5加密
        md5String : function(string){
        	return $.md5(string+"1"+"20141101");
        },

        //获取cookie内存储的sessionKey
        'sessionKey':$.cookie("sessionKey"),

        //cookie的有效时间
        'expiresDate':function(minute){
        	var expiresDate= new Date();
            expiresDate.setTime(expiresDate.getTime() + (minute * 60 * 1000));
            return expiresDate;
        },

        //登录、注册后统一跳转
        'goToUrl': "/",

        //发送手机验证码
        'sendMobileCode':function(mobileData,callback){
        	var self = this;
        	var data = {
        		phone:mobileData.mobile,
        		userType:mobileData.userType || 1,
        		reasonType:mobileData.reasonType || 1
        	};
        	$.post(self.api.mobileCode,data,function(response){
        		self.errorCode({
        			data:response
        		},function(){
        			if(callback){
        				callback();
        			}
        		})
        	});
        },

        //发送手机验证码倒计时
        'MobileCodeCountdown' : function($element,time){ 
          var value = time-1;
          var timer;
          $element.addClass('send');
          $element.addClass('disable').text(time+"秒后可再次获取");
          timer = setInterval(function(){
            $element.text(value+"秒后可再次获取")
            value--;
            if(value<0){
              clearInterval(timer);
              $element.removeClass('disable').text("获取验证码");
            }
          },1000);
        },

        //错误处理
        'errorCode':function(errorData,callback){
        	var error = {
        		data  : errorData.data,
        		noTip : errorData.noTip,
        		diyFn : errorData.diyFn
        	};

        	if(error.data.data.status!=0){
        		if(!error.noTip){
        			this.mPopUp({
        				msg:error.data.data.msg
        			})
        		}

    			if(error.diyFn){
    				error.diyFn();
    			}
        		
        	}else{
        		if(callback){
        			callback();
        		}
        	}
        },

        //密码强度判断
	    'passwordStrength' : function($password,$complexity){
	      var value = $password.val();
	      var length = value.length;
	      var level = 0;
	      var mode = 0; 
	      var charMode, charCode;
	      if(length>=6 && length<=15){ 
	        for (var i = 0; i < length; i++) {
	          charCode = value.charCodeAt(i);
	          // 判断输入密码的类型
	          if (charCode >= 48 && charCode <= 57) {//数字  
	            charMode = 1;
	          }else if (charCode >= 65 && charCode <= 90){//大写  
	            charMode = 2;
	          } else if (charCode >= 97 && charCode <= 122){//小写  
	            charMode = 4;
	          }else{
	            charMode = 8;//特殊字符
	          }
	          mode |= charMode;
	        }
	        // 计算密码模式
	        for (i = 0; i < 4; i++) {
	          if (mode & 1){
	            level++;
	          }
	          mode >>>= 1;
	        }
	        switch (level) {
	          case 1:
	            $complexity.attr("class","complexity first");
	            break;
	          case 2:
	            $complexity.attr("class","complexity second");
	            break;
	          case 3:
	            $complexity.attr("class","complexity third");
	            break;
	          default:
	            $complexity.attr("class","complexity");
	            break;
	        }
	      }else{
	        $complexity.attr("class","complexity");
	      }
	    },

	    //加载个人中心menu
	    loadMenu:function($element,callback){
	    	$element.load("/pages/personal-center/m-h-menu.html?v=_WEBSITE_VERSION_",function(){
	    		callback && callback();
	    	})
	    },

		//api地址
		"api":{
			login:"/v2/website_api/user/login",//登录
			logout:"/v2/website_api/user/logout",//登出
			register:"/v2/website_api/user/register",//注册
			isLogin:"/v2/website_api/user/validateSession",//是否登录
			retrieveStep1:"/v2/website_api/user/mapcode",//找回密码第一步
			retrieveStep2:"/v2/website_api/user/phoneCode",//找回密码第二步
			retrieveStep3:"/v2/website_api/user/resetPassword",//找回密码第二步
			mobileCode:"/v2/website_api/user/code/create",//手机验证码
			sectionList:"/v2/website_api/product/sections",//专区列表
			sectionProductList:"/v2/website_api/product/list",//产品列表
			sectionBankList:"/v2/website_api/bank/chosen/list",//银行精选（银行列表）
			sectionBankProduct:"/v2/website_api/bank/chosen/product/list",//银行精选（产品列表）
			productDetail:"/v2/website_api/product/info"//产品详情
		},

		//otherApi地址
		otherApi:{
			indexOrigin:"http://share.mashanglc.com/v2/site_channel/view/site/"//首页来源统计
		}
	}
	
	for(var i in mashanglc.api){
		mashanglc.api[i] = mashanglc.wwwHost + mashanglc.api[i];
	};

    return mashanglc;
});



