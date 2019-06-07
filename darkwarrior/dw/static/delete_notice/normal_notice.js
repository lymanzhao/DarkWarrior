/**
 * Created by bbb on 2016/8/3.
 */

$('.show_cover').click(function(){
        $(this).next().append('<div id="cover_div" style="background-color: rgba(0,0,0,0.3);z-index:9999;position: fixed;top:0;left:0;width: 100%;height: 100%;">'+
                               '<div style="width: 500px;height: 280px;background-color:white;border-radius: 4px;position: fixed;left:35%;top:27%;" id="notice_div">'+
                               '<div style="width: 70%;border:0px solid #d1d1d1;margin: auto ;padding-top: 100px;" align="center">'+
                                '<h2>是否确定？</h2>'+
                                '<span style="color: #808080;">'+$(this).next().children().first().text()+'</span>'+
                                '</div>'+

                                '<div style="margin-top: 10px;" align="center">'+
                                '<input type="button" value="取消" style="background-color: #00b900;color: white;border:none;height: 40px;width: 60px;font-size: 15px;" id="close_cover">'+
                                '<input type="submit" value="是的，确定！" name="delete_team" style="background-color: #dbbc39;color: white;border:none;height: 40px;width: 100px;font-size: 15px;margin-left:5px;">'+
                                 '</div>'+
                                 '</div>'+

                                 '</div>')
    });
$('.show_cover').next().delegate('#close_cover','click',function(){
    $(this).parents().find('#cover_div').remove()
});



