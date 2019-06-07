/**
 * Created by root on 10/12/16.
 */


    $(document).ready(function () {


        //任务状态下拉控件
        var make_index = false;
        if($('.change_sel').length>1){
            make_index = true;
        }

        var select_height= 38;
        var speed = 80;
        var main_color = '#979797';
        var select_color = '#e2e2e2';

        function change_sel() {
            $('.change_sel').each(function () {
                var now_ = $(this);
                now_.hide();
                now_.after('<div style="border:0px solid darkgrey;width: auto;background: white;height:0px;'+select_height+'px;"></div>');
                var sel_selected = false;
                now_.children().each(function () {
                   //alert($(this).attr('selected'))
                    if($(this).attr('selected')){
                        sel_selected = true;
                    }
                });
                if(sel_selected){
                    now_.children().each(function () {

                       if($(this).attr('selected')=='selected'){
                           now_.next().prepend('<div style="border:0px solid rebeccapurple;z-index: 99;background: '+main_color+';color: #ffffff;position: relative;top: auto;' +
                                   'height: '+select_height+'px;align-content: center;cursor:default;line-height:'+select_height+'px;" class="show_select" align="center" judge="show">'+$(this).text()+'</div>')
                       }
                       else{
                           now_.next().append('<div style="border:0px solid rebeccapurple;position: relative;line-height:'+select_height+'px;' +
                                   'top: -'+$(this).index()*select_height+'px;background: '+select_color+';color: black;height: '+select_height+'px;align-content: center;' +
                               'cursor:default;z-index: 98;" class="sel" align="center" hidden="hidden">'+$(this).text()+'</div>')
                       }

                   })
                }
                else{

                    now_.children().each(function () {

                       if($(this).index()==0){
                           now_.next().append('<div style="border:0px solid rebeccapurple;z-index: 99;background: '+main_color+';color: #ffffff;position: relative;top: auto;' +
                                   'height: '+select_height+'px;align-content: center;cursor:default;line-height:'+select_height+'px;" class="show_select" align="center" judge="show">'+$(this).text()+'</div>')
                       }
                       else{
                           now_.next().append('<div style="border:0px solid rebeccapurple;position: relative;line-height:'+select_height+'px;' +
                                   'top: -'+$(this).index()*select_height+'px;background: '+select_color+';color: black;height: '+select_height+'px;align-content: center;' +
                               'cursor:default;z-index: 98;" class="sel" align="center" hidden="hidden">'+$(this).text()+'</div>')
                       }

                   })
                }

           });
        }
        change_sel();

        $('.sel').mouseover(function () {
              $(this).css({'background':'#BCBCBC','color':'white'});

        });
        $('.sel').mouseout(function () {
              $(this).css({'background':select_color,'color':'black'});
        });


        $('.show_select').click(function () {
            var now_ = $(this);
            now_.nextAll().show();
            var num = parseInt($(this).siblings('.sel').length);

            if(now_.attr('judge')=="show"){
                if(make_index){
                    now_.nextAll().css('z-index',100);
                }
                now_.nextAll().each(function () {
                    var index_ = $('.sel').index($(this));
                    setTimeout("$('.sel').eq("+index_+").animate({top:0},100)",speed*(num-parseInt($(this).index())));
                });
                now_.attr('judge','');
            }
            else{
                 if(make_index){
                    now_.nextAll().css('z-index',98);
                 }
                 now_.nextAll().each(function () {
                    var index_ = $('.sel').index($(this));
                    setTimeout("$('.sel').eq("+index_+").animate({top:-"+select_height*(parseInt($(this).index()))+"},100)",speed*(parseInt($(this).index())-1));
                });
                now_.attr('judge','show');
            }

        });

        $('.sel').click(function () {
            var show_value = $(this).siblings('.show_select').text();
            var select_value = $(this).text();
            $(this).html(show_value);
            $(this).siblings('.show_select').html(select_value);
            $(this).parent().prev().children().each(function () {
                if($(this).text()==select_value){
                    $(this).attr('selected','selected')
                }
            });

            var now_ = $(this).siblings('.show_select');
            now_.nextAll().each(function () {
                    var index_ = $('.sel').index($(this));
                    setTimeout("$('.sel').eq("+index_+").animate({top:-"+select_height*(parseInt($(this).index()))+"},100)",speed*(parseInt($(this).index())-1));
            });
            if(make_index){
                now_.nextAll().css('z-index',98);
            }
            now_.attr('judge','show');
        });
        //任务状态下拉控件 -end

    });

