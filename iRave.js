var nope = false;
var swiperH;
var swiperV;

var swiperV2;
var swiperVProcurar;
var valorCompra;
var itemsCompra = [];

$(document).ready(function() {

   //var elem = document.getElementById('slider');   
    //window.mySwipe = new Swipe(elem, {});

    //$("#activities").click(function(){
    //    $("#body").load("activities.html");
    //    $('div img').draggable();
    //});
    
    
    swiperH = new Swiper('.swiper-container-h', {
        onlyExternal: true,
        //setWrapperSize:true
    });
    
    swiperV = new Swiper('.swiper-container-v', {

        pagination: '.swiper-pagination-v',
        paginationClickable: true,
        direction: 'vertical',
        slidesPerView:3,
        slidesPerScroll:1,

        freeMode: true,
        freeModeMomentum: false
        
    });
    
        swiperV2 = new Swiper('.swiper-container-v2', {
        pagination: '.swiper-pagination-v2',
        paginationClickable: true,
        direction: 'vertical',
        slidesPerView:3,
        slidesPerScroll:1,
 
        freeMode: true,
        freeModeMomentum: false
        
    });
    
    
        swiperVProcurar = new Swiper('.swiper-container-vProcurar', {
        pagination: '.swiper-pagination-vProcurar',
        paginationClickable: true,
        direction: 'vertical',
        slidesPerView:4,
        slidesPerScroll:2,
 
        freeMode: true,
        freeModeMomentum: false
        
    });
    
        swiperV3 = new Swiper('.swiper-container-v3', {
        pagination: '.swiper-pagination-v3',
   
        direction: 'vertical',
        slidesPerView:1,
        slidesPerScroll:1,
 
        freeMode: true,
        freeModeMomentum: false
        
    });
    
    
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
    

    $('.compras').click(function(){
        //$('input[type=checkbox]').attr('checked', false);
        var checkbox = $('input[type=checkbox]').eq($(this).index('.compras'));
        var alerte = !checkbox.is(':checked');
        checkbox.prop('checked', alerte);
    });
    
    $('ul.list > li ').click(function() {
       
        if (nope == false) {
            var _that =  $(this);
            $(this).addClass('highlighted');
            setTimeout(function() {
                  _that.removeClass('highlighted');
              }, 200);
        }
    });
    
    
    //add highlight no menu
    $('.menu_entrada').click(function() {
        if (nope == false) {
            var _that =  $(this);
            $(this).addClass('highlighted');
            setTimeout(function() {
                  _that.removeClass('highlighted');
              }, 200);
        }
    });
    
    //add highlight no perfil
    $('.perfil_entrada').click(function() {
        if (nope == false) {
            var _that =  $(this);
            $(this).addClass('highlighted');
            setTimeout(function() {
                  _that.removeClass('highlighted');
              }, 200);
        }
    });
    
    
    //add highlight no botao para add. amigos
    $('.botao').click(function() {
        if (nope == false) {
            var _that =  $(this);
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
        var t = setTimeout(function () {
            startTime();
        }, 500);
    }
    startTime();

   
   
});


    
var nome = ["Menu", 
            "<img src='img/user1.png' class='imgTitulo'> Perfil", 
            "<img src='img/add-user.png' class='imgEntrada'> Add. Amigos",
            "<img src='img/add-user.png' class='imgEntrada'> Add. Amigos",
            "<img src='img/add-user.png' class='imgEntrada'> Add. Amigos", 
            "<img src='img/multy-user.png' class='imgEntrada'> Lista Amigos",
            "<img src='img/user1.png' class='imgTitulo'> João",
            "<img src='img/shield.png' class='imgEntrada'> Protegido",
            "Procurar",
            "Comes/Bebes",
            "Comes/Bebes",
            "Comes/Bebes",
            "<img src='img/map-2.png' class='imgEntrada'> Mapa",
            "<img src='img/hands-free.png' class='imgEntrada'> Mão Livre"];
            
var current_i = 0;
var previous_i = 0;

var joao_added = 0;
var joao_protected = 0;
function mudarNome(i) {
        $("#titulo_menu").html(nome[i]);
}

function prev() {
    if (nope != false) {
        return false;
    }
    
    
    if (previous_i == -1){
        
        //current_i = 1;
        //mudarNome(current_i);
        goToSlide(1);
        
        previous_i = 0;
    }
        
    
    else if(current_i !== 0){
        //current_i = current_i -1;
        //mudarNome(current_i);
        goToSlide(current_i -1); 
    // mySwipe.prev();
    }
        
}

function next() {
    
      if (nope != false) {
        return false;
    }
    
    //if(!wasDragging){
       if(current_i < nome.length -1) {
           //current_i = current_i +1;
           //mudarNome(current_i);
           goToSlide(current_i +1);
         //mySwipe.next();
       }
    //}
}

function goToSlide(i) {
    if(i >= 0 && i <= nome.length -1 ){
        if (i !== 12) {
            $('#mapa').css("display", "none");
        }
        else {
            $('#mapa').css("opacity", 1);
        }
        current_i = i;
        mudarNome(current_i);
         
         swiperH.slideTo(i);
    //mySwipe.slide(i, 300);
    }
        
}

function goToSix() {
    current_i = 5;
    //mudarNome(current_i);
     goToSlide(current_i);
    //mySwipe.slide(current_i, 300);
    previous_i = -1;
    
    if (joao_added === 1){
        //$("#lista_joao").html("<p style=\"text-align:center\" >João" );
        
        if (joao_protected == 1) {
            $("#lista_joao").html("<div onclick='next();return false;' class='menu_entrada'> \
                      <img src='img/user1.png ' class='imgEntrada '> \
                João \ <img src='img/shield.png ' class='imgEntrada '>  \
           </div>  " );
        }
        
        else {
            $("#lista_joao").html("<div onclick='next();return false;' class='menu_entrada'> \
                      <img src='img/user1.png ' class='imgEntrada '> \
                João \
           </div>  " );
        }
    }
    else
        $("#lista_joao").html("<p style=\"text-align:center\" >Não tem amigos" );
    
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
    var num, value=0, string, thisValue;
        var el=$('input:checkbox[name="compra"]');
        
        
              
        el.each(function()
        {
            if($(this).is(':checked')) {
                var alerte = !$(this).is(':checked');
                $(this).prop('checked', alerte);
                
                num = parseFloat($(this).prop("value"));
                string = $(this).attr("produ") + ": " + $(this).prop("value") +"€";
                
                
                string = "<div class='swiper-slide menu_entrada'>" + string + "</div>";
                
                itemsCompra.push(string);
                //alert(string);
                value = value + num;
            }

        });
        //////////////////////////////////////     DIZER que nao tem nada selecionado, seleccionar algo
        if (value===0)
            return false;
        
        valorCompra = value;
        $( "#exchangeCompra" ).html("Total Pedido: " + value +"€");
        var i;
        for (i = 0; i < itemsCompra.length; i++) { 
            $( "#exchangeCompra" ).append( itemsCompra[i] );
        }
        
        $( "#exchangeCompra" ).append("<div class='menu_entrada '></div>");
        $( "#exchangeCompra" ).append("<div class='swiper-slide '></div>");
                    
        //alert(value);
        //alert(itemsCompra);
        $("#botContinuar").css("display", "none");
        
        
         $("#botVoltarConfirmar").css("display", "flex"); // ou flex ?
        
        
        
        
        
        next();
        
        
        
}


function voltarCompra  () {
    value=0;
    itemsCompra=[];
    $("#botContinuar").css("display", "block");
    $("#botVoltarConfirmar").css("display", "none");
    prev();
    
}
function efectuarCompra() {
    $("#botVoltarConfirmar").css("display", "none");
    next();
}


$(document).keydown(function(e){
    switch(e.keyCode) {
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
