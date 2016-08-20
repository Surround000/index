(function(){
    var undefined=void 0;
    var counter=1;
    window.jsonp=function(url,data,jsonpcallback,callback) {
        var cbName = 'cb' + counter++;
        var globalFunctionName = 'window.jsonp.' + cbName;
        window.jsonp[cbName] = function (data) {
            try {
                callback(data);
            } finally {
                removeScript();
            }
        };
        data = tools.encodeData2URIString(data);
        url = tools.padStringToURL(url, data);
        url = tools.padStringToURL(url, jsonpcallback + '=' + globalFunctionName);
        var script = document.createElement('script');
        script.async = 'async';
        script.src = url;
        var complete = function () {
            document.body.appendChild(script);
        };

        function removeScript() {
            script.parentNode.removeChild((script));
            delete window.jsonp[cbName];
        }

        if (document.readyState === 'complete') {
            complete();
        } else {
            if (window.addEventListener) {
                window.addEventListener('load', function () {
                    complete();
                }, false);
            } else {
                window.attachEvent('onload', function () {
                    complete();
                });
            }
        }

    }
        var tools={
            padStringToURL:function(url,padString){
              padString=tools.encodeData2URIString(padString);
                if(!padString){
                    return url;
                }
                var hasSearch=/\?/.test(url);
                return url+(hasSearch?'&':'?')+padString;
            },
            encodeData2URIString: function (data) {
                if (tools.isType(data, 'Undefined') || tools.isType(data, 'Null')) {
                    return '';
                }
                if (tools.isType(data, 'String')) {
                    return data;
                }
                if (tools.isType(data, 'Object')) {
                    var arr = [];
                    for (var n in data) {
                        if (!data.hasOwnProperty(n)) continue;
                        arr.push(encodeURIComponent(n) + '=' + encodeURIComponent(data[n]));
                    }
                    return arr.join('&')
                }
                return data.toString();

            },
            isType: function (data, type) {
                return Object.prototype.toString.call(data) === '[object ' + type + ']';
            }
        };

})();

