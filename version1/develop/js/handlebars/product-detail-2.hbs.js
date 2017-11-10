define(["Handlebars"], function(Handlebars) {
    return (function() {
      var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
    templates['product-detail-2'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
        var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression, alias5=container.lambda;

      return "<p class=\"name\">"
        + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
        + "</p>\r\n<div class=\"table\">\r\n<ul class=\"clearfix\">\r\n  <li class=\"hasBG\">\r\n    <dl>\r\n      <dt>产品代码：</dt>\r\n      <dd>"
        + alias4(((helper = (helper = helpers.code || (depth0 != null ? depth0.code : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"code","hash":{},"data":data}) : helper)))
        + "</dd>\r\n    </dl>\r\n  </li>\r\n  <li class=\"hasBG\">\r\n    <dl>\r\n      <dt>理财币种：</dt>\r\n      <dd>"
        + alias4(((helper = (helper = helpers.currency || (depth0 != null ? depth0.currency : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"currency","hash":{},"data":data}) : helper)))
        + "</dd>\r\n    </dl>\r\n  </li>\r\n  <li class=\"hasBG\">\r\n    <dl>\r\n      <dt>产品类型：</dt>\r\n      <dd>"
        + alias4(((helper = (helper = helpers.investmentType || (depth0 != null ? depth0.investmentType : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"investmentType","hash":{},"data":data}) : helper)))
        + "</dd>\r\n    </dl>\r\n  </li>\r\n  <li>\r\n    <dl>\r\n      <dt>发行公司：</dt>\r\n      <dd>"
        + alias4(alias5(((stack1 = (depth0 != null ? depth0.bank : depth0)) != null ? stack1.name : stack1), depth0))
        + "</dd>\r\n    </dl>\r\n  </li>\r\n  <li>\r\n    <dl>\r\n      <dt>风险类型：</dt>\r\n      <dd>"
        + alias4(((helper = (helper = helpers.riskType || (depth0 != null ? depth0.riskType : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"riskType","hash":{},"data":data}) : helper)))
        + "</dd>\r\n    </dl>\r\n  </li>\r\n  <li>\r\n    <dl>\r\n      <dt>起售日：</dt>\r\n      <dd>"
        + alias4(((helper = (helper = helpers.purchaseStartDate || (depth0 != null ? depth0.purchaseStartDate : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"purchaseStartDate","hash":{},"data":data}) : helper)))
        + "</dd>\r\n    </dl>\r\n  </li>\r\n  <li class=\"hasBG\">\r\n    <dl>\r\n      <dt>销售银行：</dt>\r\n      <dd>"
        + alias4(alias5(((stack1 = (depth0 != null ? depth0.bank : depth0)) != null ? stack1.name : stack1), depth0))
        + "</dd>\r\n    </dl>\r\n  </li>\r\n  <li class=\"hasBG\">\r\n    <dl>\r\n      <dt>风险程度：</dt>\r\n      <dd>"
        + alias4(((helper = (helper = helpers.riskLevel || (depth0 != null ? depth0.riskLevel : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"riskLevel","hash":{},"data":data}) : helper)))
        + "</dd>\r\n    </dl>\r\n  </li>\r\n  <li class=\"hasBG\">\r\n    <dl>\r\n      <dt>停售日：</dt>\r\n      <dd>"
        + alias4(((helper = (helper = helpers.purchaseEndDate || (depth0 != null ? depth0.purchaseEndDate : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"purchaseEndDate","hash":{},"data":data}) : helper)))
        + "</dd>\r\n    </dl>\r\n  </li>\r\n  <li>\r\n    <dl>\r\n      <dt>预期收益：</dt>\r\n      <dd>"
        + alias4((helpers.twoDecimals || (depth0 && depth0.twoDecimals) || alias2).call(alias1,(depth0 != null ? depth0.estimatedYearRate : depth0),{"name":"twoDecimals","hash":{},"data":data}))
        + "%</dd>\r\n    </dl>\r\n  </li>\r\n  <li>\r\n    <dl>\r\n      <dt>起售金额：</dt>\r\n      <dd>"
        + alias4(((helper = (helper = helpers.minimumPurchase || (depth0 != null ? depth0.minimumPurchase : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"minimumPurchase","hash":{},"data":data}) : helper)))
        + "（万元）</dd>\r\n    </dl>\r\n  </li>\r\n  <li>\r\n    <dl>\r\n      <dt>起息日：</dt>\r\n      <dd>"
        + alias4((helpers.makeMoneyDate || (depth0 && depth0.makeMoneyDate) || alias2).call(alias1,(depth0 != null ? depth0.startDate : depth0),"bottom",{"name":"makeMoneyDate","hash":{},"data":data}))
        + "</dd>\r\n    </dl>\r\n  </li>\r\n  <li class=\"hasBG\">\r\n    <dl>\r\n      <dt>理财期限：</dt>\r\n      <dd>"
        + alias4((helpers.durationDom || (depth0 && depth0.durationDom) || alias2).call(alias1,(depth0 != null ? depth0.duration : depth0),{"name":"durationDom","hash":{},"data":data}))
        + "</dd>\r\n    </dl>\r\n  </li>\r\n  <li class=\"hasBG\">\r\n    <dl>\r\n      <dt>专属标志：</dt>\r\n      <dd>"
        + alias4(((helper = (helper = helpers.intendedCustomerType || (depth0 != null ? depth0.intendedCustomerType : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"intendedCustomerType","hash":{},"data":data}) : helper)))
        + "</dd>\r\n    </dl>\r\n  </li>\r\n  </li>\r\n  <li class=\"hasBG\">\r\n    <dl>\r\n      <dt>到期日：</dt>\r\n      <dd>"
        + alias4((helpers.collectMoneyDate || (depth0 && depth0.collectMoneyDate) || alias2).call(alias1,(depth0 != null ? depth0.endDate : depth0),"bottom",{"name":"collectMoneyDate","hash":{},"data":data}))
        + "</dd>\r\n    </dl>\r\n  </li>\r\n</ul>\r\n</div>";
    },"useData":true});
    })();
})