var u=window.navigator.userAgent;
//返回首页
function gyreturntop(){
    var nowNum = now;
    for(var i = 0; i < nowNum ; i++){
        if( now <= 0 )
        {
            return;
        }
        fnNext(now);
        now--;
    }
    aPage.eq(now).addClass('active')
};
$(function (){
	// 初始化设置
	var h=$(window).height(),
		w=$(window).width(),
		musicao = $('.musicaudio')[0], //获取音乐图标
		musicbtn =$('.musicbtn')[0],  //获取音乐按钮
		now=0,
		aPage=$('.page'),	//获取所有子页面
		ssbtn = true,
		pagemakrnum = 0,
		pagemove = true;

	$('#pages').height(h);
	fnScale();
	window.onresize = function(){
		fnScale();
	};
	aPage.eq(0).find('.errow_bottomBg').addClass('errow_bottomBgno1');
	// 获取hash值
	var hashal = window.location.hash.substring(1);
	//锚点
	maodian();
	//上下滑动
	$('.page').each(function(index){
		$('.page').css('top',h);
		aPage.eq(Number(hashal)).css('top','0px');
		aPage.eq(Number(hashal)).css('display','block');
		/*向上滑动*/
		aPage.eq(index).on('swipeup', function(){	
			pcjnext();
		});
		/*向下滑动*/
		aPage.eq(index).on('swipedown', function(){
			pcjpre();
		});
	});
    $('.page').eq(Number(hashal)).addClass('active');//首次打开页面显示页面
    now =Number(hashal);
    pagemakrnum = now;
    pagemakr(now);
	pdAndiPhone();//判断是安卓还是苹果
	is_weixin();//判断是否微信打开
	// 轮播图
	function startSwipe(obj){
		new Swipe(obj,{
			auto:2000,
			continuous:true,
			disableScroll:true,
			stopPropation:true
		})
	}
	// 轮播图初始化
	if($('.active .tab').length>0){
		startSwipe($('.active .tab')[0]);
		$('.active .tab ul li').css('opacity',1);
	}
	// 
	$('.page06 .btn').off('click').on('click',function (){
		if($('.page06').hasClass('on')){
			$('.page06').removeClass('on');
			$('.page06').addClass('off');
		}else{
			$('.page06').addClass('on');
			if($('.page06').hasClass('off')){
				$('.page06').removeClass('off');
			}
		}
	});
	$('.page08 ul li span').on('click',function (){
		if($(this).parents('.page08 ul li').hasClass('on')){
			$(this).parents('.page08 ul li').removeClass('on');
		}else{
			$(this).parents('.page08 ul li').addClass('on');
			if($(this).parents('.page08 ul li').hasClass('off')){
			}
		}
	});
	//背景音乐
	$(document).on('touchend',function (event){
		if(musicao){
			musicao.play();
		}else{
			return;	
		}
		$('.musicbtn').removeClass('musicStop').addClass('musicBounce');
		$(document).off('touchend');
	});
	if(musicbtn){
		musicbtn.onclick= function(event){
			if( musicao.paused){
				musicao.play();
				$('.musicbtn').removeClass('musicStop').addClass('musicBounce');
			}else{
				musicao.pause();
				$('.musicbtn').removeClass('musicBounce').addClass('musicStop');
			};
		};	
	};
	if(musicao){
		musicao.play();
		$('.musicbtn').removeClass('musicStop').addClass('musicBounce');
	}
	
	/*上翻页*/
	function fnPrev(now){
		if( now >= aPage.length - 1 ){
			return;
		}
		aPage.eq(now+1).css('top',h);
		aPage.eq(now+1).css('display','block');
		aPage.eq(now+1).stop().transition({
			top:"0%"
		},500,'ease-out',function(){
		aPage.eq(now).css('display','none');
		aPage.eq(now).css('top',-h);
		aPage.eq(now).removeClass('active');
		pagemove = true;
		});
		window.location.hash = now+1;
		is_weixin();
		topbtn();
		pagemakrnum = now+1;
		pagemakr(pagemakrnum);
	};
	/*下翻页*/
	function  fnNext(now){
		aPage.eq(now-1).css('display','block');
		aPage.eq(now-1).css('top','0%');
		pagemakrnum = now-1;
		pagemakr(pagemakrnum);
		window.location.hash = now-1;
		is_weixin();
		if(now==aPage.length){
			now=0
		};
		aPage.eq(now).stop().transition({
			top:h
		},500,'ease-out',function(){
			aPage.eq(now).removeClass('active');
			aPage.eq(now).css('display','none');
			pagemove = true;
		});
		topbtn();
	};
	function pcjnext(){	
		if(pagemove == true){
			$('.xzfdtopbigbox').fadeOut();
			if( now >= aPage.length - 1 ){
				now=-1;
			};
			pagemove = false;
			fnPrev(now);
			now++;
			aPage.eq(now).addClass('active');
			//初始化轮播图
			setTimeout(function(){
				if($('.active .tab').length>0){
					startSwipe($('.active .tab')[0]);
					$('.active .tab ul li').css('opacity',1);
				}
			},550);
			ssbtn=true;
		};
	}
	function pcjpre(){
		if(pagemove == true){
			$('.xzfdtopbigbox').fadeOut();
			if( now <= 0 ) {
				now=aPage.length;
			};
			pagemove = false;
			fnNext(now);
			now--;
			aPage.eq(now).addClass('active');
			//初始化轮播图
			setTimeout(function(){
				if($('.active .tab').length>0){
					startSwipe($('.active .tab')[0]);
					$('.active .tab ul li').css('opacity',1);
				}
			},550);
			ssbtn=false;
		};
	}
});
