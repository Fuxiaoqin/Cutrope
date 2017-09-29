window.jquery = window.jQuery =  window.$= require('jquery');
import {$_GET,_HOST,_ACTHOST,_SHOST,UserAgent,href} from './common'
import {myUserAgent,wxSecShare,toastTip,buriedPoint,hxsDownload,getHsxAppVersion,compareAppVersion} from './common'


export function resizeWindow(){
    function e() {
        var e = document.documentElement.clientWidth,
            t = document.querySelector("html"),
            f = e / 25;
        window.fontSize = f;
        t.style.fontSize = f + "px";
    }
    e(), window.addEventListener("resize", e);
}

const UA = window.navigator.userAgent;
var locationType = window.location.search.indexOf('sess_token');
export var json = {
    params:{
        act_id : $_GET('id'),
        // act_id : '97',
        sess_token : $_GET('sess_token'),
        model_idfa : $_GET('medel_idfa')
    }   
}

//判断是否非app进入页面 如果不是跳转下载页面
// export function checkInApp(){
//     if($_GET('shareType') == 1){
//         toastTip('.common_tip','需要下载登录',2500);
//         window.location.href = href;
//         return false;
//     }
//     return true;
// }

export function init(){
	if( UA.indexOf('iPhone') != -1 || UA.indexOf('iPad') != -1 ){
        $('.copyright').html('※活动最终解释权归XXXAPP所有 本活动与苹果公司无关');
	}

    if($_GET('shareType')==1){
    var shareHtml=[];
    shareHtml+=['<div class="d_foot">',
                    '<span class="colse"></span>',
                    '<div class="d_foot_bg"></div>',
                    '<div class="d_foot_main">',
                      '<div class="left"></div>',
                      '<div class="text">XXX,专业瘦</div>',
                      '<a href="javascript:;">下载APP</a>',
                    '</div>',
                    '<div class="share-img"></div>',
                '</div>'].join('');
    $('body').append(shareHtml);
    $('.d_foot').show();
    hxsDownload('.d_foot a', '.share-img', '.dynamic-info-main-box');
    hxsDownload('.share-down .fn .confirm');
    $('.d_foot .colse').click(function(){
        $('.dynamic-info-main-box').css('padding-bottom','0');
        $(this).parents('div').hide();
    })
    }else{
        $('.d_foot').hide();    
    }
    $('.d_foot .colse').click(function(){
        $('.dynamic-info-main-box').css('padding-bottom','0');
        $(this).parents('div').hide();
    })
}

//分享方法  
export function shareFun(data){
    //H5通知客户端显示分享按钮
    var shareLink = data.link+'&shareType=1&';
    var share_url = {share_url: window.location.href};
    var shareTitle = data.title;
    var shareImages = data.images;
    var shareDescr = data.descr;
    var shareType = data.share_type;
    var Version = getHsxAppVersion();

    //qq分享
    $('#qqShareContent').attr('content',decodeURIComponent(shareTitle));
    $('#qqShareDes').attr('content','XXXAPP  专享福利');
    $('#qqShareImg').attr('content',shareImages); 
    //分享方法
    wxSecShare(shareTitle,shareDescr,shareLink,shareImages);



    if( (compareAppVersion(Version,"2.6.0") ) && Version){
        window.location.href = 'https://hxsapp_visible_act_share_btn#'+ shareTitle + '#' + shareLink + '#' + shareImages + '#' + shareDescr + '#' + shareType;
    }else if( (compareAppVersion(Version,"2.2.0") || Version == "2.2.0" ) && ( !(compareAppVersion(Version,"2.6.0") || Version == "2.6.0" ) ) && Version){
        window.location.href = 'https://hxsapp_visible_share_btn#'+ shareTitle + '#' + shareLink + '#' + shareImages + '#' + shareDescr + '#' + shareType;
    }else if( (compareAppVersion(Version,"2.1.0") || Version == "2.1.0" ) && Version){
        window.location.href = 'hxsapp://visible_share_btn|'+ shareTitle + '|' +shareLink + '|' + shareImages + '|' + shareDescr + '|' + shareType;
    }

}

export function prevent () {
　　$("body").on("touchmove",function(event){
        event.preventDefault();
    }, false)
}

//获取屏幕高度
function getclientH(obj){
    var clientH=document.documentElement.clientHeight;
    $(obj).css('height',clientH+'px');
}