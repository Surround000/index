var set=document.getElementById('set');
var aSet=document.getElementById('aSet');
var divSet=set.getElementsByTagName('div')[0];
var more=document.getElementById('more');
var moreList=more.getElementsByTagName('ul')[0];
show(aSet,divSet);
show(more,moreList);
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
function clickShow(idClick){
    m=arguments[1];
    n=arguments[2];
    idClick.onclick=function(){
        m.style.display='block';
        n.style.display='block';


    }
}
function clickClose(idClick){
    m=arguments[1];
    n=arguments[2];
    idClick.onclick=function(){
        m.style.display='none';
        n.style.display='none';
    }
}
