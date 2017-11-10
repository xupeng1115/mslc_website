define(["Handlebars"], function(Handlebars) {return (function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['bank-list'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.exist : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "                <li><a href=\"bank-product.html?sectionId="
    + alias4(((helper = (helper = helpers.sectionId || (depth0 != null ? depth0.sectionId : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"sectionId","hash":{},"data":data}) : helper)))
    + "\"><img src=\""
    + alias4(((helper = (helper = helpers.imageUrl || (depth0 != null ? depth0.imageUrl : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"imageUrl","hash":{},"data":data}) : helper)))
    + "\" /></a></li>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"item item-marquee\" id=\"bankListMarquee\">\r\n    <span class=\"prev\"></span>\r\n    <span class=\"next\"></span>\r\n    <div class=\"box\">\r\n        <ul class=\"clearfix\">\r\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.data : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        </ul>\r\n    </div>\r\n</div>\r\n\r\n";
},"useData":true});
})();})