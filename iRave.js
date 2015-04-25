var nope = false;
var swiperH;
var swiperV;

var swiperV2;
var swiperVProcurar;
var valorCompra;
var itemsCompra = [];
var itemsComprados = [];
var elSlides;

$(document).ready(function() {

    //var elem = document.getElementById('slider');   
    //window.mySwipe = new Swipe(elem, {});

    //$("#activities").click(function(){
    //    $("#body").load("activities.html");
    //    $('div img').draggable();
    //});

    // fix checkbox detect
    var el = $('input:checkbox[name="compra"]');
    el.each(function() {
        $(this).on('click', function(event) {
            event.stopPropagation();

        });

    });



    swiperH = new Swiper('.swiper-container-h', {
        onlyExternal: true,
        //setWrapperSize:true
    });

    swiperV = new Swiper('.swiper-container-v', {

        pagination: '.swiper-pagination-v',
        paginationClickable: true,
        direction: 'vertical',
        slidesPerView: 3,
        slidesPerScroll: 1,

        freeMode: true,
        freeModeMomentum: false

    });

    swiperV2 = new Swiper('.swiper-container-v2', {
        pagination: '.swiper-pagination-v2',
        paginationClickable: true,
        direction: 'vertical',
        slidesPerView: 3,
        slidesPerScroll: 1,

        freeMode: true,
        freeModeMomentum: false

    });


    swiperVProcurar = new Swiper('.swiper-container-vProcurar', {
        pagination: '.swiper-pagination-vProcurar',
        paginationClickable: true,
        direction: 'vertical',
        slidesPerView: 4,
        slidesPerScroll: 2,

        freeMode: true,
        freeModeMomentum: false

    });

    swiperV3 = new Swiper('.swiper-container-v3', {
        pagination: '.swiper-pagination-v3',

        direction: 'vertical',
        slidesPerView: 1,
        slidesPerScroll: 1,

        freeMode: true,
        freeModeMomentum: false

    });

    elSlides = swiperH.slides;


    /*
    var menu_offset = $('#menu').offset();
    var altura_entrada_menu = $("ul.list > li ").height();
                                         //so funciona num ecra
    var menu_offset_top1 = menu_offset.top - (5.65 * altura_entrada_menu);
    var menu_offset_top2 = menu_offset.top;
    
    //var nope = false;
   //ajuda a nao clicar quando se faz drag    
    $('.draggable').draggable({
        axis: "y", containment: [0, menu_offset_top1, 0, menu_offset_top2],
        start: function() {
            nope = true;
        },
        stop: function(event, ui) {
            $( event.toElement ).one('click', function(e){ e.stopImmediatePropagation(); } );
            setTimeout(function() {
             nope = false;
          }, 200);
        }
    });
    */



    /* mapa e derivados */
    $('#mapa').draggable();

    $('#iconFood').click(function() {
        comida();
    });


    $('.compras').click(function() {
        //$('input[type=checkbox]').attr('checked', false);
        var checkbox = $('input[type=checkbox]').eq($(this).index('.compras'));
        var alerte = !checkbox.is(':checked');
        checkbox.prop('checked', alerte);
    });

    $('ul.list > li ').click(function() {

        if (nope == false) {
            var _that = $(this);
            $(this).addClass('highlighted');
            setTimeout(function() {
                _that.removeClass('highlighted');
            }, 200);
        }
    });


    //add highlight no menu
    $('.menu_entrada').click(function() {
        if (nope == false) {
            var _that = $(this);
            $(this).addClass('highlighted');
            setTimeout(function() {
                _that.removeClass('highlighted');
            }, 200);
        }
    });

    //add highlight no perfil
    $('.perfil_entrada').click(function() {
        if (nope == false) {
            var _that = $(this);
            $(this).addClass('highlighted');
            setTimeout(function() {
                _that.removeClass('highlighted');
            }, 200);
        }
    });


    //add highlight no botao para add. amigos
    $('.botao').click(function() {
        if (nope == false) {
            var _that = $(this);
            $(this).addClass('highlighted');
            setTimeout(function() {
                _that.removeClass('highlighted');
            }, 200);
        }
    });

    /*
    //add highlight no botao para add. amigos
    $('.joao_add_amigos').click(function() {
        if (nope == false) {
            var _that =  $(this);
            $(this).addClass('highlighted');
            setTimeout(function() {
                  _that.removeClass('highlighted');
              }, 200);
        }
    });
    
    */




    //funcao que mostra o tempo

    function checkTime(i) {
        return (i < 10) ? "0" + i : i;
    }

    function startTime() {
        var today = new Date(),
            h = checkTime(today.getHours()),
            m = checkTime(today.getMinutes()),
            s = checkTime(today.getSeconds());
        document.getElementById('horas').innerHTML = h + ":" + m;
        var t = setTimeout(function() {
            startTime();
        }, 500);
    }
    startTime();



});



var nome = ["Menu",
    "<img src='img/user1.png' class='imgTitulo'> Perfil", //1
    "<img src='img/add-user.png' class='imgEntrada'> Add. Amigos", //2
    "<img src='img/add-user.png' class='imgEntrada'> Add. Amigos", //3
    "<img src='img/add-user.png' class='imgEntrada'> Add. Amigos",
    "<img src='img/multy-user.png' class='imgEntrada'> Lista Amigos", //5
    "<img src='img/user1.png' class='imgTitulo'> João",
    "<img src='img/shield.png' class='imgEntrada'> Protegido", // 7
    "Procurar", //8
    "Comes/Bebes",
    "Comes/Bebes", //10
    "Comes/Bebes",
    "<img src='img/map-2.png' class='imgEntrada'> Mapa",
    "<img src='img/hands-free.png' class='imgEntrada'> Mão Livre"
];

//              0  1  2  3 4 5 6 7 8 9 10 11 12 13            
var prevEcra = [0, 0, -1, 2, 1, 1, 5, 7, 0, -1, 9, 1, 0, 0];

var current_i = 0;
var previous_i = 0;

var joao_added = 0;
var joao_protected = 0;
var hf_on = 0;

function mudarNome(i) {
    $("#titulo_menu").html(nome[i]);
}

function prev() {
    var thePrev;
    if (nope != false) {
        return false;
    }

    /*
    if (previous_i == -1){

        goToSlide(1);
        
        previous_i = 0;
    }
        */
    thePrev = prevEcra[current_i];
    if (thePrev === -1) {

        console.log(-1 + " $$$$$$");
        console.log(nome[current_i] + "(" + current_i + " -> " + nome[previous_i] + "(" + prevEcra[previous_i]);
        goToSlide(previous_i);

    } else {
        console.log(prevEcra[current_i]);
        //current_i -1
        console.log(nome[current_i] + "(" + current_i + " -> " + nome[prevEcra[current_i]] + "(" + prevEcra[current_i]);
        goToSlide(prevEcra[current_i]);

    }


}

function next() {

    if (nope != false) {
        return false;
    }

    if (current_i < nome.length - 1) {

        goToSlide(current_i + 1);

    }

}

function goToSlide(i) {


    // clean button
    if (current_i === 9)
        $("#botContinuar").css("display", "none");
    else if (current_i === 10) {
        $("#botVoltarConfirmar").css("display", "none");
    }


    for (j = 0; j < elSlides.length; j++) {
        if (j != i)
            $(elSlides[j]).css("visibility", "hidden");
        else
            $(elSlides[j]).css("visibility", "visible");
    }


    previous_i = current_i;
    if (i >= 0 && i <= nome.length - 1) {
        if (i !== 12) {
            $('#mapa').css("opacity", 0);
        } else {
            $('#mapa').css("opacity", 1);
        }
        current_i = i;
        mudarNome(current_i);

        swiperH.slideTo(i);

    }

}

function goToSix() {
    goToSlide(5);

    //previous_i = -1;

    if (joao_added === 1) {
        //$("#lista_joao").html("<p style=\"text-align:center\" >João" );

        if (joao_protected == 1) {
            $("#lista_joao").html("<div onclick='next();return false;' class='menu_entrada'> \
                      <img src='img/user1.png ' class='imgEntrada '> \
                João \ <img src='img/shield.png ' class='imgEntrada '>  \
           </div>  ");
        } else {
            $("#lista_joao").html("<div onclick='next();return false;' class='menu_entrada'> \
                      <img src='img/user1.png ' class='imgEntrada '> \
                João \
           </div>  ");
        }
    } else
        $("#lista_joao").html("<p style=\"text-align:center\" >Não tem amigos");

}

function goToMenu() {
    goToSlide(0);

}

function protectJoao() {
    joao_protected = 1;
}

function unprotectJoao() {
    joao_protected = 0;
}

function adicionarJoao() {
    joao_added = 1;
}

function removerJoao() {
    joao_added = 0;

}

// opcoes do menu principal 
function mapa() {
    // $( '.placeholder').load( 'mapa.html' );
    //mudarNome(12);
    goToSlide(12);
}

function procurar() {
    //mudarNome(8);
    goToSlide(8);

}

function horario() {

}

function maolivre() {
    goToSlide(13);
}

//opcoes do procurar



function amigos() {

    goToSix();

}

function addAmigos() {

    goToSlide(2);

}

function comida() {
    valorCompra = 0;
    itemsCompra = [];
    //mudarNome(9);
    goToSlide(9);
    $("#botContinuar").css("display", "block");
}

function banho() {


}

function eventos() {

}

function cartaz() {

}

function continuarCompra() {
    var num, value = 0,
        string, thisValue;
    var el = $('input:checkbox[name="compra"]');



    el.each(function() {
        if ($(this).is(':checked')) {
            //var alerte = !$(this).is(':checked');
            //$(this).prop('checked', alerte);

            num = parseFloat($(this).prop("value"));
            string = $(this).attr("produ") + ": " + $(this).prop("value") + "€";


            string = "<div class='swiper-slide menu_entrada'>" + string + "</div>";

            itemsCompra.push(string);
            //alert(string);
            value = value + num;
        }

    });
    //////////////////////////////////////     DIZER que nao tem nada selecionado, seleccionar algo
    if (value === 0)
        return false;

    valorCompra = value;
    $("#exchangeCompra").html("Total Pedido: " + value + "€");
    var i;
    for (i = 0; i < itemsCompra.length; i++) {
        $("#exchangeCompra").append(itemsCompra[i]);
    }

    $("#exchangeCompra").append("<div class='menu_entrada '></div>");
    $("#exchangeCompra").append("<div class='swiper-slide '></div>");

    //alert(value);
    //alert(itemsCompra);
    $("#botContinuar").css("display", "none");
    $("#botVoltarConfirmar").css("display", "flex"); // ou flex ?


    next();



}


function voltarCompra() {
    value = 0;
    itemsCompra = [];
    $("#botContinuar").css("display", "block");
    $("#botVoltarConfirmar").css("display", "none");


    prev();

}

function efectuarCompra() {
    $("#botVoltarConfirmar").css("display", "none");
    itemsComprados = itemsComprados.concat(itemsCompra);

    //clean check boxes

    var el = $('input:checkbox[name="compra"]');
    el.each(function() {
        if ($(this).is(':checked')) {
            var alerte = !$(this).is(':checked');
            $(this).prop('checked', alerte);

        }

    });

    next();
}

function hf_mapa() {
    if (hf_on == 1) {
        mapa();
    }
}


$(document).keydown(function(e) {
    switch (e.keyCode) {
        case 40:
            break;
        case 38:
            $("#botContinuar").css("display", "none");
            goToMenu();
            break;
        case 39:
            next();
            break;
        case 37:
            prev();
            break;
    }
});