var logIn=document.getElementById('logIn');
var logBox=document.getElementById('logBox');
var hide=document.getElementById('hide');
var close=document.getElementById('close');
var  dragLogBox=logBox.getElementsByTagName('div')[0];
drag(dragLogBox,logBox);
clickShow(logIn,logBox,hide);
clickClose(close,logBox,hide);
function show(m,n){
    m.onmouseenter=n.onmouseenter=function(){
        n.style.display='block';
    };
    m.onmouseleave=n.onmouseleave=function(){
        n.style.display='none';
    }
}
function BaiduSearch(){
    this.node={
        searchText:'#search',
        searchBtn:'#searchBtn',
        list:'#search-list'
    };
    this.api= 'http://suggestion.baidu.com/su';
    this.init();
}
BaiduSearch.prototype={
    constructor:BaiduSearch,
    init:function(){
        for(var n in  this.node){
            if(!this.node.hasOwnProperty(n)) continue;
            this.node[n]=document.querySelector(this.node[n]);
        }
        this.bindEvent();

            },
    bindEvent:function(){
        var that=this;
        that.node.searchBtn.onclick=function(){
            var searchText=that.node.searchText.value;
            that.callBaiduSearch(searchText);
        };
        that.node.list.onclick=function(e){
            e||(e=window.event);
            var target=e.target||e.srcElement;
            window.open('https://www.baidu.com/s?wd='+encodeURIComponent(target.innerHTML),'_blank');
            e.stopPropagation();
            e.cancelBubble=true;
        };
        document.body.onclick=function(){
            that.node.list.innerHTML='';
        }
    },
    callBaiduSearch:function(searchText){
        if(!searchText){
            return;
        }
        var that=this;
        jsonp(this.api,{wd:searchText},'cb',function(data){
            if(data.s.length){
                var fragement=document.createDocumentFragment();
                for(var i=0;i<data.s.length;i++){
                    var li=document.createElement('li');
                    li.innerHTML=data.s[i];
                    fragement.appendChild(li);
                }
                that.node.list.innerHTML='';
                that.node.list.appendChild(fragement);
            }
        });
    }
    };
new  BaiduSearch();
function drag(dragName,dragBox){
    dragName.onmousedown=function(e){
        e=e||window.event;
        var disX=e.clientX-dragBox.offsetLeft;
        var disY=e.clientY-dragBox.offsetTop;
        document.onmousemove=function(e){
            e=e||window.event;
            var l= e.clientX-disX;
            var t= e.clientY-disY;
            var maxW=(document.documentElement.clientWidth||document.body.clientWidth)-dragBox.offsetWidth;
            var maxH=(document.documentElement.clientHeight||document.body.clientHeight)-dragBox.offsetHeight;
            if(l<0){
                l=0;
            }else if(l>=maxW){
                l=maxW;
            }
            if(t<=0){
                t=0;
            }else if(t>=maxH){
                t=maxH;
            }
            dragBox.style.left=l+'px';
            dragBox.style.top=t+'px';
        };
        document.onmouseup=function(){
            document.onmousemove=null;
            document.onmouseup=null;
            dragName.releaseCapture&&dragName.releaseCapture();
        };
        dragName.setCapture && dragName.setCapture();
        return false;
    }
}
var username=document.getElementById('username'),
    password=document.getElementById('password'),
    click=document.getElementById('click'),
    check=document.getElementById('check');
var logModule=(function(){
    var reg1=/^[\\u4e00-\\u9fa5_a-zA-Z0-9-]{1,16}$/;
    var reg2=/^[0-9|A-Z|a-z]{6,16}$/;
    username.onblur=function(e){
      e=e||window.event;
        var tar=e.target||e.srcElement;
        if(e.keyCode===13){
            if(!reg1.test(username.value)){
                alert("请输入正确的用户名(任意汉字字母数字)")
            }
        }
    };
    password.onkeyup=function(e){
        e=e||window.event;
        var tar=e.target||e.srcElement;
        if(e.keyCode===13){
            if(!reg2.test(password.value)){
                alert("请输入6-16位正确的密码(任意字母数字)")
            }
        }
    };
    if(reg1.test(username.value)&&reg2.test(password.value)){
        click.onclick=function(){
            window.open('log.html','_self');
        }
    }else{
        alert('用户名或密码错误')
    }


})();
