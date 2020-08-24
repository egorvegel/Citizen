$(function(){
   $('.main_slider').slick({
        arrows: true,
        dots: true,
        prevArrow: '<button id="prev" type="button" class="btn slick-prev"><i class="fa fa-chevron-left" aria-hidden="true"></i></button>',
        nextArrow: '<button id="next" type="button" class="btn slick-next"><i class="fa fa-chevron-right" aria-hidden="true"></i></button>',
        autoplay: true, 
        autoplaySpeed:  3000,//  По умолчанию - 3к
    });
    $('.addition_slider').slick({
        arrows: true,
        dots: true,
        prevArrow: '<button id="prev" type="button" class="btn slick-prev"><i class="fa fa-chevron-left" aria-hidden="true"></i></button>',
        nextArrow: '<button id="next" type="button" class="btn slick-next"><i class="fa fa-chevron-right" aria-hidden="true"></i></button>',
        autoplay: true, 
        autoplaySpeed:  3000,//  По умолчанию - 3к
    });

    /* Кнопка наверх */
    let btnUp = $('.btn_Up');
    btnUp.on('click', function(evt){
        evt.preventDefault();
        $('html, body').animate({
            scrollTop: 0,
        }, 1000);
    })
    let checkBtn = function(){
        if($(this).scrollTop() > 900){
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

    /* Всплытие новостей */
    let item = $('.news_items_item')
    $(item).mouseenter(function(){
        console.log(this);
        $(this).find('.content_text').show(300);
    }).mouseleave(function(){
        $(this).find('.content_text').hide(300);
        
    })

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


    

    /* Управление картами */
    let overlay = $('.map_overlay');
    $('.map_lock').on('click', function(){
        $('.map_open').toggleClass('unvisible');
        $('.map_close').toggleClass('unvisible');
        if($('.map_open').hasClass('unvisible')){
            $(overlay).css('z-index', '0');
        }else{
            $(overlay).css('z-index', '5');
        }
    })
})