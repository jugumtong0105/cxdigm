(function($){
    $.fn.totalAni = function () {
        return this.each(function () {
            var $this = $(this);
            var line = $this.find('.line');
            var mo = $('body').hasClass('mobile');
            
            $this.on('mouseover', function(){

                line.each(function(){
                    var $tt = $(this);
                    if($tt.hasClass("bottom")){
                        if(mo){
                            $tt.css({
                                'transform':'rotate(-21deg) translate(1px, 5px)',
                                'transform-origin' : 'left bottom',
                            });
                        }else {
                            $tt.css({
                                'transform':'rotate(-25deg) translate(1px, 3px)',
                                'transform-origin' : 'left bottom',
                            });
                        }
                        
                    }else {
                        if(mo){
                            $tt.css({
                                'transform':'rotate(21deg) translate(1px, 0px)',
                                'transform-origin' : 'left bottom',
                            });
                        }else {
                            $tt.css({
                                'transform':'rotate(21deg) translate(-3px, -7px)',
                                'transform-origin' : 'left bottom',
                            });
                        }
                        
                    }
                });

            });
            $this.on('mouseleave', function(){
                line.css({
                    'transform':'rotate(0deg)'
                });
            });
        });
    };

    $.fn.typingTxt = function(options){
        
        var settings = $.extend({
            remove: true,
            content: "",
            contentMobile: "",
            strok: "strok",
            isStrok : true,
            strokNum : [],
            target: ".main-txt",
            time: 0,
            bold: "bold",
            isBold : false,
            boldNum : []
        }, options);

        return this.each(function(){
            var $this = $(this);
            var bd = $('body');
            let content = "";
            
            if(bd.hasClass('mobile')){
                content = settings.contentMobile;
            }else{
                content = settings.content;
            }
            
            const txt = document.querySelector(settings.target);
            var fadeSec = 0.5;
            var animSpeed = 25;

            const changeLineBreak = (letter) => {
                return letter.map(text => text === "\n" ? "<br>" : text);
            }

            const typing = function(){
                const letter = changeLineBreak(content.split(""));
                
                for(var i = 0; i < letter.length; i++){
                    if(settings.isStrok){
                        if(i>=settings.strokNum[0] && i<settings.strokNum[1]){
                            var s = "<span id='"+i+"' class='"+ settings.strok +"' style='animation:charAnim " + fadeSec + "s linear " + i/animSpeed + "s forwards;'>"+letter[i]+"</span>";    
                        }else {
                            var s = "<span id='"+i+"' style='animation:charAnim " + fadeSec + "s linear " + i/animSpeed + "s forwards;'>"+letter[i]+"</span>";
                        }
                    }else if(settings.isBold){
                        if(i==settings.boldNum[0] || i==settings.boldNum[1]){
                            var s = "<span id='"+i+"' class='"+ settings.bold +"' style='animation:charAnim " + fadeSec + "s linear " + i/animSpeed + "s forwards;'>"+letter[i]+"</span>";    
                        }else {
                            var s = "<span id='"+i+"' style='animation:charAnim " + fadeSec + "s linear " + i/animSpeed + "s forwards;'>"+letter[i]+"</span>";
                        }
                    }else {
                        var s = "<span id='"+i+"' style='animation:charAnim " + fadeSec + "s linear " + i/animSpeed + "s forwards;'>"+letter[i]+"</span>";
                    }
                    var node = document.createElement("span");
                    node.innerHTML = s;
                    
                    txt.appendChild(node);
                }
            }

            const typingRemove = function(start, end){
                
                let spanArr = $this.find('>span');
                
                spanArr.each(function(index){
                    let $tt = $(this);
                    
                    (function(x){
                        setTimeout(function(){
                            if(index >= start && index < end) {
                                $tt.css('display', 'none');
                            }
                            
                        },x*100);
                        
                    })(index);
                });

            }

            setTimeout(function(){
                typing();
                if(settings.remove){
                    setTimeout(function(){
                        typingRemove(11, 18);
                    }, 6000);
                }else {

                }
                
                
            }, settings.time);
            
        });
    };

    $.fn.sloganMove = function(options){
        
        var settings = $.extend({
            delayTime: 0,
        }, options);

        return this.each(function(){
            let $this = $(this);
            setTimeout(function(){
                $this.addClass('move');
            },settings.delayTime);
        });
    };

    $.fn.totalMove = function(){
        return this.each(function(){
            var $this = $(this);
            var $link = $this.find('>a');
            var $target = $this.find('.total-menu-cont');
            var close = $(this).find('.close');
            var alinks = $(this).find('.menu-alink');
            // var alinks2 = $(this).find('.menu-alink.menu02');
            // var alinks3 = $(this).find('.menu-alink.menu03');
            $link.on('click', function(){
                $target.removeClass('revers');
                $target.addClass('fade');
                alinks.each(function(index){
                    var tt = $(this);
                    if(index==0){
                        setTimeout(function(){
                            tt.addClass('up');
                        },800);    
                    }else {
                        setTimeout(function(){
                            tt.addClass('up');
                        },800+ 280*((index+1)/3));
                    }
                    
                    
                });
                // alinks.typingTxt({
                //     remove: false,
                //     content: "About us",
                //     contentMobile: "About us",
                //     strok: "",
                //     isStrok: false,
                //     target: ".menu01",
                //     time: 1000,
                //     bold: "bold",
                //     isBold : false,
                //     boldNum : [0, 9]
                // });
                // alinks2.typingTxt({
                //     remove: false,
                //     content: "eXperience ",
                //     contentMobile: "eXperience ",
                //     strok: "",
                //     isStrok: false,
                //     target: ".menu02",
                //     time: 1000,
                //     bold: "bold",
                //     isBold : false,
                //     boldNum : [0, 9]
                // });
                // alinks3.typingTxt({
                //     remove: false,
                //     content: "Contact",
                //     contentMobile: "Contact",
                //     strok: "",
                //     isStrok: false,
                //     target: ".menu03",
                //     time: 1000,
                //     bold: "bold",
                //     isBold : false,
                //     boldNum : [0, 9]
                // });

                close.on('click', function(){
                    $target.addClass('revers');
                    $target.removeClass('fade');
                    alinks.removeClass('up');
                });
            });
        });
    };

    $.fn.tabMenu = function(){
        return this.each(function(){
            var $this = $(this);
            var $tabMenus = $this.find('>.tab-header>.tab-menu');
            var $tabPanel = $this.find('.tab-panel');
            $tabMenus.each(function(){
                let tt = $(this);
                var target = tt.attr('aria-controls');
                tt.on('click', function(){
                    $tabMenus.addClass('off');
                    tt.removeClass('off');
                    $tabPanel.each(function(){
                        var ttt = $(this);
                        var ids = ttt.attr('id');
                        if(target == ids){
                            ttt.show();
                        }else {
                            ttt.hide();
                        }
                    });


                });
            });
        });
    };

    $.fn.linkLine = function(){
        return this.each(function(){
            var $this = $(this);
            var target = $this.find('.menu-alink');
            target.each(function(){
                var tt = $(this);
                tt.on('mouseenter', function(){
                    tt.addClass('over');
                    tt.removeClass('out');
                });
                tt.on('mouseleave', function(){
                    tt.removeClass('over');
                    tt.addClass('out')
                });
            });
        });
    }

})(jQuery);


function isMobile(){
    // userAgent 문자열 가져오기
    const userAgent = navigator.userAgent.toLowerCase();

    // 모바일 기기 여부 확인
    const isMobile = /android|webos|iphone|ipad|ipod|blackberry|windows phone/i.test(userAgent);

    // 모바일 기기인 경우
    if (isMobile) {
    // 모바일 기기용 코드 실행
    
    document.querySelector('body').classList.add('mobile');

    } else {
    // PC 기기용 코드 실행
    
    }
}


document.addEventListener("DOMContentLoaded", function (e) {
    isMobile();
    $('.total-menu-list').linkLine();
    $('.tabWrap').tabMenu();
    $('.total-menu').totalAni();
    $('.main-txt').typingTxt({
        remove: true,
        content: "Hello :) \n We are CXDIGM",
        contentMobile: "Hello :) \n We are CXDIGM",
        strok: "strok",
        isStrok: true,
        strokNum: [20,25],
        target: ".main-txt",
        time: 0,
        bold: "bold",
        isBold : false,
        boldNum : [0, 9]
    });
    $('.main-slogan').typingTxt({
        remove: false,
        content: "Change, eXperience Paradigm",
        contentMobile: "Change, eXperience Paradigm",
        strok: "",
        isStrok: false,
        strokNum: [],
        target: ".main-slogan",
        time: 2000,
        bold: "bold",
        isBold : true,
        boldNum : [0, 9]
    });
    $('.desc-title').typingTxt({
        remove: false,
        content: "사용자경험의 새로운 패러다임을 만듭니다.",
        contentMobile: "사용자경험의 \n 새로운 패러다임을 \n 만듭니다.",
        strok: "",
        isStrok: false,
        strokNum: [],
        target: ".desc-title",
        time: 8000,
        bold: "bold",
        isBold : false,
        boldNum : [0, 9]
    });
    $('.desc-cont').typingTxt({
        remove: false,
        content: "디지털 산업에서 경험을 쌓아온 전문가들이 모여 사용자경험(CX)의 패러다임을 혁신하고 \n 고객의 비즈니스 성장을 위한 디지털트랜스포메이션을 주도해 나가고자 합니다.",
        contentMobile: "디지털 산업에서 경험을 쌓아온 전문가들이 모여 사용자경험(CX)의 패러다임을 혁신하고 고객의 비즈니스 성장을 위한 디지털트랜스포메이션을 주도해 나가고자 합니다.",
        strok: "",
        isStrok: false,
        strokNum: [],
        target: ".desc-cont",
        time: 9000,
        bold: "bold",
        isBold : false,
        boldNum : [0, 9]
    });
    $('.slogan-box').typingTxt({
        remove: false,
        content: "Customer eXperience \n Innovative \n Digital Business",
        contentMobile: "Customer \n eXperience \n Innovative \n Digital Business",
        strok: "strok",
        isStrok: true,
        strokNum: [22,32],
        target: ".slogan-box",
        time: 0,
        bold: "bold",
        isBold : false,
        boldNum : [0, 9]
    });
    $('.main-slogan').sloganMove({
        delayTime: 3000
    });
    $('.total-menu').totalMove();


});