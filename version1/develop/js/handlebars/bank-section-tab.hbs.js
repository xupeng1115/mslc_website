define(["Handlebars"], function(Handlebars) {return (function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['bank-section-tab'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.exist : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "                <li data-section=\""
    + alias2(alias1((depth0 != null ? depth0.sectionId : depth0), depth0))
    + "\">\r\n                    <p class=\"ico\"><span class=\"space\"></span><img src=\""
    + alias2(alias1((depth0 != null ? depth0.smallImageUrl : depth0), depth0))
    + "\" data-default=\""
    + alias2(alias1((depth0 != null ? depth0.smallImageUrl : depth0), depth0))
    + "\" data-hover=\""
    + alias2(alias1((depth0 != null ? depth0.selectedSmallImageUrl : depth0), depth0))
    + "\" /></p>\r\n                    <p class=\"txt\">"
    + alias2(alias1((depth0 != null ? depth0.title : depth0), depth0))
    + "</p>\r\n                    <span class=\"arrow\"></span>\r\n                </li>\r\n";
},"4":function(container,depth0,helpers,partials,data) {
    return "    <div class=\"ctrl\">\r\n        <p class=\"next\"><i></i></p>\r\n        <p class=\"prev\"><i></i></p>\r\n    </div>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {};

  return "<div id=\"bankMarquee\" class=\"bank-marquee\">\r\n    <div class=\"box\">\r\n        <ul>\r\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.data : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        </ul>\r\n    </div>\r\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.ctrl : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</div>\r\n\r\n";
},"useData":true});
})();})