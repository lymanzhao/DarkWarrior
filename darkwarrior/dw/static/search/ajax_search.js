
    //ajax 用户搜索功能
function showHint(str)
{
var xmlhttp;
if (str.length==0)
  {
  document.getElementById("txtHint").innerHTML="";
  return;
  }
if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
  xmlhttp=new XMLHttpRequest();
  }
else
  {// code for IE6, IE5
  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
xmlhttp.onreadystatechange=function()
  {
  if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
        //alert(xmlhttp.responseText)
    document.getElementById("txtHint").innerHTML=xmlhttp.responseText;
        document.getElementsByName('user')[0].onclick();
    }
  };
xmlhttp.open("GET","/search_people?q="+str,true);
xmlhttp.send();
}

function check_user(){
    var user = document.getElementsByName('user');
    var user_len = user.length;
    var search_text = document.getElementById('search_text');
     var txtHint = document.getElementById('txtHint');

        for(var i=0;i<user_len;i++)
        {
          user[i].index = i;

            user[i].onclick = function(){

                x=this.index;
                //alert(user[x].getAttribute('user_name'));
                //search_text.setAttribute('value',user[x].getAttribute('user_name'));
                //alert(search_text.getAttribute('value'));
                search_text.value = user[x].getAttribute('user_name');
                //txtHint.style.display = 'none';

               var xmlhttp;

if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
  xmlhttp=new XMLHttpRequest();
  }
else
  {// code for IE6, IE5
  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
xmlhttp.onreadystatechange=function()
  {
  if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
        //alert(xmlhttp.responseText)
    document.getElementById("txtHint").innerHTML=xmlhttp.responseText;
        //document.getElementsByName('user')[0].onclick();
    }
  };
xmlhttp.open("GET","/search_people?q=",true);
xmlhttp.send();


            };

        }
    }


