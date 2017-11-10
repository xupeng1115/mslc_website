
//jQuery动画曲线
jQuery.extend( jQuery.easing,
{
	easeInOutQuint: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
		return c/2*((t-=2)*t*t*t*t + 2) + b;
	}
});


//判断图片加载是否完成
function loadImage(url, callback) { 
	var img = new Image(); 
	img.src = url; 
	if(img.complete) { 
		callback.call(img); 
		return; 
	} 
	img.onload = function () { 
		callback.call(img);
	}; 
}


//验证文本框是否为数字以及自动计算收益
+function(){

 	function RepNumber(obj,digit) {
		var reg = /^[\d]+$/g;
		var txt;
		
		//若第一位是0，则删除
		if (obj.value.charAt(0)=="0"){
			obj.value = obj.value.substr(1);
		}

		//删除所有非数字的字符
		if (!reg.test(obj.value)) {
			txt = obj.value;
			txt.replace(/[^0-9]+/, function (char, index, val) {
				obj.value = val.replace(/\D/g, "");
				var rtextRange = null;
				//设置光标位置
				if (obj.setSelectionRange) {
					obj.setSelectionRange(index, index);
				} else {//支持ie
					rtextRange = obj.createTextRange();
					rtextRange.moveStart('character', index);
					rtextRange.collapse(true);
					rtextRange.select();
				}
			})
		}

		//删除digit(默认11位，可通过data-digit设置)以后的所有字符
		if(obj.value.length>digit){
	      	obj.value = obj.value.substring(0,digit);
	    }
	    if($(obj).hasClass('count')){
	    	count(obj);
	    }
	}

	//计算收益
    function count(obj){
        var parent = $(obj).parents(".form-cont");
        var inputMoney = parent.find("input[data-type='money']");
        var inputTime = parent.find("input[data-type='time']");
        var money = parseInt(inputMoney.val().replace(/,/gi, ""));
        var profitValue = parent.find(".profit-value");
        var result,time;

        if(parent.data("time")){
        	time = parent.data("time")
        }else{
        	time =inputTime.val();
        }

	    if(time=="0" || time=="" || money=="0" || money=="" || isNaN(money)){
	      profitValue.text("0");
	      return;
	    }
	    result=(money*6.60*time/100/365).toFixed(1);
	    if(result>Math.pow(10,10)-1){
	      result = parseInt(result,10).toExponential(6);
	    }
	    profitValue.text(result);
    }

 	$(document).on('ready',function () {	
 		$('input[data-type="money"],input[data-type="time"]').each(function(){
 			var timer = null;
 			var self  = this;
 			var s = 0;
 			$(this).on("focus",function(){
 				var digit = $(this).data("digit") || 11;
 				$(this).val($(this).val().replace(/,/g, function(){
 					if (!!window.ActiveXObject || "ActiveXObject" in window) {
 						var rtextRange = self.createTextRange();
 						var index = $(self).val().length;
						rtextRange.moveStart('character', index);
						rtextRange.collapse(true);
						rtextRange.select();
 					}
 					return "";
 				}));
 			
 				$(this).attr("placeholder","");

		 		clearInterval(timer); 
			    timer = setInterval(function(){
			    	RepNumber(self,digit);
			    }, 200); 
 			})

 			$(this).on("blur",function(){
 				var defaultValue = $(this).data("defaultvalue");
		 		var numValue = parseInt(defaultValue)*10000;
		 		var reg = /(-?\d+)(\d{3})/;
		 		var num = $(this).val();
		 		clearInterval(timer); 
		 		
		        if(defaultValue){
		        	if(num==""){
		        		$(this).attr("placeholder","起购金额"+defaultValue);
		        	}else if(num<numValue){
		        		//模拟弹出框
		        		mPopUp({
		        			type : "alert",
		        			msg : "该理财产品最低起购金额不得低于"+defaultValue,
		        			skin : "blue",
		        			handle : function($pop){
		        				$pop.on("click.handle",".close, .btn-default",function(){
		        					$(self).val("");
		        					$(self).focus();
		        				})
		        			}
		        		})
		        	}else{
		        		while (reg.test(num)) { 
		        			num = num.replace(reg, "$1,$2"); 
		        		} 
		        		$(this).val(num);
		        	}
		        }
 			})
 		})			   
 	})
}(jQuery)

//切换城市
function selectCity(element,callback){
	var $current = $(element).find(".current");
	var $list = $(element).find("ul");
	//单击当前城市
	$current.on("click",function(e){
		$(this).toggleClass('show');
		$list.toggleClass('show');
		if($current.hasClass('show')){
			$(document).on("click.city",function(){
				$current.removeClass('show');
				$list.removeClass('show');
				$(document).off("click.city");
			})
		}
		e.stopPropagation();
	})

	//选择列表中的城市
	$("li",$list).on("click",function(e){
		var attrClass = $(this).attr("class");
		var currentClass = $current.attr("class");
		var targetTxt = $current.find(".txt").text();
		var city = $(this).find("span").text();
		var targetClass = currentClass.replace(/c-.+/, attrClass);

		$list.toggleClass('show');
		if(targetTxt!=city){
			$current.find(".txt").text(city);
			$current.attr("class",targetClass);
			//如果有回调函数则执行
			if(callback){
				callback(city);
			}
		}
		e.stopPropagation();
	})
}	


//计算弹出框top值并显示
function popUpPosition(element){
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
	
}

//模拟弹出框
function mPopUp(options){
	var $popUp,popHtml;
	var btnHtml = "";
	var pugin = {
		type       : "alert", //弹出框类型(默认alert，可设置confirm)
		skin       : "",//弹出框皮肤(默认空为蓝色皮肤，可选皮肤red)
		diyClass   : "",//自定义pop样式名称
		title      : "温馨提示",//弹出框标题
		msg        : "",//弹出框消息(html或者纯文本)
		hadBtn     : true,//是否有button
		btnDefault : "我知道了",//alert弹出框按钮文字
		btnOK      : "确定",//confirm弹出框确定按钮文字
		btnCancel  : "取消",//confirm弹出框取消按钮文字
		offDefault : false,//是否取消默认绑定的关闭和按钮事件
		handle     : null //自定义的事件句柄
	}
	$.extend(pugin, options);

	if(pugin.hadBtn && pugin.type=="alert"){
		btnHtml = '<div class="button-bar"><a href="javascript:;" class="btn btn-default">'+pugin.btnDefault+'</a></div>';
	}else if(pugin.hadBtn && pugin.type=="confirm"){
		btnHtml = '<div class="button-bar"><a href="javascript:;" class="btn btn-ok">'+pugin.btnOK+'</a><a href="javascript:;" class="btn btn-cancel">'+pugin.btnCancel+'</a></div>'
	}
				
	popHtml = '<div class="m-pop-up m-pop-' 
				+ pugin.type + " " + pugin.skin + " " +pugin.diyClass
				+ '"><div class="m-pop-mask"></div><div class="m-pop-cont"><div class="close"></div><div class="title">'
				+ pugin.title
				+ '</div><div class="content"><div class="msg">'
				+ pugin.msg
				+ '</div>'
				+ btnHtml
				+ '</div></div></div>';
	
	$("body").append(popHtml);

	$popUp = $(".m-pop-up").last();

	popUpPosition($popUp);

	!pugin.offDefault && $popUp.on("click.close",".close, .btn-default, .btn-cancel",function(){
		$popUp.remove();
	})

	if(pugin.handle){
		pugin.handle($popUp);
	}
	
}

//马上理财6步曲弹出框
function sixStep(callback){
	if($("#popProcess").length>0){
	  popUpPosition($("#popProcess"));
	  //重置显示第一步
	  $("#popProcess .tab li").eq(0).addClass('current').siblings().removeClass('current');
	  $("#popProcess .tabcont li").eq(0).addClass('current').siblings().removeClass('current');
	  $("#popProcess .tabcont .btn").show();
	}else{
	  $("body").append('<div class="m-pop-process" id="popProcess"></div>');
	  $("#popProcess").load("/ajax/ajax-process.html",function(){
	    popUpPosition($("#popProcess"))
	  })
	}
	if(callback){
		callback($("#popProcess"));
	}
}

//倒计时(开售、停售)
$.fn.extend({
	countdown : function(){
		var timer = null;
		var surplus = $(this).data("surplus");//剩余毫秒数
		var $day = $(this).find(".day");
		var $hour = $(this).find(".hour");
		var $minute = $(this).find(".minute");
		var $second = $(this).find(".second");		
		countMsec(surplus);

		timer = setInterval(function(){
			if(surplus<1000){
				clearInterval(timer);
				return;
			}
			surplus = surplus-1000;
			countMsec(surplus);
		},1000)

		function countMsec(surplus){
			var d = Math.floor(surplus/1000/60/60/24);
			var h = Math.floor(surplus/1000/60/60%24);
			var m = Math.floor(surplus/1000/60%60);
			var s = Math.floor(surplus/1000%60);
			$day.text(d);
			$hour.text(h);
			$minute.text(m);
			$second.text(s);
		}
	}
})


$(function(){
	//关闭谷歌浏览器自带填充表单功能input[type="text"]
	if (navigator.userAgent.toLowerCase().indexOf("chrome") >= 0){
		var $autoInput = $('input[type="text"]');
		$autoInput.attr("autocomplete","off");
	}

	//ajax加载侧边联系客服模块并绑定事件
	$("#sideR").load("/ajax/ajax-side.html");

})

//开发阶段预览用（请删除）
$(function(){
	//禁止ajax缓存
	$.ajaxSetup ({ 
	    cache: false
	});

	var catelog = '<ul style="position:fixed; z-index:10001; left:-110px; top:20%; height:60%; width:120px; overflow:auto; background:rgba(203,203,203,0.3); text-align:left; padding:12px; font-size:14px; box-shadow:1px 3px 2px 2px rgba(25,25,25,0.2);" id="cate">'
				+ '<li style="position:absolute; right:5px; top:0; font-size:12px; color:red; cursor:pointer;display:none" id="cateClose">收起</li>'
				+ '<li style="position:absolute; right:5px; top:0; font-size:12px; color:red; cursor:pointer; " id="cateShow">展开</li>'
				+ '<li style="text-align:center; color:red; padding-top:5px;">仅预览使用</li>'
		        + '<li><a href="index.html">首页</a></li>'
		        + '<li><a href="product-list.html">产品推荐</a></li>'
		        + '<li><a href="novice-finance.html">新手理财</a></li>'
		        + '<li><a href="product-details.html">产品详情</a></li>'
		        + '<li><a href="appointment-success.html">预约成功</a></li>'
		        + '<li><a href="appointment-failure.html">预约失败</a></li>'
		        + '<li><a href="company-profile.html">公司简介</a></li>'
		        + '<li><a href="login.html">登录</a></li>'
		        + '<li><a href="register.html">注册</a></li>'
		        + '<li><a href="retrieve-password1.html">找回密码一</a></li>'
		        + '<li><a href="retrieve-password2.html">找回密码二</a></li>'
		        + '<li><a href="retrieve-password3.html">找回密码三</a></li>'
		        + '<li><a href="personal-center.html">个人中心首页</a></li>'
		        + '<li>理财中心</li>'
		        + '<li style="padding-left:1em;"><a href="financing-my-reservation.html">我的预约</a></li>'
		        + '<li style="padding-left:1em;"><a href="financing-my-order.html">我的购买</a></li>'
		        + '<li style="padding-left:1em;"><a href="financing-my-redeem.html">我的赎回</a></li>'
		        + '<li style="padding-left:1em;"><a href="financing-my-collection.html">我的收藏</a></li>'
		        + '<li>账户管理</li>'
		        + '<li style="padding-left:1em;"><a href="account-my-data.html">我的资料</a></li>'
		        + '<li style="padding-left:1em;"><a href="account-managing-director.html">理财经理</a></li>'
		        + '<li style="padding-left:1em;"><a href="account-friends.html">财友圈</a></li>'
		        + '<li style="padding-left:1em;"><a href="account-message.html">消息中心</a></li>'
		        + '</ul>';

	$("body").append(catelog);
	$("#cateClose").on("click",function(){
		$(this).hide();
		$("#cateShow").show();
		$("#cate").animate({"left":"-110px"}, 300).css("overflow","hidden");
	})
	$("#cateShow").on("click",function(){
		$(this).hide();
		$("#cateClose").show();
		$("#cate").animate({"left":"0"}, 300).css("overflow","auto");
	})
})
