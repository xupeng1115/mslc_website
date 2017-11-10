define(["Handlebars"], function(Handlebars) {
    return (function() {
      var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
    templates['product-detail-1'] = template({"1":function(container,depth0,helpers,partials,data) {
        var helper;

      return "    <p>每笔按起购金额补贴年化收益"
        + container.escapeExpression(((helper = (helper = helpers.redeemRate || (depth0 != null ? depth0.redeemRate : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"redeemRate","hash":{},"data":data}) : helper)))
        + "%</p>\r\n";
    },"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
        var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

      return "<div class=\"intro-chart\" data-purchase=\""
        + alias4(((helper = (helper = helpers.minimumPurchase || (depth0 != null ? depth0.minimumPurchase : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"minimumPurchase","hash":{},"data":data}) : helper)))
        + "\" data-profit=\""
        + alias4(((helper = (helper = helpers.estimatedYearRate || (depth0 != null ? depth0.estimatedYearRate : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"estimatedYearRate","hash":{},"data":data}) : helper)))
        + "\" data-duration=\""
        + alias4(((helper = (helper = helpers.duration || (depth0 != null ? depth0.duration : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"duration","hash":{},"data":data}) : helper)))
        + "\" id=\"productIntroChart\">\r\n  <div class=\"redeem-rate\">\r\n"
        + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.redeemRate : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
        + "  </div>\r\n  <div class=\"chart\">\r\n    <div class=\"chart-cont\">\r\n      <div class=\"bg\"></div>\r\n      <div class=\"money-ico1\" id=\"moneyIco1\"></div>\r\n      <div class=\"money-ico2\" id=\"moneyIco2\"></div>\r\n      <p class=\"money-txt money1\" id=\"moneyTxt1\"><span class=\"money-v\">"
        + alias4(((helper = (helper = helpers.minimumPurchase || (depth0 != null ? depth0.minimumPurchase : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"minimumPurchase","hash":{},"data":data}) : helper)))
        + "万</span></p>\r\n      <div class=\"money-txt money2\" id=\"moneyTxt2\">\r\n        <p class=\"money2-d\" id=\"moneyTxt2D\">预期收益<br><span class=\"money-v\"><span class=\"money-num\"></span>元</span></p>\r\n      </div>\r\n      <div class=\"profit\" id=\"chartProfit\">\r\n        <p>"
        + alias4((helpers.profitDom || (depth0 && depth0.profitDom) || alias2).call(alias1,(depth0 != null ? depth0.estimatedYearRate : depth0),{"name":"profitDom","hash":{},"data":data}))
        + "<span class=\"v3\">%</span></p>\r\n        <p>预期最高年化收益率</p>\r\n      </div>\r\n      <div class=\"colors\" id=\"chartColors\">\r\n        <p class=\"c4\"></p>\r\n        <p class=\"c3\"></p>\r\n        <p class=\"c2\"></p>\r\n        <p class=\"c1\"></p>\r\n      </div>\r\n    </div>\r\n    <div class=\"chart-data\">\r\n      <ul class=\"clearfix\">\r\n        <li class=\"d1\">\r\n          <p class=\"txt1\">"
        + alias4((helpers.startTxt || (depth0 && depth0.startTxt) || alias2).call(alias1,(depth0 != null ? depth0.type : depth0),{"name":"startTxt","hash":{},"data":data}))
        + "</p>\r\n          <p class=\"txt2\">"
        + alias4((helpers.startDate || (depth0 && depth0.startDate) || alias2).call(alias1,(depth0 != null ? depth0.purchaseStartDate : depth0),{"name":"startDate","hash":{},"data":data}))
        + "</p>\r\n        </li>\r\n        <li class=\"d2\">\r\n          <p class=\"txt1\">开赚</p>\r\n          <p class=\"txt2\">"
        + alias4((helpers.makeMoneyDate || (depth0 && depth0.makeMoneyDate) || alias2).call(alias1,(depth0 != null ? depth0.startDate : depth0),"top",{"name":"makeMoneyDate","hash":{},"data":data}))
        + "</p>\r\n        </li>\r\n        <li class=\"d3\" id=\"chartD3\" data-duration=\""
        + alias4(((helper = (helper = helpers.duration || (depth0 != null ? depth0.duration : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"duration","hash":{},"data":data}) : helper)))
        + "\">\r\n          <div class=\"d3-txt\" id=\"chartD3Txt\">\r\n            <p class=\"txt1\">理财期限</p>\r\n            <p class=\"txt4\"><span class=\"time-num\">"
        + alias4((helpers.durationDom || (depth0 && depth0.durationDom) || alias2).call(alias1,(depth0 != null ? depth0.duration : depth0),{"name":"durationDom","hash":{},"data":data}))
        + "</span></p>\r\n          </div>\r\n        </li>\r\n        <li class=\"d4\">\r\n          <p class=\"txt1\">收钱</p>\r\n          <p class=\"txt2\">"
        + alias4((helpers.collectMoneyDate || (depth0 && depth0.collectMoneyDate) || alias2).call(alias1,(depth0 != null ? depth0.endDate : depth0),"top",{"name":"collectMoneyDate","hash":{},"data":data}))
        + "</p>\r\n          <p class=\"txt3\">"
        + alias4((helpers.collectTip || (depth0 && depth0.collectTip) || alias2).call(alias1,(depth0 != null ? depth0.type : depth0),{"name":"collectTip","hash":{},"data":data}))
        + "</p>\r\n        </li>\r\n      </ul>\r\n    </div>\r\n  </div>\r\n  <div class=\"share\">\r\n    <ul class=\"clearfix\">\r\n      <li class=\"ico ico2\">"
        + alias4(((helper = (helper = helpers.viewCount || (depth0 != null ? depth0.viewCount : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"viewCount","hash":{},"data":data}) : helper)))
        + "人气</li>\r\n    </ul>\r\n  </div>\r\n</div>\r\n<div class=\"intro-attr\" data-purchase=\""
        + alias4(((helper = (helper = helpers.minimumPurchase || (depth0 != null ? depth0.minimumPurchase : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"minimumPurchase","hash":{},"data":data}) : helper)))
        + "\" data-profit=\""
        + alias4(((helper = (helper = helpers.estimatedYearRate || (depth0 != null ? depth0.estimatedYearRate : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"estimatedYearRate","hash":{},"data":data}) : helper)))
        + "\" data-duration=\""
        + alias4(((helper = (helper = helpers.duration || (depth0 != null ? depth0.duration : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"duration","hash":{},"data":data}) : helper)))
        + "\" id=\"productIntroAttr\">\r\n  <div class=\"title-bar\">\r\n    <div class=\"bank-logo\"><img src=\""
        + alias4(container.lambda(((stack1 = (depth0 != null ? depth0.bank : depth0)) != null ? stack1.icon : stack1), depth0))
        + "\"></div>\r\n    <h3 class=\"name\">"
        + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
        + "</h3>\r\n  </div>\r\n  <div class=\"attr\">\r\n    <form action=\"\">\r\n      <div class=\"info\">\r\n        <p class=\"profit\">预期年化收益：<span class=\"value1\">"
        + alias4((helpers.twoDecimals || (depth0 && depth0.twoDecimals) || alias2).call(alias1,(depth0 != null ? depth0.estimatedYearRate : depth0),{"name":"twoDecimals","hash":{},"data":data}))
        + "%</span></p>\r\n        <p class=\"lowest-deadline\">起购金额："
        + alias4(((helper = (helper = helpers.minimumPurchase || (depth0 != null ? depth0.minimumPurchase : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"minimumPurchase","hash":{},"data":data}) : helper)))
        + "万<span class=\"line\">|</span>理财期限："
        + alias4((helpers.durationDom || (depth0 && depth0.durationDom) || alias2).call(alias1,(depth0 != null ? depth0.duration : depth0),{"name":"durationDom","hash":{},"data":data}))
        + "</p>\r\n      </div>\r\n      <div class=\"surplus-time clearfix\">\r\n        "
        + alias4((helpers.countdownDom || (depth0 && depth0.countdownDom) || alias2).call(alias1,(depth0 != null ? depth0.countDown : depth0),{"name":"countdownDom","hash":{},"data":data}))
        + "\r\n      </div>\r\n      <div class=\"put-cont formCountProfit\" data-profit=\""
        + alias4(((helper = (helper = helpers.estimatedYearRate || (depth0 != null ? depth0.estimatedYearRate : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"estimatedYearRate","hash":{},"data":data}) : helper)))
        + "\">\r\n        <dl class=\"clearfix\">\r\n          <dt>购买金额：</dt>\r\n          <dd>\r\n            <p class=\"clearfix\">\r\n              <input type=\"text\" maxlength=\"11\" class=\"txt-input moneyInput\" data-defaultvalue=\""
        + alias4(((helper = (helper = helpers.minimumPurchase || (depth0 != null ? depth0.minimumPurchase : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"minimumPurchase","hash":{},"data":data}) : helper)))
        + "\" data-type=\"money\" placeholder=\"起购金额"
        + alias4(((helper = (helper = helpers.minimumPurchase || (depth0 != null ? depth0.minimumPurchase : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"minimumPurchase","hash":{},"data":data}) : helper)))
        + "万\" data-tipnoicon=\"2\" />\r\n              <span class=\"unit\">元</span>\r\n            </p>\r\n            <p class=\"tip\"></p>\r\n          </dd>\r\n        </dl>\r\n        <dl class=\"clearfix\">\r\n          <dt>认购期限：</dt>\r\n          <dd>\r\n            <p class=\"clearfix\">\r\n              "
        + alias4((helpers.durationValue || (depth0 && depth0.durationValue) || alias2).call(alias1,(depth0 != null ? depth0.duration : depth0),{"name":"durationValue","hash":{},"data":data}))
        + "\r\n              <span class=\"unit\">天</span>\r\n            </p>\r\n            <p class=\"tip\"></p>\r\n          </dd>\r\n        </dl>\r\n      </div>\r\n      <div class=\"btn-bar clearfix\">\r\n        <button type=\"button\" class=\"btn-submit\" id=\"countAnimate\">计算收益</button>\r\n      </div>\r\n    </form>  \r\n  </div>\r\n</div>\r\n\r\n";
    },"useData":true});
    })();
})