define("mashanglcModule",["mashanglc","Handlebars"], function(mashanglc,Handlebars) {

    var mashanglcModule = {

        //产品列表模块
        productList : {
            handlebarsHelper : function(){
                //理财期限显示
                Handlebars.registerHelper('productListDurationDom', function(duration) {
                    if(duration=="不固定"){
                        return new Handlebars.SafeString(
                            "<b>不固定</b>"
                        );
                    }else{
                        return new Handlebars.SafeString(
                            "<i>"+this.duration+"</i><b>天</b>"
                        );
                    }
                });
                //理财期限input默认值
                Handlebars.registerHelper('productListDurationValue', function(duration) {
                    var durationTxt = '';
                    if(duration=="不固定"){
                        durationTxt = '<input type="text" class="input1 durationInput" data-type="duration" data-count="count" maxlength="11">';
                    }else{
                        durationTxt = '<input type="text" class="input1 durationInput" data-type="duration" data-count="count" maxlength="11" value="'+duration+'" readonly disabled />';
                    }
                    return new Handlebars.SafeString(
                        durationTxt
                    );
                });
                //tip
                Handlebars.registerHelper('productListTipDom', function(redeemRate) {
                    var tipTxt = '';
                    if(redeemRate){
                        tipTxt = '<p class="tip">每笔按起购金额补贴年化收益'+this.redeemRate+'%</p>';                   
                    }else{
                        if(this.type==2||this.type==3||this.type==4||this.type==5){
                            tipTxt = '<p class="tip">常年在售</p>';
                        }else if(this.type==6||this.type==7||this.type==8||this.type==9){
                            tipTxt = '<p class="tip">定期开售</p>';
                        }else{
                            tipTxt = '<p class="tip"><span class="start inline">起售日：'+this.purchaseStartDate+'</span><span class="end inline">停售日：'+this.purchaseEndDate+'</span></p>';
                        }
                    }
                    return new Handlebars.SafeString(
                        tipTxt
                    );
                });
            },
            
            createProductList : function(context,$List){
                var template,html;
                this.handlebarsHelper();
                template = Handlebars.templates['product'];

                for(var i in context.products){
                    if(context.products[i].redeemRate>0){
                        context.products[i].hasBonus = "has-bonus";
                    }
                    switch (context.products[i].riskLevel){
                        case "极低风险":
                            context.products[i].riskId = 0;
                            break;
                        case "低风险":
                            context.products[i].riskId = 1;
                            break;
                        case "中风险":
                            context.products[i].riskId = 2;
                            break;
                        case "高风险":
                            context.products[i].riskId = 3;
                            break;
                        case "极高风险":
                            context.products[i].riskId = 4;
                            break;
                    }
                }
                
                html = template(context);

                $List.html(html);
                this.bingEvent($List,context.products);
            },   

            bingEvent : function($List,products){
                var $btn = $List.find(".buttonCount");
                var $purchase = $List.find(".moneyInput");
                var $duration = $List.find(".durationInput");
                $btn.on("click",function(){
                    var $parent = $(this).parents("li");
                    var $operate = $parent.find(".operate");
                    var $count = $parent.find(".count");
                    $operate.hide();
                    $count.animate({right:0}, 500);
                })

                $purchase.each(function(index, el) {
                    var index = $(this).parents("li").index();
                    mashanglc.repNumber(this,{'classify':products[index].classify});
                });
                $duration.each(function(index, el) {
                    var index = $(this).parents("li").index();
                    mashanglc.repNumber(this,{'classify':products[index].classify});
                });
            }
        }
    };
    return mashanglcModule;
})

