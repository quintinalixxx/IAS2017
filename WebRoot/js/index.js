/**
 * Created by yulibin on 2016/12/17.
 */

$(function(){
    index.init();
});

var index = {
    init: function(){
        this._menuInit();
        this._scrollInit();
    },
    _show:0,
    _menuInit: function(){
        var that = this;
        $("header .menu").click(function(){
            if(that._show == 0){
                $("header .links").slideDown('fast');
                that._show = 1;
            } else {
                $("header .links").slideUp('fast');
                that._show = 0;
            }
        });
        $("header .links").click(function(){
            // check width
            var width = $(window).width();
            if(width <= 600){ 
                $(this).slideUp(); 
                that._show = 0;
            }
        });
    },
    _scrollNumber:0,
    _scrollInit: function(){
        var that = this;
        $(".meeting_left").click(function(){
            that._scrollNumber--;
            that._scroll();
        });
        $(".meeting_right").click(function(){
            that._scrollNumber++;
            that._scroll();
        });
    },
    _scroll:function(){
        var singlePage = -1120;
        var count = this._scrollNumber;
        count = count <0 ? 2 : count;
        count = count >2 ? 0 : count;
        this._scrollNumber = count;
        var left = count*singlePage;
        $(".meeting_scroll_in").animate({left: left+'px'})
    }
}



(function(window, document, undefined) {  
    var Include39485748323 = function() {}  
    Include39485748323.prototype = {  
        //倒序循环  
        forEach: function(array, callback) {  
            var size = array.length;  
            for(var i = size - 1; i >= 0; i--){  
                callback.apply(array[i], [i]);  
            }  
        },  
        getFilePath: function() {  
            var curWwwPath=window.document.location.href;  
            var pathName=window.document.location.pathname;  
            var localhostPaht=curWwwPath.substring(0,curWwwPath.indexOf(pathName));  
            var projectName=pathName.substring(0,pathName.substr(1).lastIndexOf('/')+1);  
            return localhostPaht+projectName;  
        },  
        //获取文件内容  
        getFileContent: function(url) {  
            var ie = navigator.userAgent.indexOf('MSIE') > 0;  
            var o = ie ? new ActiveXObject('Microsoft.XMLHTTP') : new XMLHttpRequest();  
            o.open('get', url, false);  
            o.send(null);  
            return o.responseText;  
        },  
        parseNode: function(content) {  
            var objE = document.createElement("div");  
            objE.innerHTML = content;  
            return objE.childNodes;  
        },  
        executeScript: function(content) {  
            var mac = /<script>([\s\S]*?)<\/script>/g;  
            var r = "";  
            while(r = mac.exec(content)) {  
                eval(r[1]);  
            }  
        },  
        getHtml: function(content) {  
            var mac = /<script>([\s\S]*?)<\/script>/g;  
            content.replace(mac, "");  
            return content;  
        },  
        getPrevCount: function(src) {  
            var mac = /\.\.\//g;  
            var count = 0;  
            while(mac.exec(src)) {  
                count++;  
            }  
            return count;  
        },  
        getRequestUrl: function(filePath, src) {  
            if(/http:\/\//g.test(src)){ return src; }  
            var prevCount = this.getPrevCount(src);  
            while(prevCount--) {  
                filePath = filePath.substring(0,filePath.substr(1).lastIndexOf('/')+1);  
            }  
            return filePath + "/"+src.replace(/\.\.\//g, "");  
        },  
        replaceIncludeElements: function() {  
            var $this = this;  
            var filePath = $this.getFilePath();  
            var includeTals = document.getElementsByTagName("include");  
            this.forEach(includeTals, function() {  
                //拿到路径  
                var src = this.getAttribute("src");  
                //拿到文件内容  
                var content = $this.getFileContent($this.getRequestUrl(filePath, src));  
                //将文本转换成节点  
                var parent = this.parentNode;  
                var includeNodes = $this.parseNode($this.getHtml(content));  
                var size = includeNodes.length;  
                for(var i = 0; i < size; i++) {  
                    parent.insertBefore(includeNodes[0], this);  
                }  
                //执行文本中的额javascript  
                $this.executeScript(content);  
                parent.removeChild(this);  
                //替换元素 this.parentNode.replaceChild(includeNodes[1], this);  
            })  
        }  
    }  
    window.onload = function() {  
        new Include39485748323().replaceIncludeElements();  
    }  
})(window, document) 