<template>
    <div id="index_warp">
        <div class="draw_people">
            <p><span class="peopleCount">{{peplecount}}</span>人参与</p>
        </div>
        <header>
        <nav>
            <p>
                你有<span>{{inter}}</span>次机会
            </p>
        </nav>
        <article @click="ruleFun">活动规则&gt;</article></header>
        <section>
            <aside v-if="asideshow"></aside>
            <div class="finger" v-if="fingershow"></div>
        </section>
        <footer v-if='frameshow'>
            <div class="shadow"></div>
            <div v-if="winimgshow" class="child">
                <div class="win">
                    <img v-if="winimg" :src="winimg" class="img">
                    <div class="close" @click="closeFun" ></div>
                    <p @click="closeFun" ><img :src="buttonimg"></p>
                </div>
            </div>
            <div v-else class="child">
                <div class="rule">
                    <div class="finger"></div>
                </div>
            </div>
        </footer>
        <div class="share" v-if="share"  @click="closeFun">
            <div class="shadow"></div>
            <div class="shareBg">
                <div class="shareShadow"></div>
                <div class="text">
                    <p>点击右上角分享图标</p>
                    <span>邀请好友来领取高温福利吧!</span>
                </div>
            </div>
        </div>
        <!-- {{winimg}} -->
        <div class="toast_tip"></div>
        <!-- 活动结束横幅 -->
        <div class="page_1_foot" v-if="pagefoot">活动已结束</div>
        <p class="copyright">※活动最终解释权归好享瘦APP所有</p>
    </div>
</template>

<script>
   
    export default {
        name: 'index',
        data () {
            return {
                touchnum:0,
                changjing:"",
                inter : 3,//剩余机会次数
                frameshow : false,
                ruleshow : false,
                winimgshow : false,
                fingershow : true,
                asideshow : true,
                pagefoot : false,
                share : false,
                startX :  0,//图片滑动的触摸起始位置
                endX : 0,
                endY : 0,
                href : 'http://app.hxsapp.com/html/channel_statistics.html?channel_id=97',
                peplecount : 0,
                x : 0,//手指滑动的总距离
                L : 0,//被滑动物体的左间距
                W : 0,//被滑动物体的宽度
                H : 0,//被滑动物体的高度
                move : true,//是否可再次滑动
                winimg : '',
                type : 'game',
                step: 5,
                winimgArr : [
                   { src : require('./../assets/img/bonus.png') }, 
                   { src : require('./../assets/img/flow.png') }, 
                   { src : require('./../assets/img/jingdong.png') }, 
                   { src : require('./../assets/img/milk.png') }, 
                   { src : require('./../assets/img/tianmao.png') }, 
                   { src : require('./../assets/img/ticket.png') }, 
                   { src : require('./../assets/img/loss.png') }, 
                   { src : require('./../assets/img/nochance.png') }, 
                   { src : require('./../assets/img/share.png') }, 
                ],
                buttonimg:'',
                buttonimgArr:[
                    { src : require('./../assets/img/kown.png') }, 
                    { src : require('./../assets/img/again.png') }, 
                    { src : require('./../assets/img/tomorrow.png') }, 
                    { src : require('./../assets/img/shareBtn.png') }, 
                ], 
            }
        },
        mounted () {
            utils.reusableJs.resizeWindow();
            utils.reusableJs.init();
            utils.common.preLoading( "stressing" );        
            var _this = this; 
            _this.judgeVersion(); 
            // debugger    
            this.$http.jsonp( utils.common._ACTHOST + '/hyperthermy/Mod/pv', utils.reusableJs.json ).then( function ( data ){
                _this.peplecount = data.data.code == 200 ? data.data.data.sum : 0;
            })
            this.$http.jsonp( utils.common._ACTHOST + '/hyperthermy/Mod/getDrawTimes', utils.reusableJs.json ).then( function ( data ){
                _this.inter = data.data.code == 200 ? data.data.data.draw_times : 3;
            })
            this.$nextTick( function () {
                _this.shareFun();
                _this.type = 'game';
                _this.setClass();
                utils.reusableJs.prevent();
                _this.startGame(); 
                _this.slide( 'section' );
            })
        },
        methods : {
            judgeVersion () {
                var me = this;
                this.$nextTick( function () {
                    var ua = window.navigator.userAgent;
                    var IsAndroid = new RegExp('Android').test(ua);
                    var isAndroidQQ = new RegExp('Mobile MQQBrowser').test(ua);
                    var MicroMessenger = new RegExp('MicroMessenger').test(ua);
                    var isIos = new RegExp('iPhone').test(ua);
                    var isIpad = new RegExp('iPad').test(ua);
                    var isIosQQ = new RegExp(' QQ/').test(ua);
                    me.href = ((IsAndroid && isAndroidQQ && !MicroMessenger) || (isIos && isIosQQ) || (isIpad && isIosQQ)) ? 'https://www.hxsapp.com/download' : this.href;
                    $('.d_foot a').attr( 'href', this.href );
                })
            },
            setClass () {
                var H = document.documentElement.clientHeight;
                $('header').css( 'height', H*388/1334 + 'px' );
                $('section').css( 'height', ( H - H*388/1334 - $('p.copyright').height()) + 'px' );
            },
            shareFun () {
                var me = this;
                this.$http.jsonp( utils.common._ACTHOST + '/hyperthermy/Mod/actInfo',  utils.reusableJs.json ).then( function (data) {
                    if( data.data.code==200 ){
                        utils.reusableJs.shareFun(data.data.data);
                        me.pagefoot = data.data.data.state == -1 ? true : false;
                    }else{
                        utils.common.toastTip( '.toast_tip', data.data.msg, 2500 );
                    }
                })
            },
            startGame () {
                var me = this;
                $('aside').css( { 'animation' : 'sroll' + me.step + ' 2s linear 0s 1' } );
                setTimeout(function(){
                    if(me.step < 0){
                        clearTimeout();
                        return;
                    }
                    me.step--;
                    me.startGame();
                },2000) 
            },
            ruleFun () {
                this.frameshow = true;
                this.winimgshow = false;
                var _this = this;
                this.$nextTick( function () {
                    $('.rule').css( { 'animation' : 'bounceInDown 1.5s 1 linear' } );
                    _this.type = 'rule';
                    _this.slide( 'footer' );
                })
            },
            closeFun () {
                this.frameshow = false;
                this.share = false;
                this.fingershow = true;
                this.asideshow = true ;
                this.move = true;
            },
            shareShow (){
                this.frameshow = false;
                this.fingershow = true;
                this.asideshow = true ;
                this.share = true;
                this.$nextTick( function () {
                    $('.share .shareBg').css( { 'animation' : 'bounceInDown 1s 1 linear' } );
                }); 
            },
            slide : function( sel ){
                this.W = parseInt( $('aside').css('width') );  
                this.L = $('aside').offset().left;
                this.H = this.type == 'rule' ? parseInt( $('.rule').css('height') )/2 : parseInt( $('aside').css('height') );
                this.isTouchDevice( sel );
            },
            isTouchDevice : function( sel ){//判断是否支持触摸事件 
                try {  
                    document.createEvent("TouchEvent");  
                    this.bindEvent( sel ); //绑定事件  
                 }catch (e) {  
                    utils.common.toastTip( '.toast_tip', "不支持TouchEvent事件！" + e.message, 2500 );  
                 }  
            },
            bindEvent : function( sel ){//绑定事件  
                var me = this;
                this.$nextTick( function () {
                    $( sel ).on( 'touchstart', me.touchStartFunc );
                    $( sel ).on( 'touchmove', me.touchMoveFunc );
                    $( sel ).on( 'touchend', me.touchEndFunc );
                })
            },
            touchStartFunc : function( e ){//touchstart事件
                if(e.targetTouches.length == 1){ 
                    var touch = e.touches[0]; //获取第一个触点 
                    this.startX = Number(touch.pageX); //页面触点X坐标
                }
            },
            touchMoveFunc : function( e ){//touchmove事件
                if( e.targetTouches.length == 1 ){
                    var touch = e.touches[0]; //获取第一个触点 
                    this.endX = Number( touch.pageX ); //页面触点X坐标  
                    this.endY = Number( touch.pageY ); //页面触点X坐标 
                }
            },
            touchEndFunc : function( e ){ //touchend事件，这个事件无法获取坐标 
                var me = this; 
                var W = document.documentElement.clientWidth;
                if( ( this.startX >= 0 && this.startX <= W/2 && this.endX >= this.L+ this.W/2 && this.endX <= W && this.endY <= this.H && this.endX!=0 )  
                    || ( this.startX <= W && this.startX >= this.L+ this.W/2 && this.endX > 0 && this.endX < W/2 && this.endY <= this.H && this.endX!=0 )  
                    ){
                    me.startX = 0;
                    me.endX = 0;
                    me.endY = 0;
                    if( this.move ){
                        this.move = false; 
                        if( this.type == 'game' ){ 
                            utils.common.buriedPoint('滑动抽奖', '滑动抽奖');
                            if( utils.common.$_GET('shareType') == 1){
                                window.location.href = this.href;
                                this.move = true;
                                return;
                            }  
                            me.$http.jsonp( utils.common._ACTHOST + '/hyperthermy/Mod/draw', utils.reusableJs.json ).then( function ( data ){
                                var data = data.data;
                                data.code = 200;//测试用
                                if( data.code == 401 ){
                                    window.location.href = 'https://hxsapp_showloginpage';
                                    me.move = true;
                                    return;
                                }
                                if( data.code == 200 || data.code == 607 || data.code == 614 || data.code == 608 ){
                                    // me.inter = data.code == 200 || data.code == 607 ? data.data.draw_times : me.inter;
                                    me.inter = 3;//测试用
                                    // var sortImg = data.code == 608 ? 9 : data.code == 614 ? 8 : data.code == 200 ? Number(data.data.sort) : 7;
                                    var sortImg = 4;//测试用
                                    // var sortBtn = data.code == 608 ? 3 : data.code == 614 ? 2 : data.code == 200 ? 0 : 1;
                                    var sortBtn = 0//测试用;
                                    if( data.code == 607 && data.data.draw_times == 0){
                                        sortImg = 8;
                                        sortBtn = 2;
                                    }
                                    me.winimg = me.winimgArr[ sortImg - 1 ].src;
                                    me.buttonimg = me.buttonimgArr[sortBtn].src;
                                    if( data.code == 614 || data.code == 608 ){
                                        me.step = 0;   
                                        me.frameshow = true;
                                        me.winimgshow = true;
                                        me.$nextTick( function () {
                                            $('.win p').css('top','24rem');
                                            $('.win').css( { 'animation' : 'bounceIn 1s 1 linear' } );
                                            if(data.code == 608) {
                                                $('.win p').on('click',me.shareShow)
                                            }
                                        });
                                        return;
                                    }
                                    me.$nextTick( function () {
                                        if( me.step < 3 ){
                                            $('aside').css( { 'animation' : 'slowroll 1s 1 linear'} );
                                        }else{
                                            $('aside').fadeOut(1050); 
                                        }
                                        setTimeout(function(){
                                            me.step = 0; 
                                            me.fingershow = false;  
                                            me.frameshow = true;
                                            me.winimgshow = true;
                                            me.asideshow = false;
                                            me.$nextTick( function () {
                                                if( data.code == 607 ){
                                                    $('.win p').css('top','24rem');
                                                }else{
                                                    $('.win p').css('top','25.3rem');
                                                }
                                                $('.win').css( { 'animation' : 'bounceIn 1s 1 linear' } ); 
                                            });
                                        },1000);
                                    }) 
                                }else{
                                    utils.common.toastTip( '.toast_tip', data.msg, 2500 );
                                    me.move = true;
                                }
                            })
                             
                        } else{ 
                            this.type = 'game';
                            this.H = parseInt( $('aside').css('height') );
                            this.$nextTick( function () { 
                                $('.rule').fadeOut(1000);
                                $('.rule').css( { 'animation' : 'slowroll 1s 1 linear' } );
                            })
                            setTimeout(function(){
                                me.frameshow = false;
                                me.move = true;
                            },1000)
                        }
                    }else{
                        utils.common.toastTip( '.toast_tip', "您的操作过于频繁!" , 2500 ); 
                        me.move = true;
                    } 
                }  
            }
        }
    }
</script>

    <!-- Add "scoped" attribute to limit CSS to this component only -->
    <style>

    body{
        background: #CBF4FA;
    }
    header{
        background: url('./../assets/img/title.png') left top no-repeat;
        background-size:100% 100%;
        width:100%;
        height:12rem;
        position:relative;
        top:0;
        z-index: 4;
    }
    section{
        background: url('./../assets/img/bg.png') left top no-repeat;
        background-size:100% 100%;
        width:100%;
        height:26rem;
        position:relative;
        top:0;
        z-index:3;
        cursor: pointer;
    }
    nav{
        width: 8rem;
        height: 1.5rem;
        line-height: 1.5rem;
        background: url('./../assets/img/span.png') left top no-repeat;
        font-size: 0.9rem;
        background-size: 100% 100%;
        position: absolute;
        left: calc(50% - 4rem);
        bottom: 1rem;
        color: #ff8d24;
        font-weight: bold;
        word-spacing:.1rem;
    }
    nav p{
        text-indent: 1.6em;
    }
    nav span{
        color:#ff0101;
    }
    article{
        font-size:.9rem;
        position:absolute;
        bottom:.7rem;
        right:.5rem;
        color:#fff;
    }
    aside{
        background: url('./../assets/img/gift.png') left top no-repeat;
        font-size: 0.9rem;
        background-size: 100%;
        width:6rem;
        height:23rem;
        position:absolute;
        left:calc(50% - 3rem);
        top:-.5rem;
        opacity: 1;
        cursor: pointer;
        /*animation:sroll5 2s linear 1;*/
    }
    .finger{
        background: url('./../assets/img/finger.png') left top no-repeat;
        font-size: 0.9rem;
        background-size: 100%;
        width:6rem;
        height:2rem;
        position:absolute;
        left:5rem;
        top:3rem;
        animation:quickroll 1s infinite;
    }
    @keyframes quickroll {
    0% {
        transform:translateX(0)
     }
     100% {
        transform:translateX(9rem);
     }
    }
    @keyframes slowroll {
    0% {
        transform:translateY(0);
        opacity:1;
     }
     100% {
        transform:translateY(16rem);
        opacity:0;
     }
    }
    @keyframes sroll1 {
    0% {
        transform:rotate(0);
        transform-origin:center top;
     }
     25%{
        transform:rotate(1deg);
        transform-origin:center top;
     }
     50%{
        transform:rotate(0);
        transform-origin:center top;
     }
     75%{
        transform:rotate(-1deg);
        transform-origin:center top;
     }
     100% {
        transform:rotate(0);
        transform-origin:center top;
     }
    }
    @keyframes sroll2 {
    0% {
        transform:rotate(0);
        transform-origin:center top;
     }
     25%{
        transform:rotate(3deg);
        transform-origin:center top;
     }
     50%{
        transform:rotate(0);
        transform-origin:center top;
     }
     75%{
        transform:rotate(-3deg);
        transform-origin:center top;
     }
     100% {
        transform:rotate(0);
        transform-origin:center top;
     }
    }
    @keyframes sroll3 {
    0% {
        transform:rotate(0);
        transform-origin:center top;
     }
     25%{
        transform:rotate(10deg);
        transform-origin:center top;
     }
     50%{
        transform:rotate(0);
        transform-origin:center top;
     }
     75%{
        transform:rotate(-10deg);
        transform-origin:center top;
     }
     100% {
        transform:rotate(0);
        transform-origin:center top;
     }
    }
    @keyframes sroll4 {
    0% {
        transform:rotate(0);
        transform-origin:center top;
     }
     25%{
        transform:rotate(20deg);
        transform-origin:center top;
     }
     50%{
        transform:rotate(0);
        transform-origin:center top;
     }
     75%{
        transform:rotate(-20deg);
        transform-origin:center top;
     }
     100% {
        transform:rotate(0);
        transform-origin:center top;
     }
    }
    @keyframes sroll5 {
    0% {
        transform:rotate(0);
        transform-origin:center top;
     }
     25%{
        transform:rotate(30deg);
        transform-origin:center top;
     }
     50%{
        transform:rotate(0);
        transform-origin:center top;
     }
     75%{
        transform:rotate(-30deg);
        transform-origin:center top;
     }
     100% {
        transform:rotate(0);
        transform-origin:center top;
     }
    }
    footer{
        position:fixed;
        width: 100%;
        height:100%;
        top: 0;
        z-index:10000;
    }
    .shadow{
        position:absolute;
        background:#000;
        opacity: .7;
        width:100%;
        height:100%;
        top: 0;
        z-index: 1;
    }
    .child{
        position:relative;
        z-index:2;
    }
    .rule{
        width: 100%;
        height: 35rem;
        position: absolute;
        z-index: 2;
        top:0;
        background: url('./../assets/img/rule.png') left top no-repeat;
        background-size: 100%;
    }
    .close{
        background: url('./../assets/img/close.png') left top no-repeat;
        background-size: 100%;
        width: 2.2rem;
        height: 5.2rem;
        position: absolute;
        z-index: 100;  
    }
    .win{
        position:relative;
        height:29rem;
    }
    .win .img{
        width: 100%;
        height:100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 10;
    }
    .win .close{
        top: 8.6rem;
        right:4rem; 
    }
    .win p{
        position: absolute;
        top: 25.3rem;
        left: calc(50% - 5rem);
        width:10rem;
        height:3rem;
        border:none;
        z-index:10;
    }
    .win p img{
        width:100%;
    }
    p.copyright{
        color:#8C3223;
        background:#9DD84A;
    }
    .share{
        color: #fff;
        text-align: center;
        position: fixed;
        z-index: 5;
        top:0;
        width: 100%;
        height:100%;
    }
    .shareBg{
        position: relative;
        z-index: 6;
    }
    .shareShadow{
        background: url('./../assets/img/arrow.png') center center no-repeat;
        background-size: 100% 100%;
        width: 100%;
        height: 25rem;
        position: relative;
        top:0;  
    }
    .text{
        position: relative;
    }
    .text span{
        font-size: 1.3rem;
    }
</style>
