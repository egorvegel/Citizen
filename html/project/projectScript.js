$(function(){
    /* Проверка формы */
    $('.mail #checkbox').on('change',  function(){
        if($(this).is(':checked')){
            $('.mail_form_submit').prop('disabled', false);
        }else{
            $('.mail_form_submit').prop('disabled', true);
        }
    })

    let inputs = $('.mail_form_input');
    $(inputs).on('change',function(){
        for(var i = 0;  i < inputs.length; i++){;
            if($(inputs[i]).val() == ''){
                console.log(this);
                $(inputs[i]).addClass('false').removeClass('true');
            }else{
                $(inputs[i]).addClass('true').removeClass('false');
            }
        }
    })
    $('.mail_form').on('submit', function(evt){
        for(var i = 0;  i < inputs.length; i++){
        if($(inputs[i]).val() == ''){
                evt.preventDefault();
                $(inputs[i]).addClass('false').removeClass('true');
        }
        } 
    })

    /* Кнопка наверх */
    let btnUp = $('.btn_Up');
    btnUp.on('click', function(evt){
        evt.preventDefault();
        $('html, body').animate({
            scrollTop: 0,
        }, 1000);
    })
    let checkBtn = function(){
        if($(this).scrollTop() > 500){
            $(btnUp).show(300);
        }else{
            $(btnUp).hide(300);
        }
    }
    $(window).scroll(function(){
        checkBtn();
    })
    checkBtn();

    /* Меню */
    $('.nav_linkShow').on('click', function(){
        $('.nav_wrapper').slideToggle(300);
        $('.nav_linkHide').fadeIn(300);

        $('.overlay').removeClass('unvisible');
    });
    $('.nav_linkHide').on('click', function(){
        $(this).fadeOut(300);
        $('.nav_wrapper').slideToggle(300);
        $('.overlay').addClass('unvisible');
    });
    $('.overlay').on('click', function(){
        $('.nav_wrapper').slideToggle(300);
        $('.overlay').addClass('unvisible');
    });
})