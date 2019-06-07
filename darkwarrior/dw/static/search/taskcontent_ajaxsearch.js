/**
 * Created by bbb on 2016/7/13.
 */

//ajax 用户搜索功能-1

function showOwner(str)
{
    var xmlhttp;
    if (str.length==0)
    {
        document.getElementById("txtOwner").innerHTML="";
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
            document.getElementById("txtOwner").innerHTML=xmlhttp.responseText;
            document.getElementById('txtOwner').onclick();

        }
    };
    xmlhttp.open("GET","/search_people?q="+str,true);
    xmlhttp.send();


    var xmlhttp_2;

    if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp_2=new XMLHttpRequest();
    }
    else
    {// code for IE6, IE5
        xmlhttp_2=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp_2.onreadystatechange=function()
    {
        if (xmlhttp_2.readyState==4 && xmlhttp_2.status==200)
        {
            document.getElementById("txtReporter").innerHTML=xmlhttp_2.responseText;
        }
    };
    xmlhttp_2.open("GET","/search_people?q=",true);
    xmlhttp_2.send();
}


//ajax 用户搜索功能-2
function showReporter(str)
{
    var xmlhttp;
    if (str.length==0)
    {
        document.getElementById("txtReporter").innerHTML="";
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

            document.getElementById("txtReporter").innerHTML=xmlhttp.responseText;
            document.getElementById('txtReporter').onclick();

        }
    };
    xmlhttp.open("GET","/search_people?q="+str,true);
    xmlhttp.send();

    var xmlhttp_2;

    if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp_2=new XMLHttpRequest();
    }
    else
    {// code for IE6, IE5
        xmlhttp_2=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp_2.onreadystatechange=function()
    {
        if (xmlhttp_2.readyState==4 && xmlhttp_2.status==200)
        {
            document.getElementById("txtOwner").innerHTML=xmlhttp_2.responseText;
        }
    };
    xmlhttp_2.open("GET","/search_people?q=",true);
    xmlhttp_2.send();
}


function judge_owner(){
    //alert('owner')
    var user = document.getElementsByName('user');
    var user_len = user.length;
    var search_owner = document.getElementById('search_owner');
    var txtOwner = document.getElementById('txtOwner');

    for(var i=0;i<user_len;i++)
    {
        user[i].index = i;

        user[i].onclick = function(){

            x=this.index;
            search_owner.value = user[x].getAttribute('user_name');

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
                    document.getElementById("txtOwner").innerHTML=xmlhttp.responseText;
                    //document.getElementsByName('user')[0].onclick();
                }
            };
            xmlhttp.open("GET","/search_people?q=",true);
            xmlhttp.send();

        };

    }

}



function judge_reporter(){
    //alert('reporter')
    var user = document.getElementsByName('user');
    var user_len = user.length;
    var search_reporter = document.getElementById('search_reporter');
    var txtReporter = document.getElementById('txtReporter');

    for(var i=0;i<user_len;i++)
    {
        user[i].index = i;

        user[i].onclick = function(){

            x=this.index;

            //alert(2);
            search_reporter.value = user[x].getAttribute('user_name');

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
                    document.getElementById("txtReporter").innerHTML=xmlhttp.responseText;
                }
            };
            xmlhttp.open("GET","/search_people?q=",true);
            xmlhttp.send();

        };

    }

}


//ajax search_task change_parent_task
function showtask(str) {
    var xmlhttp;
    var project_id = $('#project_id_input').val();
    var flag = false;
    if (flag) {
        return false;
    }
    if (str.length == 0) {
        //document.getElementById("txtReporter").innerHTML="";
        return false;
    }
    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    }
    else {// code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

            document.getElementById("task_list").innerHTML = xmlhttp.responseText;
            //document.getElementById('txtReporter').onclick();
            //alert(str)
            //flag = true;
            //return false
            //alert(xmlhttp.responseText)
            //$('#search_task').after(xmlhttp.responseText)

        }
    };

    xmlhttp.open("GET", "/" + project_id + "/search_parent_task?q=" + str, true);
    xmlhttp.send();
    flag = true;
}




//ajax search_task change_parent_task
function show_copy_project(str)
{
    var xmlhttp;
    var project_id = $('#copy_project_id').val();
    var flag = false;
    if(flag){
        return false;
    }
    if (str.length==0)
    {
        //document.getElementById("txtReporter").innerHTML="";
        return false;
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

            document.getElementById("project_copy_list").innerHTML=xmlhttp.responseText;
            //document.getElementById('txtReporter').onclick();
            //alert(str)
            //flag = true;
            //return false
            //alert(xmlhttp.responseText)
            //$('#search_task').after(xmlhttp.responseText)

        }
    };

    xmlhttp.open("GET","/"+project_id+"/search_project?q="+str,true);
    xmlhttp.send();
    flag = true;
}

//ajax search_task change_parent_task
function show_move_project(str)
{
    var xmlhttp;
    var project_id = $('#move_project_id').val();
    var flag = false;
    if(flag){
        return false;
    }
    if (str.length==0)
    {
        //document.getElementById("txtReporter").innerHTML="";
        return false;
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

            document.getElementById("project_move_list").innerHTML=xmlhttp.responseText;
            //document.getElementById('txtReporter').onclick();
            //alert(str)
            //flag = true;
            //return false
            //alert(xmlhttp.responseText)
            //$('#search_task').after(xmlhttp.responseText)

        }
    };

    xmlhttp.open("GET","/"+project_id+"/search_project?q="+str,true);
    xmlhttp.send();
    flag = true;
}