define('mashanglcValidate',['mashanglc'],function(mashanglc){

	var valiateExecute = {
		//取消函数
    	cancelFn : function(element,tipClass){
	        var tipElement = this.findTip(element,tipClass);
	        this.hideTipFn(element,tipElement);
	    },

	    //验证单个rule
	    resultRule : function(ifMethod,element,ruleTip,tipElement){
	        if(ifMethod){
	            this.shouTipFn(element,ruleTip,tipElement);
	            return false;
	        }else{
	            this.shouTipFn(element,ruleTip,tipElement,"ok");
	            return true;
	        }
	    },

	    //查找tip所在dom
	    findTip : function(element,tipClass){
	        var tipElement,tipClassName;
	        var parent0 = element.parent();
	        var parent1 = parent0.parent();
	        var parent2 = parent1.parent();

	        if(tipClass){//最多向父级查找三层
	            tipClassName = "."+tipClass;

	            if(parent0.find(tipClassName).length){
	                tipElement = parent0.find(tipClassName);
	            }else if(parent1.find(tipClassName).length){

	                tipElement = parent1.find(tipClassName);
	            }else if(parent2.find(tipClassName).length){

	                tipElement = parent2.find(tipClassName);
	            }
	        }

	        return tipElement || parent0;
	    },

	    //显示tip
	    shouTipFn : function(element,ruleTip,tipElement,isOK){
	        var tipSpanHtml = '<span class="validate-tip"></span>';
	        var tipSpan;
            var tipNoIcon = element.data("tipnoicon");

	        if(!tipElement.find(".validate-tip").length){
	            tipElement.append(tipSpanHtml);
	        }

	        tipSpan = tipElement.find(".validate-tip");

            if(tipNoIcon==2){
                tipSpan.addClass('validate-tip-no-icon');
            }

            if(tipNoIcon==1){
                tipSpan.addClass('validate-tip-no-true-icon');
            }

	        if(isOK=="ok"){
	            tipSpan.addClass('validate-true').removeClass('validate-false').text("");
	        }else{
	            tipSpan.addClass('validate-false').removeClass('validate-true').text(ruleTip);
	        }
	    },

	    //隐藏tip
	    hideTipFn : function(element,tipElement){
	        var tipSpan = tipElement.find(".validate-tip");
	        if(tipSpan.length){
	            tipSpan.removeClass('validate-false validate-true').text("");
	        }
	    }
	}

	var Validate = function(){};
	
    Validate.defaultRules = {
        required      : "该字段不能为空",
        maxlength     : "该字段长度不能大于",
        minlength     : "该字段长度不能小于", 
        password      : "请输入6-15位数字、字母组成的密码",
        repeat        : "两次输入不一致",
        number        : "必须输入数字",
        url           : "输入的URL格式不正确",
        idCard        : "请输入15位或18位有效的身份证号",
        mobile        : "请输入11位有效手机号码",
        email         : "输入的邮箱格式不正确"
    }

	Validate.prototype = {
		//非空验证
        'required' : function(element,rule,tipElement){
            var value = mashanglc.trim(element.val());
            var ruleTip = rule.ruleTip || Validate.defaultRules.required;
            var result = valiateExecute.resultRule(!value,element,ruleTip,tipElement);
            return result;
        },
        //最小长度验证
        'minlength' : function(element,rule,tipElement){
            var value = mashanglc.trim(element.val());
            var ruleTip = rule.ruleTip || Validate.defaultRules.minlength+rule.ruleLimit+"位";
            var ifMethod = (value.length<rule.ruleLimit)?true:false;
            var result = valiateExecute.resultRule(ifMethod,element,ruleTip,tipElement);
            return result;
        },
        //最大长度验证
        'maxlength' : function(element,rule,tipElement){
            var value = mashanglc.trim(element.val());
            var ruleTip = rule.ruleTip || Validate.defaultRules.maxlength+rule.ruleLimit+"位";
            var ifMethod = (value.length>rule.ruleLimit)?true:false;
            var result = valiateExecute.resultRule(ifMethod,element,ruleTip,tipElement);
            return result;
        },
        //验证密码格式
        'password' : function(element,rule,tipElement){
            var value = element.val();
            var ruleTip = rule.ruleTip || Validate.defaultRules.password;
            var reg = /^[\w~!@#$^&*()=|{}':;',\[\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]{6,15}$/;
            var ifMethod = !reg.test(value);
            var result = valiateExecute.resultRule(ifMethod,element,ruleTip,tipElement);
            return result;
        },
        //两次输入是否一致
        'repeat' : function(element,rule,tipElement){
            var valueSelf = element.val();
            var valueTo = rule.ruleLimit.val();
            var ruleTip = rule.ruleTip || Validate.defaultRules.repeat;
            var ifMethod = (valueSelf!=valueTo)?true:false;
            var result = valiateExecute.resultRule(ifMethod,element,ruleTip,tipElement);
            return result;
        },
        //验证数字
        'number' : function(element,rule,tipElement){
            var value = element.val();
            var ruleTip = rule.ruleTip || Validate.defaultRules.number;
            var regTxt,reg;
            if(rule.ruleLimit && rule.ruleLimit>0){
                regTxt = "^(\\d*|\\d\+\.?\\d{1,"+rule.ruleLimit+"})$";
            }else if(rule.integerLimit && rule.integerLimit>0 && rule.decimalLimit){
                regTxt = "^(\\d{0,"+rule.integerLimit+"}|(\\d{1,"+rule.integerLimit+"}[.]\\d{1,"+rule.decimalLimit+"}))$";
            }else{
                regTxt = "^[0-9]*$";
            }

            var reg = new RegExp(regTxt);
            var ifMethod = !reg.test(value);
            var result = valiateExecute.resultRule(ifMethod,element,ruleTip,tipElement);
            return result;
        },
        //邮箱格式验证
        'email' : function(element,rule,tipElement){
            var value = element.val();
            var ruleTip = rule.ruleTip || Validate.defaultRules.email;
            var reg = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
            var ifMethod = !reg.test(value);
            var result = valiateExecute.resultRule(ifMethod,element,ruleTip,tipElement);
            return result;
        },
        //验证url
        'url' : function(element,rule,tipElement){
            var value = element.val();
            var ruleTip = rule.ruleTip || Validate.defaultRules.url;
            var strRegex = "^((https|http|ftp|rtsp|mms)?://)"
                         +"?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?"
                         +"(([0-9]{1,3}.){3}[0-9]{1,3}"
                         +"|"
                         +"([0-9a-z_!~*'()-]+.)*"
                         +"([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]."
                         +"[a-z]{2,6})"
                         +"(:[0-9]{1,4})?"
                         +"((/?)|"
                         +"(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$"
            var reg=new RegExp(strRegex);
            var ifMethod = !reg.test(value);
            var result = valiateExecute.resultRule(ifMethod,element,ruleTip,tipElement);
            return result;
        },
        //手机号码验证
        'mobile' : function(element,rule,tipElement){
            var value = element.val();
            var ruleTip = rule.ruleTip || Validate.defaultRules.mobile;
            var reg = /^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
            var ifMethod = !reg.test(value);
            var result = valiateExecute.resultRule(ifMethod,element,ruleTip,tipElement);
            return result;
        },
        //身份证验证
        'idCard' : function(element,rule,tipElement){
            var value = element.val();
            var ruleTip = rule.ruleTip || Validate.defaultRules.idCard;
            var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/; 
            var ifMethod = !reg.test(value);
            var result = valiateExecute.resultRule(ifMethod,element,ruleTip,tipElement);
            return result;
        }
	};

	//验证函数
    var MashanglcValidate = function(){
    	this.valiate = new Validate();
    };

    MashanglcValidate.prototype = {
    	//增加自定义验证
	    addValidate : function(options){
	    	var self = this;
	        Validate.prototype[options.ruleName] = function(element,rule,tipElement){
	            var ruleResult = options.ruleFn(element);
	            var ruleTip  = options.ruleTip || "请输入验证文本";
	            var result = valiateExecute.resultRule(ruleResult,element,ruleTip,tipElement)
	            return result;
        	}
        },
        //执行验证
        executeRule : function(element,rules,tipElement){
            var fn;
            for(var i=0;i<rules.length;i++){
                for(var j in this.valiate){
                    if(j==rules[i].ruleName){
                        fn = this.valiate[j](element,rules[i],tipElement);
                        if(!fn){
                            return false;
                        }
                    }
                }
            }

            return true;
        },
        //创建验证
        install:function(validateAll,callback,otherFn){
        	var validateElement = validateAll.validateElement;
            var tipClass = validateAll.tipClass;
        	var valiateResult;
        	var self = this;

            valiateResult = validateElement.every(function(item,index,array){
                var tipElement = valiateExecute.findTip(item.element,tipClass);
                var currentValiateResult;
                if(validateAll.method=="blur"){
                    item.element.on("blur",function(){
                        currentValiateResult = self.executeRule(this,item.rules,tipElement);
                    })
                }else{
                    currentValiateResult = self.executeRule(item.element,item.rules,tipElement);
                }

                return currentValiateResult;
            })

            validateElement.forEach(function(item,index,array){
                item.element.on("keydown",function(){
                    var keydownTipElement = valiateExecute.findTip($(this),tipClass);
                    valiateExecute.hideTipFn($(this),keydownTipElement);
                })
            });

	        if(valiateResult){
	            callback && callback();
	        }else{
                otherFn && otherFn();
            }
        }
    }

	return MashanglcValidate;
})

