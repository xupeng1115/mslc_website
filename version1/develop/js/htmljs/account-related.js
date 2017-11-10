define(["mashanglc","mashanglcValidate","jqCookie"], function(mashanglc,mashanglcValidate) {
    return function(){
        var $mainCont = $(".main-content")
        var accountRelated = {
            loginFn:function(){
                var $username = $("#formLogin").find(".username");
                var $password = $("#formLogin").find(".password");
                var $autoLogin = $("#formLogin").find(".autoLogin");

                var user = {
                    username : $.cookie("username") || ""
                };

                $username.val(user.username);

                $("#formLogin").on("focus",".username, .password",function(){
                    $(".suspended-tip").remove();
                })

                $("#btnSubmit").on("click",function(){
                    var username = $username.val();
                    var password = $password.val();

                    if(username!="" && password!=""){
                        $.ajax({
                            type:"POST",
                            url:mashanglc.api.login,
                            data:{
                                username : username,
                                password : mashanglc.md5String(password)
                            },
                            success:function(res){
                                mashanglc.errorCode({
                                    data:res,
                                    noTip:true,
                                    diyFn:function(){
                                        mashanglc.suspendedTips($username,res.data.msg);
                                    }
                                },function(){
                                    $.cookie("username",username,{expires:30});
                                    if($autoLogin[0].checked){
                                        $.cookie("sessionKey",res.data.sessionKey,{path: '/',expires:30});
                                    }else{
                                        $.cookie("sessionKey",res.data.sessionKey,{path: '/'});
                                    }
                                    
                                    location.href = mashanglc.goToUrl;
                                })
                            }
                        })
                    }else{
                      mashanglc.suspendedTips($username,"请输入用户名和密码");
                    }

                    return false;
                })
            },
            registerFn:function(){
                var $username = $("#formRegister").find(".username");
                var $password1 = $("#formRegister").find(".password1");
                var $password2 = $("#formRegister").find(".password2");
                var $mobileCode = $("#formRegister").find(".mobile-code");
                var $allInput = $("#formRegister").find('.username, .password1, .password2, .mobile-code');
                var $complexity = $("#formRegister").find(".complexity");
                var $sendMobileCode = $("#sendMobileCode");
                var $btnSubmit = $("#btnSubmit");
                var $agreementCheck = $("#agreementCheck");
                

                var validate = new mashanglcValidate();

                var validateAll = {
                    tipClass:"tip",
                    validateElement:[
                        {
                            element:$username,
                            rules:[
                                {
                                    ruleName:"required"
                                },
                                { 
                                    ruleName:"mobile"
                                }
                            ]
                        },
                        {
                            element:$password1,
                            rules:[
                                {
                                    ruleName:"required"
                                },
                                {
                                    ruleName:"password"
                                }
                            ]
                        },
                        {
                            element:$password2,
                            rules:[
                                {
                                    ruleName:"required"
                                },
                                {
                                    ruleName:"repeat",
                                    ruleLimit:$password1
                                }
                            ]
                        },
                        {
                            element:$mobileCode,
                            rules:[
                                {
                                    ruleName:"required"
                                }
                            ]
                        }
                    ]
                };

                var agreementEvent = function(){
                    var $showAgreement = $("#showAgreement");
                    var $popAgreement = $("#popAgreement");
                    var $agreementPopCheck = $popAgreement.find(".check-bar .checkbox");

                    $showAgreement.on("click",function(){
                        mashanglc.popUpPosition($("#popAgreement"));
                        $agreementPopCheck[0].checked = $agreementCheck[0].checked;
                    });

                    $agreementPopCheck.on("click",function(){
                        $agreementCheck[0].checked = this.checked;
                    });

                    $popAgreement.on("click",".close,.btn",function(){
                        $popAgreement.hide().css("opacity",0);
                    });
                };

                agreementEvent();

                //获取表单所有input值
                var getValue = function(){
                    var value = {
                        username : $username.val(),
                        password1 : $password1.val(),
                        password2 : $password2.val(),
                        mobileCode : $mobileCode.val()
                    };
                    return value;
                };

                //获取验证码
                $sendMobileCode.on("click",function(){
                    if($(this).hasClass('disable')){
                        return false;
                    }
                    var mobileValidate = {
                        tipClass:"tip",
                        validateElement:[
                            {
                                element:$username,
                                rules:[
                                    {
                                        ruleName:"required"
                                    },
                                    { 
                                        ruleName:"mobile"
                                    }
                                ]
                            }
                        ]
                    };
                    validate.install(mobileValidate,function(){
                        $sendMobileCode.addClass('send');
                        mashanglc.sendMobileCode({
                            mobile:$username.val()
                        });
                        mashanglc.MobileCodeCountdown($sendMobileCode,60);
                    });
                });

                //更新注册按钮状态
                $allInput.on("keyup",function(){
                    var value = getValue();
                    if(value.username!="" && value.password1!="" && value.password2!="" && value.mobileCode!=""){
                        $btnSubmit.removeClass('disable');
                    }else{
                        $btnSubmit.addClass('disable');
                    }

                    if($(this).hasClass('password1')){
                        $complexity.show();
                        mashanglc.passwordStrength($password1,$complexity);
                    }
                });

                //注册验证及提交
                $btnSubmit.on("click",function(){
                    
                    if($(this).hasClass('disable')){
                        return false;
                    }

                    // if(!$sendMobileCode.hasClass('send')){
                    //     mashanglc.mPopUp({
                    //         msg:"请先获取验证码"
                    //     })
                    //     return false;
                    // }

                    //验证
                    validate.install(validateAll,function(){
                        if(!$agreementCheck[0].checked){
                            mashanglc.mPopUp({
                                msg:"为了保障您的合法权益，请注册<br />前先阅读并同意马上理财用户协议"
                            });
                            return false;
                        }

                        //提交注册
                        $.ajax({
                            type:"POST",
                            url:mashanglc.api.register,
                            data:{
                                phone : $username.val(),
                                password : mashanglc.md5String($password1.val()),
                                confirmPassword : mashanglc.md5String($password2.val()),
                                code : $mobileCode.val() 
                            },
                            success:function(response){
                                mashanglc.errorCode({
                                    data:response
                                },function(){
                                    $.cookie("sessionKey",response.data.sessionKey,{path: '/'});
                                    location.href = mashanglc.goToUrl;
                                })
                            }
                        });
                    },function(){

                        var $errorTip = $password1.parents("dl").find('.validate-tip');
                        if($errorTip.hasClass('validate-false')){
                            $complexity.hide();
                        }
                    });

                    return false;
                });
            },
            retrievePasswordFn:function(){
                var $formCont = $("#formCont");
                var validate = new mashanglcValidate();
                var usernameValue,mobileCode;

                //step1
                function step1(){
                    $formCont.load("retrieve-ajax1.html?v=_WEBSITE_VERSION_",function(){
                        var $username = $formCont.find(".username");
                        var $code = $formCont.find(".code");
                        var $updataCode = $formCont.find(".update-code");
                        var $submit = $formCont.find(".btn-submit");
                        var validateAll = {
                            tipClass:"tip",
                            validateElement:[
                                // {
                                //     element:$code,
                                //     rules:[
                                //         {
                                //             ruleName:"required"
                                //         }
                                //     ]
                                // },
                                {
                                    element:$username,
                                    rules:[
                                        {
                                            ruleName:"required"
                                        },
                                        { 
                                            ruleName:"mobile"
                                        }
                                    ]
                                }
                            ]
                        };

                        $mainCont.removeClass('step2').addClass('step1');

                        if(usernameValue){
                            $username.val(usernameValue);
                        }

                        $submit.on("click",function(){
                            validate.install(validateAll,function(){
                                $.post(mashanglc.api.retrieveStep1,{
                                    mapcode:$code.val(),
                                    phone:$username.val()
                                },function(response){
                                    if(response.data.status!=0){
                                        mashanglc.mPopUp({
                                            msg:response.data.msg
                                        })
                                    }else{
                                        mashanglc.sendMobileCode({
                                            mobile:$username.val(),
                                            reasonType:2
                                        },function(){
                                            usernameValue = $username.val();
                                            step2();
                                        })
                                    }
                                })
                            });
                            return false;
                        })
                    })
                }
                
                //step2
                function step2(){
                    $formCont.load("retrieve-ajax2.html?v=_WEBSITE_VERSION_",function(){
                        var $username = $formCont.find('.username');
                        var $code = $formCont.find('.code');
                        var $btnPrev = $formCont.find('.btn-prev');
                        var $btnSubmit = $formCont.find('.btn-submit');
                        var $btnCode = $formCont.find('.btn-code');

                        $mainCont.removeClass('step1').addClass('step2');

                        var validateAll = {
                            tipClass:"tip",
                            validateElement:[
                                {
                                    element:$code,
                                    rules:[
                                        {
                                            ruleName:"required"
                                        }
                                    ]
                                }
                            ]
                        };

                        $username.text(usernameValue.substr(0,3)+"****"+usernameValue.substr(7,4));

                        $btnCode.on("click",function(){
                            mashanglc.sendMobileCode({
                                mobile:usernameValue,
                                reasonType:2
                            });
                            mashanglc.MobileCodeCountdown($sendMobileCode,60);
                        })

                        $btnPrev.on("click",function(){
                            step1();
                        })

                        $btnSubmit.on("click",function(){
                            validate.install(validateAll,function(){
                                $.post(mashanglc.api.retrieveStep2,{
                                    isDelete:0,
                                    phone:usernameValue,
                                    code:$code.val()
                                },function(response){
                                    mashanglc.errorCode({
                                        data:response
                                    },function(){
                                        mobileCode = $code.val();
                                        step3();
                                    })
                                })
                            });
                            
                            return false;
                        })
                    })
                }

                //step3
                function step3(){
                    $formCont.load("retrieve-ajax3.html?v=_WEBSITE_VERSION_",function(){
                        var $password1 = $formCont.find('.password1');
                        var $password2 = $formCont.find('.password2');
                        var $btnSubmit = $formCont.find('.btn-submit');
                        var $complexity = $formCont.find('.complexity');

                        $mainCont.removeClass('step2').addClass('step3');

                        var validateAll = {
                            tipClass:"tip",
                            validateElement:[
                                {
                                    element:$password1,
                                    rules:[
                                        {
                                            ruleName:"required"
                                        },
                                        {
                                            ruleName:"password"
                                        }
                                    ]
                                },
                                {
                                    element:$password2,
                                    rules:[
                                        {
                                            ruleName:"required"
                                        },
                                        {
                                            ruleName:"repeat",
                                            ruleLimit:$password1
                                        }
                                    ]
                                }
                            ]
                        };

                        //密码修改成功提示
                        var success = function(){
                            var popTxt = '<div class="m-pop-up m-pop-psdSuccess" id="popPsdSuccess"><div class="m-pop-mask"></div><div class="m-pop-cont"><div class="close"></div><div class="content"><p class="ico-success"><img src="/img/account-related/ico-success.png"></p><p class="txt-success">您的密码修改成功，请牢记新密码！</p><p class="tip-jump"><span class="value">3</span>秒后自动跳转到登录页面</p><div class="button-bar"><a href="login.html" class="btn">重新登录</a></div></div></div></div>';
                            var $content,timer;
                            var value = 2;
                            $("body").append(popTxt);
                            $content = $("#popPsdSuccess").find(".content");

                            mashanglc.popUpPosition($("#popPsdSuccess"))

                            //页面跳转倒计时
                            timer = setInterval(function(){
                                $content.find(".value").text(value)
                                value--;
                                if(value<0){
                                    clearInterval(timer);
                                    window.location.href = "login.html";
                                }
                            },1000)

                            //单击关闭按钮执行页面跳转
                            $("#popPsdSuccess .close").on("click",function(){
                                window.location.href = "login.html";
                            })
                        }

                        $password1.on("keyup",function(){
                            $complexity.show();
                            mashanglc.passwordStrength($password1,$complexity);
                        })

                        $btnSubmit.on("click",function(){
                            validate.install(validateAll,function(){
                                $.post(mashanglc.api.retrieveStep3,{
                                    code:mobileCode,
                                    phone:usernameValue,
                                    isDelete:1,
                                    password:mashanglc.md5String($password1.val()),
                                    confirmPassword:mashanglc.md5String($password2.val())
                                },function(response){
                                    mashanglc.errorCode({
                                        data:response
                                    },function(){
                                        success();
                                    })
                                })
                            },function(){
                                var $errorTip = $password1.parents("dl").find('.validate-tip');
                                if($errorTip.hasClass('validate-false')){
                                    $complexity.hide();
                                }
                            });
                        })
                    })
                }
                
                step1();
            }
        }
        if($mainCont.hasClass('p-login')){
            accountRelated.loginFn();
        }else if($mainCont.hasClass('p-register')){
            accountRelated.registerFn();
        }else if($mainCont.hasClass('p-retrieve-password')){
            accountRelated.retrievePasswordFn();
        }
    }();
})
