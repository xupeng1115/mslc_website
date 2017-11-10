
var Validate = function(){}

//tip信息(注册页形式)
Validate.prototype.tipFuc = function(element,tip,isOK){
  var $tip = element.parents("dl").find('.tip');
  var $complexity = element.parents("dl").find('.complexity');
  if($complexity){
  	$complexity.hide();
  }

  if(isOK){
  	$tip.removeClass("wrong").addClass('right').text(tip);
  }else{
  	$tip.removeClass("right").addClass("wrong").text(tip);
  } 
}

//tip信息(登录页形式)
Validate.prototype.tipFucLogin = function(element,tip){
    var left,top,tips,tipWidth,tipHeight,elementLeft,elementTop,$formTips,$element;

    tips = '<p class="form-tips" id="formTips"><span class="msg">'+tip+'</span><span class="arrow"></span></p>';
    if($("#formTips")){
      $("#formTips").remove();
    }
    $("body").append(tips);
    if(element[0].tagName=="INPUT"){
      $element = element;
      $element.on("focus",emptyTip);
    }else{
      $element = element.find("input[type='text'],input[type='password']").eq(0);
      element.find("input[type='text'],input[type='password']").on("focus",emptyTip);
    }

    $formTips = $("#formTips");
    tipWidth = $formTips.outerWidth();
    tipHeight = $formTips.outerHeight();
    elementWidth = $element.outerWidth();
    elementLeft = $element.offset().left;
    elementTop = $element.offset().top;
    left = elementLeft+(elementWidth-tipWidth)/2;
    top = elementTop-tipHeight-9;

    $formTips.css({"left":left,"top":top,"display":"block"});

    function emptyTip(){
    	$formTips.remove();
    }
}


//非空验证
Validate.prototype.isNull = function(element,tip,callback){
	var val = element.val();
	if(val==""){
		callback(element,tip);
		return false;
	}
	return true;
}

//唯一性验证
Validate.prototype.remote = function(element,url,tip,callback){
	var val = element.val();
	var isHadUsername = true;
	var name = element.attr("name");
	var sendData = {};
	sendData[name] = val;
	$.ajax({
      url: url,
      async: false,
      type: 'post',
      dataType: 'text',
      data: sendData,
      success:function(data) {
        if(data=="false"){
        	callback(element,tip);
          isHadUsername = false;
        }
      }
  })
  return isHadUsername;
}

//手机格式验证
Validate.prototype.isMobile = function(element,callback){
  var val = element.val();
  var reg = /^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
  var tip = "请输入11位有效手机号码";
  if(!reg.test(val)){
    callback(element,tip)
    return false;
  }
  return true;
}

//密码格式验证
Validate.prototype.isPsd = function(element,callback){
	var val = element.val();
	var reg = /^[\w~!@#$^&*()=|{}':;',\[\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]{6,15}$/;
	var tip = "请输入6-15位数字、字母组成的密码";
	if(!reg.test(val)){
    callback(element,tip);
    return false;
  }
  return true;
}

//字符是否相同验证
Validate.prototype.isTheSame = function(element1,element2,tip,callback){
	var val1 = element1.val();
	var val2 = element2.val();
	element2.addClass('isTheSame');
	if(val2!==val1){
		callback(element1,tip);
		return false;
	}
	return true;
}

//身份证验证(非严格模式)
Validate.prototype.isCardNo = function(element,callback){
  var val = element.val();
  var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/; 
  var tip = "请输入正确格式的身份证号";
  if(!reg.test(val)){ 
    callback(element,tip);
    return  false;  
  }
  return true;
}

//中文验证
Validate.prototype.isChinese = function(element,callback){
  var val = element.val();
  var reg = /^[\u4E00-\u9FFF]+$/; 
  var tip = "请输入中文姓名";
  if(!reg.test(val)){ 
    callback(element,tip);
    return  false;
  }
  return true;
}

