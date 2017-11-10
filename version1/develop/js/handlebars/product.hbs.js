define(["Handlebars"], function(Handlebars) {
    return (function() {
      var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
    templates['product'] = template({"1":function(container,depth0,helpers,partials,data) {
        var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

      return "    <li data-base=\""
        + alias4(((helper = (helper = helpers.estimatedYearRate || (depth0 != null ? depth0.estimatedYearRate : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"estimatedYearRate","hash":{},"data":data}) : helper)))
        + "\" data-bonus=\""
        + alias4(((helper = (helper = helpers.redeemRate || (depth0 != null ? depth0.redeemRate : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"redeemRate","hash":{},"data":data}) : helper)))
        + "\" data-duration=\""
        + alias4(((helper = (helper = helpers.duration || (depth0 != null ? depth0.duration : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"duration","hash":{},"data":data}) : helper)))
        + "\" data-purchase=\""
        + alias4(((helper = (helper = helpers.minimumPurchase || (depth0 != null ? depth0.minimumPurchase : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"minimumPurchase","hash":{},"data":data}) : helper)))
        + "\">\r\n        <div class=\"detail\">\r\n            <div class=\"s1 clearfix\">\r\n                <dl class=\"profit "
        + alias4(((helper = (helper = helpers.hasBonus || (depth0 != null ? depth0.hasBonus : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"hasBonus","hash":{},"data":data}) : helper)))
        + "\">\r\n                    <dd>\r\n                        <span class=\"base inline\">"
        + alias4((helpers.twoDecimals || (depth0 && depth0.twoDecimals) || alias2).call(alias1,(depth0 != null ? depth0.estimatedYearRate : depth0),{"name":"twoDecimals","hash":{},"data":data}))
        + "</span>\r\n"
        + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.redeemRate : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
        + "                    </dd>\r\n                    <dt>预期年化收益%</dt>\r\n                </dl>\r\n                <dl class=\"minimum-purchase\">\r\n                    <dd><i>"
        + alias4(((helper = (helper = helpers.minimumPurchase || (depth0 != null ? depth0.minimumPurchase : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"minimumPurchase","hash":{},"data":data}) : helper)))
        + "</i><b>万</b></dd>\r\n                    <dt>起购金额</dt>\r\n                </dl>\r\n                <dl class=\"duration\">\r\n                    <dd>"
        + alias4((helpers.productListDurationDom || (depth0 && depth0.productListDurationDom) || alias2).call(alias1,(depth0 != null ? depth0.duration : depth0),{"name":"productListDurationDom","hash":{},"data":data}))
        + "</dd>\r\n                    <dt>理财期限</dt>\r\n                </dl>\r\n                <dl class=\"risk-type\">\r\n                    <dd><span class=\"ico-risk risk"
        + alias4(((helper = (helper = helpers.riskId || (depth0 != null ? depth0.riskId : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"riskId","hash":{},"data":data}) : helper)))
        + "\">"
        + alias4(((helper = (helper = helpers.riskLevel || (depth0 != null ? depth0.riskLevel : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"riskLevel","hash":{},"data":data}) : helper)))
        + "</span></dd>\r\n                    <dt>风险程度</dt>\r\n                </dl>\r\n                <dl class=\"investment-type\">\r\n                    <dd><span class=\"ico-type inline\">"
        + alias4(((helper = (helper = helpers.investmentType || (depth0 != null ? depth0.investmentType : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"investmentType","hash":{},"data":data}) : helper)))
        + "</span></dd>\r\n                    <dt>产品类型</dt>\r\n                </dl>\r\n            </div>\r\n            <div class=\"s2\">\r\n                "
        + alias4((helpers.productListTipDom || (depth0 && depth0.productListTipDom) || alias2).call(alias1,(depth0 != null ? depth0.redeemRate : depth0),{"name":"productListTipDom","hash":{},"data":data}))
        + "\r\n            </div>\r\n        </div>\r\n        <div class=\"operate\">\r\n            <a href=\"/pages/product-detail.html?pid="
        + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
        + "\" class=\"btn btn1\">查看详情</a>\r\n            <p class=\"btn btn2 buttonCount\">计算收益</p>\r\n        </div>\r\n        <div class=\"count formCountProfit\" data-profit=\""
        + alias4(((helper = (helper = helpers.estimatedYearRate || (depth0 != null ? depth0.estimatedYearRate : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"estimatedYearRate","hash":{},"data":data}) : helper)))
        + "\" data-purchase=\""
        + alias4(((helper = (helper = helpers.minimumPurchase || (depth0 != null ? depth0.minimumPurchase : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"minimumPurchase","hash":{},"data":data}) : helper)))
        + "\">\r\n            <dl class=\"clearfix\">\r\n              <dt>购买金额</dt>\r\n              <dd><input type=\"text\" maxlength=\"11\" class=\"input1 moneyInput\" data-defaultvalue=\""
        + alias4(((helper = (helper = helpers.minimumPurchase || (depth0 != null ? depth0.minimumPurchase : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"minimumPurchase","hash":{},"data":data}) : helper)))
        + "\" data-type=\"money\" data-count=\"count\" placeholder=\"起购金额"
        + alias4(((helper = (helper = helpers.minimumPurchase || (depth0 != null ? depth0.minimumPurchase : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"minimumPurchase","hash":{},"data":data}) : helper)))
        + "万\"><span class=\"txt\">元</span></dd>\r\n            </dl>\r\n            <dl class=\"clearfix\">\r\n              <dt>理财期限</dt>\r\n              <dd>"
        + alias4((helpers.productListDurationValue || (depth0 && depth0.productListDurationValue) || alias2).call(alias1,(depth0 != null ? depth0.duration : depth0),{"name":"productListDurationValue","hash":{},"data":data}))
        + "<span class=\"txt\">天</span></dd>\r\n            </dl>\r\n            <dl class=\"clearfix\">\r\n              <dt>预期收益</dt>\r\n              <dd><span class=\"profit-value\">0</span><span class=\"txt\">元</span></dd>\r\n            </dl>\r\n            <a href=\"/pages/product-detail.html?pid="
        + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
        + "\" class=\"btn btn3\">查看详情</a>\r\n        </div>\r\n    </li>\r\n";
    },"2":function(container,depth0,helpers,partials,data) {
        var helper;

      return "                        <span class=\"sign inline\">+</span>\r\n                        <span class=\"bonus inline\">"
        + container.escapeExpression(((helper = (helper = helpers.redeemRate || (depth0 != null ? depth0.redeemRate : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"redeemRate","hash":{},"data":data}) : helper)))
        + "</span>\r\n";
    },"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
        var stack1;

      return "<ul>\r\n"
        + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.products : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
        + "</ul>\r\n\r\n";
    },"useData":true});
    })();
})