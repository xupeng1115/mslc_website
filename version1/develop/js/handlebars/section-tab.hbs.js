define(["Handlebars"], function(Handlebars) {
  return (function() {
    var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
    templates['section-tab'] = template({"1":function(container,depth0,helpers,partials,data) {
        var stack1;

      return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.exist : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
    },"2":function(container,depth0,helpers,partials,data) {
        var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

      return "                <li class=\"section"
        + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
        + "\" data-section=\""
        + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
        + "\">\r\n                    <p class=\"ico\"></p>\r\n                    <p class=\"txt\">"
        + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
        + "</p>\r\n                    <span class=\"arrow\"></span>\r\n                </li>\r\n";
    },"4":function(container,depth0,helpers,partials,data) {
        return "    <div class=\"ctrl\">\r\n        <p class=\"next\"><i></i></p>\r\n        <p class=\"prev\"><i></i></p>\r\n    </div>\r\n";
    },"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
        var stack1, alias1=depth0 != null ? depth0 : {};

      return "<div id=\"sectionMarquee\">\r\n    <div class=\"box\">\r\n        <ul>\r\n"
        + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.data : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
        + "        </ul>\r\n    </div>\r\n"
        + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.ctrl : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
        + "</div>\r\n\r\n";
    },"useData":true});
  })();
})
