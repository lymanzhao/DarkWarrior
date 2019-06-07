function AjaxClass()  
{  
    var XmlHttp = false;  
    try  
    {  
        XmlHttp = new XMLHttpRequest();        //FireFox专有  
    }  
    catch(e)  
    {  
        try  
        {  
            XmlHttp = new ActiveXObject("MSXML2.XMLHTTP");  
        }  
        catch(e2)  
        {  
            try  
            {  
                XmlHttp = new ActiveXObject("Microsoft.XMLHTTP");  
            }  
            catch(e3)  
            {  
                alert("你的浏览器不支持XMLHTTP对象，请升级到IE6以上版本！");  
                XmlHttp = false;  
            }  
        }  
    }  
  
    var me = this;  
    this.Method = "POST";  
    this.Url = "";  
    this.Async = true;  
    this.Arg = "";  
    this.CallBack = function(){};  
    this.Loading = function(){};  
      
    this.Send = function()  
    {  
        if (this.Url=="")  
        {  
            return false;  
        }  
        if (!XmlHttp)  
        {  
            return IframePost();  
        }  
  
        XmlHttp.open (this.Method, this.Url, this.Async);  
        if (this.Method=="POST")  
        {  
            XmlHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");  
        }  
        XmlHttp.onreadystatechange = function()  
        {  
            if (XmlHttp.readyState==4)  
            {  
                var Result = false;  
                if (XmlHttp.status==200)  
                {  
                    Result = XmlHttp.responseText;  
                }  
                XmlHttp = null;  
                  
                me.CallBack(Result);  
            }  
             else  
             {  
                me.Loading();  
             }  
        };
        if (this.Method=="POST")  
        {  
            XmlHttp.send(this.Arg);  
        }  
        else  
        {  
            XmlHttp.send(null);  
        }  
    }  
      
    //Iframe方式提交  
    function IframePost()  
    {  
        var Num = 0;  
        var obj = document.createElement("iframe");  
        obj.attachEvent("onload",function(){ me.CallBack(obj.contentWindow.document.body.innerHTML); obj.removeNode() });  
        obj.attachEvent("onreadystatechange",function(){ if (Num>=5) {alert(false);obj.removeNode()} });  
        obj.src = me.Url;  
        obj.style.display = 'none';  
        document.body.appendChild(obj);  
    }  
}  