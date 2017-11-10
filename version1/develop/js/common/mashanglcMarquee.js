define('mashanglcMarquee',['jquery'],function($){
	//jQuery动画曲线
	jQuery.extend( $.easing,
	{
		easeInOutQuint: function (x, t, b, c, d) {
			if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
			return c/2*((t-=2)*t*t*t*t + 2) + b;
		}
	});
	//mashanglcMarquee滚动原型
	var mashanglcMarquee = function(element,options){
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
			screen : 3,//容器可见区域item显示数量
			loop : true,//是否循环
			speed : 5000,//滚动间隔
			animateTime:1000//动画执行时间
		}
		
		$.extend(this.public,options);

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
	};

	mashanglcMarquee.prototype = {
		install : function(){
			var self = this;
			var nullItem;

			if(this.public.loop){
				if(this.length%this.public.step != 0){
					for(var i=0;i<this.public.step-this.length%this.public.step;i++){
						this.obj.append('<li class="null"></li>');
					}
					this.length = this.length+(this.public.step-this.length%this.public.step);
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

		},
		move : function(dir){
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

			this.obj.animate(cssData,this.public.animateTime,"easeInOutQuint",function(){
				if(self.start==self.length/self.public.step){
					self.obj.css(self.pos,0);
					self.start = 0 ;
				}
			});
		},
		wrapHandle : function(isOn){
			var self = this;
			if(isOn){
				this.wrap.on("mouseenter",function(){self.pause()})
						.on("mouseleave",function(){self.play()}).trigger('mouseleave');
			}else{
				this.wrap.off("mouseenter mouseleave");
			}	
		},
		pause : function(){
			if(this.public.auto) {
				clearInterval(this.qTimer);
			}
		},
		play : function(){
			var self = this;
			if(this.public.auto && this.public.loop && this.public.screen < this.length) {
				this.qTimer = setInterval(function(){
					self.move(self.dir);
				},self.public.speed);
				
			}
		},
		to : function(index){
			var self = this;
			var start,space;
			var cssData = {};
			if(self.public.loop==true || self.length<=self.public.screen || index<self.public.screen){
				return false;
			}else{
				space = index+1-self.public.screen;
				start = Math.ceil(space/self.public.step);
				self.start = start;
				cssData[self.pos] = -(self.distance*self.start*self.public.step);
				self.obj.animate(cssData,self.public.animateTime,"easeInOutQuint",function(){
					if(self.length-(self.start*self.public.step)<=self.public.screen && !self.public.loop){
						self.btnNext.addClass('disable');
						self.btnPrev.removeClass('disable');
					}
				});
				
			}
		}
	};
	return mashanglcMarquee;
})

