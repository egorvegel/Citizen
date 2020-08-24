$(function(){
    let range = $(".parameter_item_range");
    range.ionRangeSlider({
        type: "double",
        min: 2.00,
        max: 4.00,
        step: 0.01,
        from: 2.00,
        to: 4.00,
    });

    /* Стилизация чекбоксок*/ 
    let checkboxes = $('.option_checkbox' );
    let labels = $('.option_wrap' );
    checkboxes.on('change', function(){
        for(let i = 0; i < checkboxes.length; i++){
            if($(checkboxes[i]).is(':checked')){
                $(labels[i]).removeClass('option_wrap').addClass('option_wrap_check');
            }else{
                $(labels[i]).removeClass('option_wrap_check').addClass('option_wrap');
            }
        }
    })

    /* Выборка квартир по параметрам*/ 

    $('.parameter_item_link').on('click', function(evt){
        evt.preventDefault();    
    
        let fValidate = $('#first').is(':checked');
        let sValidate = $('#second').is(':checked');
        let tValidate = $('#third').is(':checked');
        
        if(fValidate && sValidate && tValidate){
            console.log(1);
            $('[data-flat="1"], [data-flat="2"], [data-flat="3"]').css('display', 'table-row').nextAll().css('display', 'table-row');
        }
        else if(fValidate && sValidate){
            $('[data-flat="1"], [data-flat="2"]').css('display', 'table-row').nextAll().css('display', 'table-row');
            $('[data-flat="3"]').css('display', 'none').nextAll().css('display', 'none');
        }
        else if(sValidate && tValidate){
            $('[data-flat="1"]').css('display', 'none').nextAll().css('display', 'none');
            $('[data-flat="2"]').css('display', 'table-row').nextAll().css('display', 'table-row');
        }
        else if(fValidate && tValidate){
            $('[data-flat="1"]').css('display', 'table-row').nextAll().css('display', 'table-row');
            $('[data-flat="2"]').css('display', 'none').nextAll().css('display', 'none');
            $('[data-flat="3"]').css('display', 'table-row').nextAll().css('display', 'table-row');    
        }
        else if(fValidate){
            $('[data-flat="1"]').css('display', 'table-row').nextAll().css('display', 'table-row');
            $('[data-flat="2"]').css('display', 'none').nextAll().css('display', 'none');
        }
        else if(sValidate){
            $('[data-flat="1"]').css('display', 'none').nextAll().css('display', 'none');
            $('[data-flat="2"]').css('display', 'table-row').nextAll().css('display', 'table-row');
            $('[data-flat="3"]').css('display', 'none').nextAll().css('display', 'none');
        }
        else if(tValidate){
            $('[data-flat="1"]').css('display', 'none').nextAll().css('display', 'none');
            $('[data-flat="3"]').css('display', 'table-row').nextAll().css('display', 'table-row');
        }

        pricing();
        num();

    })
    /* Выбор цены в желтой рамке */
    let tableData = $('td[data-pricing]');
    function pricing(){
        let from = ($('.irs-from').text());
        let to = ($('.irs-to').text());
        from = from * 1000000;
        to = to * 1000000;


        tableData.each(function(){
            let num = $(this).text();
            num = parseInt(String(num).replace(/ /g, ''));;
            if(!(num > from && num < to)){
                $(this).parent().css('display', 'none');
            }
        })
    }

    /* Счетчик квартир */ 
    function num(){
        let count = 0;
        $('.table_normal').each(function(){
            if(($(this).css('display') != "none")){
                count++;
            }        
        })
        $('.argument_item_num').text(count);
    }
    num();


    /* Сортировка таблицы*/
    let flat = [];
    let flat1 = [];
    let flat2 = [];
    let liters, floor,  room,  square, price;
    $('.table_normal').css('display', 'table-row');

    let sumFlats = ['first', 'second', 'third'];
    let flats = [flat, flat1, flat2];
    $('.argument_item_link').on("click", function(evt){
        evt.preventDefault(); 
        for(let i = 0; i < 3; i++){
            liters = $('.table_normal[style="display: table-row;"] td[data-liter-' + sumFlats[i] +']');
            floor = $('.table_normal[style="display: table-row;"] td[data-floor-' + sumFlats[i] +']');
            room = $('.table_normal[style="display: table-row;"] td[data-room-' + sumFlats[i] +']');
            square = $('.table_normal[style="display: table-row;"] td[data-square-' + sumFlats[i] +']');
            price = $('.table_normal[style="display: table-row;"] td[data-pricing-' + sumFlats[i] +']');
            
            for(let n = 0; n < price.length; n++){
                let obj;
                if(flats[i].length < price.length){
                    obj = new Object;
                    obj.liter = liters[n].textContent;   
                    obj.floor = floor[n].textContent;     
                    obj.room = room[n].textContent;  
                    obj.square = square[n].textContent;  
                    obj.price = price[n].textContent.replace('₽', '');  
                    flats[i].push(obj);
                }else{
                    flats[i][n].liter = liters[n].textContent;   
                    flats[i][n].floor = floor[n].textContent;     
                    flats[i][n].room = room[n].textContent;  
                    flats[i][n].square = square[n].textContent;  
                    flats[i][n].price = price[n].textContent.replace('₽', '');  
                }
            }
            console.log(price[i]);


/*
            if(flats[i].length > price[i].length || flats[i].length > price[i+1].length || flats[i].length > price[i+2].length){
                let variable = flats[i].length - price[i].length;
                for(let i = 0; i < variable; i++){
                    flats[i].pop();
                }
            }*/
            let optionSelected = $("[name=choose1]").find("option:selected");
            if($(optionSelected).text() === 'Возрастанию'){
                tableSortUp("[name=choose]", flats[i]);
            }else{
                tableSortDown("[name=choose]", flats[i]);
            }
            console.log(flats[i]);

            for(var k = 0; k < price.length; k++){  
                liters[k].textContent = flats[i][k].liter;
                floor[k].textContent = flats[i][k].floor;
                room[k].textContent = flats[i][k].room;
                square[k].textContent = flats[i][k].square;
                price[k].textContent = flats[i][k].price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + ' ₽';
            }
        }

        /* Функции подсчета  */ 
        function tableSortDown(selector, arr){
            let optionSelected = $(selector).find("option:selected");
            if($(optionSelected).text() === 'Литеру'){
                arr.sort(function (a, b) {
                    return b.liter - a.liter;          
                });
            }else if($(optionSelected).text() === 'Этажу'){
                arr.sort(function (a, b) {
                    return b.floor - a.floor;          
                });
            }else if($(optionSelected).text() === 'Общей площади'){
                arr.sort(function (a, b) {        
                    return b.square - a.square;          
                 });
            }else if($(optionSelected).text() === 'Стоимости'){
                if(arr == price[i]){
                    for(var i = 0; i < price1.length; i++){
                        arr[i].price = parseInt(String(arr[i].price).replace(/ /g, ''));
                    } 
                }else{
                    for(var i = 0; i < price.length; i++){
                        arr[i].price = parseInt(String(arr[i].price).replace(/ /g, ''));
                    } 
                }
  
                arr.sort(function (a, b) {
                    return b.price - a.price;          
                });
            }
        }

        function tableSortUp(selector, arr){
            let optionSelected = $(selector).find("option:selected");
            if($(optionSelected).text() === 'Литеру'){
                arr.sort(function (a, b) {
                    return a.liter - b.liter;          
                });
            }else if($(optionSelected).text() === 'Этажу'){
                arr.sort(function (a, b) {
                    return a.floor - b.floor;          
                });
            }else if($(optionSelected).text() === 'Общей площади'){
                arr.sort(function (a, b) {        
                    return a.square - b.square;          
                 });
            }else if($(optionSelected).text() === 'Стоимости'){

                if(arr == price[i]){
                    for(var i = 0; i < price1.length; i++){
                        arr[i].price = parseInt(String(arr[i].price).replace(/ /g, ''));
                    } 
                }else{
                    for(var i = 0; i < price.length; i++){
                        arr[i].price = parseInt(String(arr[i].price).replace(/ /g, ''));
                    } 
                } 
                arr.sort(function (a, b) {
                    return a.price - b.price;          
                });
            }
        }      
        
    })

    /* PopUp */
    $('.table_normal_link').on('click',  function(evt){
        evt.preventDefault();
        $('.popUp').removeClass('unvisible');
        $('.overlay').removeClass('unvisible');
    });

    $('.overlay').on('click', function(){
        $('.popUp').addClass('unvisible');
        $('.overlay').addClass('unvisible');
        $('.nav_wrapper').slideToggle(300);
    })

    let inputs = $('.popUp_form_text');
    $('.popUp_form_submit').on('click', function(evt){
        for(let j = 0; j < inputs.length; j++){
            if($(inputs[j]).val() == ''){
                evt.preventDefault();
                $(inputs[j]).addClass('false').removeClass('true');
            }else{
                $(inputs[j]).addClass('true').removeClass('false');
            }
        }
    })

    $('.popUp_close').on('click', function(evt){
        evt.preventDefault();
        $('.popUp').addClass('unvisible');
        $('.overlay').addClass('unvisible');
    })


    /* Проверка формы */
    $('.mail #checkbox').on('change',  function(){
        if($(this).is(':checked')){
            $('.mail_form_submit').prop('disabled', false);
        }else{
            $('.mail_form_submit').prop('disabled', true);
        }
    })

    let inputs1 = $('.mail_form_input');
    $(inputs1).on('change',function(){
        for(var i = 0;  i < inputs1.length; i++){;
            if($(inputs1[i]).val() == ''){
                $(inputs1[i]).addClass('false').removeClass('true');
            }else{
                $(inputs1[i]).addClass('true').removeClass('false');
            }
        }
    })
    $('.mail_form').on('submit', function(evt){
        for(var i = 0;  i < inputs1.length; i++){
        if($(inputs1[i]).val() == ''){
                evt.preventDefault();
                $(inputs1[i]).addClass('false').removeClass('true');
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
})
