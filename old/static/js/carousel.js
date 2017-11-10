
//图片轮播
+function(){
	function d(q){
		var n = q.find(".carousel-inner > .item");
		var qCtrl = q.data("has-ctrl");
		var qBtn  = q.data("has-btn");
		var qTime = q.data("slide-time");
		var qAuto = q.data("auto");
		var qHandle = q.data("handle");
		var length = n.length;
		var dir = true;
		var index = 0;
		var btnL, btnR, t,slide,objSlide;

		if(q.hasClass("carousel-move")){
			slide = slide2;
			n.eq(0).addClass('active current');
		}else{
			slide = slide1;
			n.eq(0).addClass('current');
		}

		objSlide = {
			time : 5000,
			interval : null,
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
				objSlide.interval = setInterval(objSlide.inter, objSlide.time)
			},
			pause : function(){
				clearInterval(objSlide.interval);
			 	objSlide.interval = null;
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
				q.on("mouseenter",objSlide.pause)
				 .on("mouseleave",objSlide.cycle)
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
	}
	
	$(window).on('load',function (event) {								   
  		$('.carousel').each(function () {			  
			var x = $(this);
			d(x);
   	 	})
 	 })
}(jQuery)
