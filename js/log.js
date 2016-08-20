var topList=document.getElementById('topList');
var topListTemplate=document.getElementById('topListTemplate');
var newsList=document.getElementById('newsList');
var newsListTemplate=document.getElementById('newsListTemplate');
var contentL=document.getElementById('contentL');
var contentR=document.getElementById('contentR');
var newsChangable=document.getElementById('newsChangable');
var btnChange=document.getElementById('btnChange');
var statument=document.getElementById('statument');
function getRandom(m,n){
  return Math.round(Math.random()*(n-m)+m);
}

var recommendRender=(function(){
    function bindTopList(){
        ajax({
            url:"./json/newData.json",
            type:"get",
            success:function(data){
                var str=topListTemplate.innerHTML;
                var result=ejs.render(str,{topListData:data});
                topList.innerHTML=result;
            }
        })
    }
   var str='';
    function bindNewsList(){
        ajax({
            url:"./json/imgData.json",
            type:"get",
            success:function(data){
               if(data&&data.length>0){
                   window.onscroll=function(){
                       setHeight()
                       var scrollBootom=(document.documentElement.scrollTop||document.body.scrollTop)+(document.documentElement.clientHeight||document.body.clientHeight);
                       if(scrollBootom>document.body.scrollHeight-800){
                           var oLi=document.createElement('li');
                              str+='<li>';
                               str+='<img src="'+data[getRandom(0,4)]["imgSrc"]+'" alt=""/>';
                               str+='<h2>'+data[getRandom(0,4)]["desc"]+'</h2>';
                           str+='</li>';
                           newsList.innerHTML=str;
                       }
                   }

               }
            }
        })

    }
    function setHeight(){
       var scrollT=utils.win('scrollTop');
        var h=utils.getCss(contentL,'height');
        if(scrollT>300){
            utils.css(contentR,{
                "top":0,
                "right":230
            });
             if(scrollT%200===0){
                bindContentR();
             }


            var scrollT=utils.win('scrollTop');
        }else{
            utils.css(contentR,{
                "top":365.083,
                "right":227.3
            })
        }

    }

    /*contentR*/
    function bindContentR(){
        ajax({
            url:"./json/contentR.json",
            type:"get",
            success:function(data){
                var str=changableTemplate.innerHTML;
                var result=ejs.render(str,{changableData:data});
                newsChangable.innerHTML=result;
            }
        })
    }

    btnChange.onclick=function(){
        bindContentR()
    };
    return{
        init:function(){
            bindTopList();
            bindNewsList();
            bindContentR()
        }
    }
})();
recommendRender.init();

var btn=document.getElementById('btn');
var oLis=btn.getElementsByTagName('li');
var btnCon=document.getElementById('btnCon');
var oDiv=utils.getChildren(btnCon);
console.log(oDiv)
for(var i=0;i<oLis.length;i++){
    oLis[i].index=i;
    oLis[i].onclick=function(){
       for(var j=0;j<oLis.length;j++){
           utils.removeClass(oLis[j],'bgShow');
           utils.removeClass(oDiv[j],'conShow');

       }
        if(this.index===1){
            statument.style.display='none';
        }else{
            statument.style.display='block';
        }

        utils.addClass(oLis[this.index],'bgShow');
        utils.addClass(oDiv[this.index],'conShow');
        console.log(oDiv[this.index])

    }
}

var toTopTRender=(function(){
    var toTop=document.getElementById('toTop');
    var timer=null;
    var bOk=false;

    function getPosiition(){
        var winH=utils.win('clientHeight'),
            winW=utils.win('clientWidth');
        utils.css(toTop,{top:winW-800+utils.win('scrollTop')})
    }

   window.onmousewheel=window.onscroll=function computedDisplay(){
        getPosiition();
        if(bOk){
            clearInterval(timer);
        }
        bOk=true;
        if(utils.win('scrollTop')>=70){
            toTop.style.display='block';
        }else{
            toTop.style.display='none';
        }

    };
    toTop.onclick=function(){
        var target=utils.win('scrollTop');
        var duration=500;
        var interval=30;
        var step=target/duration*interval;
        timer=setInterval(function(){
            var curTop=utils.win('scrollTop');
            if(curTop<=0){
                clearInterval(timer);
                return;
            }
            curTop-=step;
            utils.win('scrollTop',curTop);
            bOk=false;
        },interval)
    }
})();
