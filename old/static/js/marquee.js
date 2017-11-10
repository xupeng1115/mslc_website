
//marquee滚动原型
var Marquee = function(element,options){
	var self = this;
	this.wrap     = $(element);
	this.obj      = this.wrap.find("ul");
	this.item     = this.obj.children("li")
	this.length   = this.item.size();
	this.btnPrev  = this.wrap.find(".prev");
	this.btnNext  = this.wrap.find(".next");
	this.pos = "left";
	this.distance = 0;
	this.qTimer   = null;
	this.start = 0;

	this.public = {
		auto : false,//是否自动滚动
		dir  : "right",//滚动默认方向
		step : 1,//滚动步长
		screen : 3,//容器可见区域item显示数量，只读
		loop : true,//是否循环
		speed : 5000//滚动间隔
	}
	
	jQuery.extend(this.public,options);

	if(this.public.screen < this.length){
		this.install();
		this.btnPrev && this.btnPrev.on("click",function(e){
			if($(this).hasClass('disable')){
				return false;
			}
			self.move("prev");
			e.preventDefault();
		})
		this.btnNext && this.btnNext.on("click",function(e){
			if($(this).hasClass('disable')){
				return false;
			}
			self.move("next");
			e.preventDefault();
		})

		if(this.public.auto && this.public.loop){
			this.wrapHandle(true);
		}
	}else{
		this.btnPrev && this.btnPrev.hide();
		this.btnNext && this.btnNext.hide();
	}
}

Marquee.prototype.install = function(){
	var self = this;
	var nullItem;

	if(this.public.loop){
		if(this.length%this.public.step != 0){
			this.length = this.length+(this.public.step-this.length%this.public.step);
			for(var i=1;i<this.public.step-this.length%this.public.step;i++){
				this.obj.append('<li class="null"></li>');
			}
		}
		this.obj.append(this.obj.html());	
	}else{
		this.btnPrev.addClass('disable');
	}
	
	if(this.public.dir=="right"||this.public.dir=="left"){
		this.pos = "left";
		this.distance = this.item.eq(0).outerWidth(true);
		this.obj.width(this.distance*this.length*2);
	}else if(this.public.dir=="top"||this.public.dir=="bottom"){
		this.pos = "top";
		this.distance = this.item.eq(0).outerHeight(true);
	}

}

Marquee.prototype.move = function(dir){
	var self = this;
	var cssData = {};
	
	if(this.obj.is(":animated")){ return;}

	if(dir=="left" || dir=="top" || dir=="prev"){
		this.start--;
		this.btnNext.removeClass('disable');

		if(this.start==0 && !this.public.loop){
			this.btnPrev.addClass('disable');
		}
		
		if(this.start==-1){
			this.obj.css(this.pos,-this.distance*this.length);
			this.start = this.length/this.public.step-1;
		}
	}else{
		this.start++;
		this.btnPrev.removeClass('disable');

		if(this.length-(this.start*this.public.step)<=this.public.screen && !this.public.loop){
			this.btnNext.addClass('disable');
		}
	}

	cssData[this.pos] = -(this.distance*this.start*this.public.step);

	this.obj.animate(cssData,1000,"easeInOutQuint",function(){
		if(self.start==self.length/self.public.step){
			self.obj.css(self.pos,0);
			self.start = 0 ;
		}	
	});
}

Marquee.prototype.wrapHandle = function(isOn){
	var self = this;
	if(isOn){
		this.wrap.on("mouseenter",function(){self.pause()})
				.on("mouseleave",function(){self.play()}).trigger('mouseleave');
	}else{
		this.wrap.off("mouseenter mouseleave");
	}	
}

Marquee.prototype.pause = function(){
	if(this.public.auto) {
		clearInterval(this.qTimer);
	}
}

Marquee.prototype.play = function(){
	var self = this;
	if(this.public.auto && this.public.loop && this.public.screen < this.length) {
		this.qTimer = setInterval(function(){
			self.move(self.dir);
		},self.public.speed);
		
	}
}