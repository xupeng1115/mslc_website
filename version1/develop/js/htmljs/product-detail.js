define(["mashanglc","Handlebars","mashanglcValidate","handlebars/product-detail-1.hbs","handlebars/product-detail-2.hbs"], function(mashanglc,Handlebars,mashanglcValidate) {
    return function(){
        //jQuery动画曲线
        jQuery.extend( jQuery.easing,
        {
          easeOutBack: function (x, t, b, c, d, s) {
                if (s == undefined) s = 1.30158;
                return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
            }
        });

        //产品图表动画
        function chart(profitValue,isDir,classifyRate){
          var bottomNum = isDir?"245px":"100px";
          $("#moneyTxt2").find(".money-num").text(profitValue);
          $("#moneyIco1").addClass('animating');
          var classifyRateArr;

          if(classifyRate){
            classifyRateArr = mashanglc.NDecimals(classifyRate,2).split(".");
            $("#chartProfit").find(".v1").text(classifyRateArr[0]);
            $("#chartProfit").find(".v2").text("."+classifyRateArr[1]);
          }
          
          $("#moneyIco1").animate({bottom:bottomNum}, 1200, "easeOutBack",function(){
            var w1 = $("#chartD3").width();
            var w2 = $("#moneyTxt2").width();
            $("#chartD3").width("0");
            $("#moneyTxt2").width("0");
            $("#chartD3Txt").width(w1);
            $("#moneyTxt2D").width(w2);
            $("#chartColors").slideDown(1000, function() {
              $("#chartD3").show().animate({width:w1}, 500);
              $("#moneyIco1").removeClass('animating');
              if(!isDir && $("#chartD3").data("duration")=="不固定"){
                return false;
              }
              $("#moneyIco2").slideDown(300);
              $("#moneyTxt2").show().animate({width:w2}, 500);
            });
          });
        }

        
        //绑定事件(input输入框、计算收益按钮、分享按钮等)
        function bingEvent(classify){
          var $introAttr = $("#productIntroAttr");
          var $purchase = $introAttr.find(".moneyInput");
          var $duration = $introAttr.find(".durationInput");
          var $shareBtn = $("#shareBtn");
          var validate = new mashanglcValidate();
          var defaultvalue = $purchase.data("defaultvalue");


          validate.addValidate({
              ruleName: "compare",
              ruleTip: "起购金额不能小于"+defaultvalue+"万",
              ruleFn: function (element) {
                var value = element.val().replace(/,/gi, "");
                if (parseFloat(value) < parseFloat(defaultvalue*10000)) {
                    return true;
                } else {
                    return false;
                }
              }
          });

          var validateAll = {
              tipClass:"tip",
              validateElement:[
                  {
                      element:$purchase,
                      rules:[
                          { 
                            ruleName:"required"
                          },
                          {
                              ruleName:"compare"
                          }
                      ]
                  },
                  {
                      element:$duration,
                      rules:[
                          {
                              ruleName:"required"
                          }
                      ]
                  }
              ]
          }

          var animateCount = function(classify){
            var profitValue;
            var purchaseValue = parseInt($purchase.val().replace(/,/gi, ""));
            var durationValue = $duration.val();
            var estimatedYearRate = $introAttr.data("profit");
            var classifyRate;
            
            if(classify){
              for(var i=0;i<classify.length;i++){
                if(classify[i].start<=durationValue && durationValue<=classify[i].end){
                  estimatedYearRate = classify[i].rate/100;
                  classifyRate = estimatedYearRate;
                }
              }
            }

            //格式化动画数据
            $("#moneyIco1").removeAttr('style');
            $("#chartD3").removeAttr('style');
            $("#moneyTxt2").removeAttr('style');
            $("#chartD3Txt").removeAttr('style');
            $("#moneyTxt2D").removeAttr('style');
            $("#chartColors").removeAttr('style');
            $("#moneyIco2").removeAttr('style');
            $("#moneyTxt2D").find(".money-num").text("");
            $("#chartD3Txt").find(".time-num").text(durationValue+"天");

            profitValue = mashanglc.countProfit({
              purchase : purchaseValue,
              duration : durationValue,
              estimatedYearRate : estimatedYearRate
            });
            
            chart(profitValue,true,classifyRate);
          }

          $("#countAnimate").on("click",function(){
            validate.install(validateAll,function(){
              animateCount(classify);
            })
          })

          mashanglc.repNumber($purchase[0]);
          mashanglc.repNumber($duration[0]);

          $shareBtn.on("click",function(){

            mashanglc.mPopUp({
              title:"分享到朋友圈",
              msg:"测试",
              otherClick:true,
              hadBtn:false
            });
            
            return false;
          })
        }
        
        //创建产品详情模板一
        function createProductT1(context){
          var template = Handlebars.templates['product-detail-1'];
          var html = template(context) || "";

          $("#productT1").html(html);

          mashanglc.loadImage("/img/chart-bg.png",function(){
            var $introChart = $("#productIntroChart");
            var profitValue = 0;
            if($introChart.data("duration")!="不固定"){
              profitValue = mashanglc.countProfit({
                purchase : $introChart.data("purchase")*10000,
                duration : $introChart.data("duration"),
                estimatedYearRate : $introChart.data("profit")
              })
            }

            chart(profitValue);
          });
          mashanglc.countdown($(".countdown"));

          bingEvent(context.classify);

        }

        //创建产品详情模板二
        function createProductT2(context){
          var template = Handlebars.templates['product-detail-2'];
          var html = template(context) || "";

          $("#productT2").html(html);
        }

        //获取产品详情
        function getProductDetail(){
          var productId = mashanglc.getUrlParameter("pid");
          var sectionId = mashanglc.getUrlParameter("sectionId");
          var request = {
            pid : productId,
            cityId : mashanglc.cityId
          }
          if(sectionId){
            request.sectionId = sectionId;
          }
          
          $.get(mashanglc.api.productDetail,request,function(response){
              var context = response.data;
              $.cookie('productId',productId,{path: '/'});
              if(context.success===false){
                location.href = "financing-list.html?tip="+productId;
              }else{
                createProductT1(context);
                createProductT2(context);
              }
          })
        }

        //构建Handlebars.registerHelper
        function registerHelper(){
          //开售文本
          Handlebars.registerHelper('startTxt', function(type) {
            var txt = "开售";
            if(type==2||type==3||type==4||type==5){
              txt = "常年在售";
            }else if(type==6||type==7||type==8||type==9){
              txt = "定期开售";
            }
            return new Handlebars.SafeString(
                txt
            );
          });

          //开售时间
          Handlebars.registerHelper('startDate', function(purchaseStartDate) {
            if(this.type==2||this.type==3||this.type==4||this.type==5||this.type==6||this.type==7||this.type==8||this.type==9){
              return "";
            }else{
              return new Handlebars.SafeString(
                purchaseStartDate.substr(0,10)
              );
            }
          });

          //开赚时间
          Handlebars.registerHelper('makeMoneyDate', function(startDate,space) {
            if(!startDate){
              if(this.startEarningType==1){
                if(space=="top"){
                  return "购买次日起";
                }else{
                  return "申购次日";
                }
              }else{
                if(space=="top"){
                  return "购买当日起";
                }else{
                  return "申购当日";
                }
              }
            }else{
              return startDate.substr(0,10);
            }
          });

          //收钱时间
          Handlebars.registerHelper('collectMoneyDate', function(endDate,space) {
            if(!endDate){
              if(space=="top"){
                if(this.duration=="不固定"){
                  return "";
                }else{
                  return "开赚"+this.duration+"天后";
                }
              }else{
                return "根据申购日确定";
              }
            }else{
              return endDate.substr(0,10);
            }
          });

          //是否可赎回、顺延
          Handlebars.registerHelper('collectTip', function(type) {
              var result = "";
              if(type==2||type==6){
                result = "(可顺延)";
              }else if(type==4||type==5||type==8||type==9){
                result = "(可随时赎回)";
              }
              return result;
          });

          //理财期限显示
          Handlebars.registerHelper('durationDom', function(duration) {
              if(duration=="不固定"){
                  return new Handlebars.SafeString(
                      "不固定"
                  );
              }else{
                  return new Handlebars.SafeString(
                      this.duration+"天"
                  );
              }
          });

          //理财期限input默认值
          Handlebars.registerHelper('durationValue', function(duration) {
            var durationTxt = '';
            if(duration=="不固定"){
                durationTxt = '<input type="text" data-type="duration" class="txt-input durationInput" maxlength="11" value="" data-tipnoicon="2" />';
            }else{
                durationTxt = '<input type="text" data-type="duration" class="txt-input durationInput" maxlength="11" value="'+duration+'" readonly disabled data-tipnoicon="2" />';
            }
            return new Handlebars.SafeString(
                durationTxt
            );
          });

          //时间删除小时、分和秒
          Handlebars.registerHelper('dateDom', function(dateStr) {
            return new Handlebars.SafeString(
                dateStr.substr(0,10)
            );
          });

          //图表内收益率显示
          Handlebars.registerHelper('profitDom', function(profit) {
            var profit = mashanglc.NDecimals(profit,2).toString();
            var profitArr = profit.split(".");
            var integer = profitArr[0];
            var decimal = profitArr[1] || 0;
            var profitTxt = '<span class="v1">'+integer+'</span><span class="v2">.'+decimal+'</span>';
            return new Handlebars.SafeString(
                profitTxt
            );
          });

          //倒计时
          Handlebars.registerHelper('countdownDom', function(countDown) {
            var countDownTxt = '<p class="time countdown" data-surplus="'+countDown+'"><span class="t-value day"></span>天<span class="t-value hour"></span>时<span class="t-value minute"></span>分<span class="t-value second"></span>秒</p>';
            var result ="";
            if(!countDown || countDown<0){
              return "";
            }

            if(this.status==0){
                result ='<p class="what">开售倒计时：</p>'+countDownTxt;
                return new Handlebars.SafeString(
                    result 
                );
            }else if(this.status==1){
                result ='<p class="what">停售倒计时：</p>'+countDownTxt;
                return new Handlebars.SafeString(
                    result
                );
            }else{
                return result;
            }
          }); 
        }

        //切换城市
        mashanglc.selectCity(function(currentCity){
          getProductDetail();
        })
        
        registerHelper();
        getProductDetail();
    }();
})

