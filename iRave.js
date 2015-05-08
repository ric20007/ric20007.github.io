var nope = false;
var swiperH,
    swiperV,
    swiperV2,
    swiperVProcurar,
    swiperVCartaz,
    valorCompra = 0,
    totalComprado =0;
    
var itemsCompra = [];
var itemsComprados = [];
var elSlides;

var thePrev;
var SpecialthePrev; 
var  canChangePrev = 1;

var wcFilaToggle = 0;
var imgUserAmigo = "<img src='img/user1.png ' class='imgEntrada '>",
    imgShieldAmigo = "<img src='img/shield.png ' class='imgEntrada '>";
    
    
function pessoa(_nome) {
    this.nome = _nome;
    this.isAdded = 0;
    this.isProtected = 0;
}
var pessoas = [new pessoa("Carlos"),
                new pessoa("João"),
                new pessoa("Joana"),
                new pessoa("Merio"),
                new pessoa("Rita")];
                
var amigosAdicionados = [];

    

$(document).ready(function() {

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
        slidesPerView:3,
        slidesPerScroll: 1,

        freeMode: true,
        freeModeMomentum: false

    });
    
    swiperVCartaz = new Swiper('.swiper-container-vCartaz', {
        pagination: '.swiper-pagination-vCartaz',
        paginationClickable: true,
        direction: 'vertical',
        slidesPerView: 4,
        slidesPerScroll: 2,

        freeMode: true,
        freeModeMomentum: false

    });
    
     swiperVAmigos = new Swiper('.swiper-container-vAmigos', {
        pagination: '.swiper-pagination-vAmigos',
        direction: 'vertical',
        slidesPerView: 5,
        slidesPerScroll: 1,
        freeMode: true,
        freeModeMomentum: false

    });
    
    swiperHCartaz = new Swiper('.swiper-container-hCartaz', {
        onlyExternal: true,
        //setWrapperSize:true
    });


    elSlides = swiperH.slides;

    /* mapa e derivados */
    $('#mapa').draggable();

    $('#iconFood').click(function() {
        comida();
    });
    
    $('#iconWC').click(function() {
        if (wcFilaToggle == 0) {
            $('#wcFila').css('display', 'inline');
            wcFilaToggle = 1;
        }
        else{
            $('#wcFila').css('display', 'none');
            wcFilaToggle = 0;
        }
    });
    
    $('#iconMerch').click(function() {
        merch();
    });
    
    $('#iconCarlos').click(function() {
        goToOpcoesAmigo(0);
    });
    
    $('#iconJoao').click(function() {
        goToOpcoesAmigo(1);
    });
    
    $('#iconJoana').click(function() {
        goToOpcoesAmigo(2);
    });
    
    $('#iconMerio').click(function() {
        goToOpcoesAmigo(3);
    });
    
    $('#iconRita').click(function() {
        goToOpcoesAmigo(4);
    });
    
    $('.hf_top').hover(function() {
        $(".map_nav > img").attr('src', 'img/hf_arrows/gesto_navegar_mapa_top.png');
        $(this).click(function() { $('#mapa').animate({top:'+=8'}, 100 ); });
    }, function() {
        $(".map_nav > img").attr('src', 'img/hf_arrows/gesto_navegar_mapa.png');
    });
    
    $('.hf_bot').hover(function() {
        $(".map_nav > img").attr('src', 'img/hf_arrows/gesto_navegar_mapa_bot.png');
        $(this).click(function() { $('#mapa').animate({top:'-=8'}, 100 ); });
    }, function() {
        $(".map_nav > img").attr('src', 'img/hf_arrows/gesto_navegar_mapa.png');
    });
    $('.hf_right').hover(function() {
        $(".map_nav > img").attr('src', 'img/hf_arrows/gesto_navegar_mapa_right.png');
        $(this).click(function() { $('#mapa').animate({left:'-=8'}, 100 ); });
    }, function() {
        $(".map_nav > img").attr('src', 'img/hf_arrows/gesto_navegar_mapa.png');
    });
    $('.hf_left').hover(function() {
        $(".map_nav > img").attr('src', 'img/hf_arrows/gesto_navegar_mapa_left.png');
        $(this).click(function() { $('#mapa').animate({left:'+=8'}, 100 ); });
    }, function() {
        $(".map_nav > img").attr('src', 'img/hf_arrows/gesto_navegar_mapa.png');
    });
    $('.hf_topr').hover(function() {
        $(".map_nav > img").attr('src', 'img/hf_arrows/gesto_navegar_mapa_topr.png');
        $(this).click(function() { $('#mapa').animate({top:'+=8', left:'-=8'}, 100 ); });
    }, function() {
        $(".map_nav > img").attr('src', 'img/hf_arrows/gesto_navegar_mapa.png');
    });
    $('.hf_botr').hover(function() {
        $(".map_nav > img").attr('src', 'img/hf_arrows/gesto_navegar_mapa_botr.png');
        $(this).click(function() { $('#mapa').animate({top:'-=8', left:'-=8'}, 100 ); });
    }, function() {
        $(".map_nav > img").attr('src', 'img/hf_arrows/gesto_navegar_mapa.png');
    });
    $('.hf_topl').hover(function() {
        $(".map_nav > img").attr('src', 'img/hf_arrows/gesto_navegar_mapa_topl.png');
        $(this).click(function() { $('#mapa').animate({top:'+=8', left:'+=8'}, 100 ); });
    }, function() {
        $(".map_nav > img").attr('src', 'img/hf_arrows/gesto_navegar_mapa.png');
    });
    $('.hf_botl').hover(function() {
        $(".map_nav > img").attr('src', 'img/hf_arrows/gesto_navegar_mapa_botl.png');
        $(this).click(function() { $('#mapa').animate({top:'-=8', left:'+=8'}, 100 ); });
    }, function() {
        $(".map_nav > img").attr('src', 'img/hf_arrows/gesto_navegar_mapa.png');
    });
    /* end mapa e derivados */
    
    $('.help_drag').draggable({axis: "y"});
    
    $('.compras').click(function() {
        //$('input[type=checkbox]').attr('checked', false);
        var checkbox = $('input[type=checkbox]').eq($(this).index('.compras'));
        var alerte = !checkbox.is(':checked');
        checkbox.prop('checked', alerte);
    });

    $('ul.list > li').click(function() {

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


var cartazTitulo = ["&nbsp; &nbsp; Dia 1 &nbsp; &nbsp;", 
                    "&nbsp; &nbsp; Dia 2 &nbsp; &nbsp;", 
                    "&nbsp; &nbsp; Dia 3 &nbsp; &nbsp;"];

var nome = ["Menu",
    "<img src='img/user1.png' class='imgTitulo'> Perfil",             //1
    "<img src='img/add-user.png' class='imgTitulo'> Add. Amigos",     //2
    "<img src='img/add-user.png' class='imgTitulo'> Add. Amigos",     //3
    "<img src='img/add-user.png' class='imgTitulo'> Add. Amigos",     //4
    "<img src='img/multy-user.png' class='imgTitulo'> Lista Amigos",  //5
    "<img src='img/user1.png' class='imgTitulo'> João",               //6
    "<img src='img/shield.png' class='imgTitulo'> Proteger",          //7
    "<img src='img/active-search.png' class='imgTitulo'> Procurar",   //8
    "<img src='img/foods.png' class='imgTitulo'> Comes/Bebes",        //9
    "<img src='img/foods.png' class='imgTitulo'> Comes/Bebes",       //10
    "<img src='img/foods.png' class='imgTitulo'> Comes/Bebes",       //11
    "<img src='img/map-2.png' class='imgTitulo'> Mapa",              //12
    "<img src='img/hands-free.png' class='imgTitulo'> Mão Livre",    //13
    "<img src='img/euro_1.png' class='imgTitulo'> Merchandising",    //14
    "<img src='img/euro_1.png' class='imgTitulo'> Merchandising",    //15
    "<img src='img/euro_1.png' class='imgTitulo'> Merchandising",    //16
    "<img src='img/Agenda.png' class='imgTitulo'> Horário",          //17
    "<img src='img/pointer.png' class='imgTitulo'> Encontros",       //18 antes 21
    "<img src='img/pointer.png' class='imgTitulo'> Histórico",       //19 antes 22 AINDA NAO HA ICON !!!!
    "<img src='img/cartaz.png' class='imgTitulo'> nooope",           //20
    "<img src='img/cartaz.png' class='imgTitulo'> Cartaz",           //21 antes18
        "<img src='img/cartaz.png' class='imgTitulo'> nooope"        //22
    
];

//                0  1  2  3  4  5  6  7  8  9  10  11  12  13  14  15  16  17  18  19  20  21  22       
var help_ecras = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0];

//              0  1   2  3  4   5   6  7  8   9  10  11   12  13   14  15  16  17  18  19     21  22       
var prevEcra = [0, 0, -1, 2, 1, -1, -1, 7, 0, -1,  9,  8,  -1,  0,  -1, 14,  8,  0, -1,  1, 0, -1,  1];

var current_i = 0;
var previous_i = 0;

var joao_added = 0;
var joao_protected = 0;
var hf_on = 0;

var dia = 0;

function mudarNome(i) {
    $("#titulo_menu").html(nome[i]);
}

function prev() {
    canChangePrev = 0;

    if (nope != false) {
        return false;
        canChangePrev = 1;
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
        //preserve previous_i

        goToSlide(previous_i);
   

    } else {
        console.log(prevEcra[current_i]);
        //current_i -1
        console.log(nome[current_i] + "(" + current_i + " -> " + nome[prevEcra[current_i]] + "(" + prevEcra[current_i]);
        goToSlide(prevEcra[current_i]);

    }
    
    canChangePrev = 1;

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


    // se tentar mudar para o mesmo ecra
    if (current_i == i)
        return false;

    // clean button
    if (current_i === 9)
        $("#botContinuar").css("display", "none");
    else if (current_i === 10) {
        $("#botVoltarConfirmar").css("display", "none");
    }
    else if (current_i === 14) {
        $("#botContinuar").css("display", "none");
    }
    else if (current_i === 15) {
        $("#botVoltarConfirmar").css("display", "none");
    }
    
    
 
    if (i >= 0 && i <= nome.length - 1) {
        
        if(i===9)
            $("#botContinuar").css("display", "block");
        
         // esconder slides que nao estao active
        for (var j = 0; j < elSlides.length; j++) {
            if (j != i && j != current_i)
                $(elSlides[j]).css("visibility", "hidden");
            else
                $(elSlides[j]).css("visibility", "visible");
        }
        
        
        if (i !== 12) {
            $('#mapa').css("opacity", 0);
        } else {
            $('#mapa').css("opacity", 1);
        }
        
        SpecialthePrev = prevEcra[i];
        if (canChangePrev === 1  && SpecialthePrev === -1) {
         
            //console.log("tou no " +  current_i + " ir p " + i + " special " + SpecialthePrev)
            //console.log("chanchange? " +canChangePrev);

            previous_i = current_i;
        }
        
        mudarNome(i);
        
        //esconder o help do ecra a transitar
        help_ecras[current_i] = 0;
        $(elSlides[current_i]).find('.help_screen').css("display", "none");
        
        //if (i==21) {$(elSlides[22]).css("visibility", "visible");} //fuck this shit.
        //if (i==22) {$(elSlides[23]).css("visibility", "visible");} //no, rly.
        swiperH.slideTo(i);
        
        // hide previous slide
        $(elSlides[current_i]).css("visibility", "hidden");
        
        current_i = i;

    }

}


function detectadoAmigo(_index) {
    var char = pessoas[_index].nome.slice(-1);
    char = (char == "a" ? "a" : "o");
    
    $("#AmgDetectado").html(pessoas[_index].nome + " detectad"+char+".	<p>Quer adicioná-l"+char+" ?</p> \
                           <a href='# ' class='botao' onclick='adicionarAmigo("+ _index +");next();return false; '> \
                        		<img src='img/check.png ' class='imgEntrada '> Sim \
                        	</a>\
                        	<a href='# ' class='botao' onclick='prev();return false; '> \
                        		<img src='img/cross.png ' class='imgEntrada '> Não \
                        	</a>");

}

function adicionarAmigo(_index) {
    if (pessoas[_index].isAdded)
        return;
    amigosAdicionados.push(pessoas[_index]);
    pessoas[_index].isAdded = 1;
    pessoas[_index].index = _index;
    
    var char = pessoas[_index].nome.slice(-1);
    char = (char == "a" ? "a" : "o");
    
     $("#AmgAdicionado").html(char.toUpperCase()+" " + pessoas[_index].nome + " foi adicionad"+char+" com sucesso.");
    
    switch (_index) {
    case 0:
        $('#iconCarlos').css('display', 'inline');
        break;
    case 1:
        $('#iconJoao').css('display', 'inline');
        break;
    case 2:
        $('#iconJoana').css('display', 'inline');
        break;
    case 3:
        $('#iconMerio').css('display', 'inline');
        break;
    case 4:
        $('#iconRita').css('display', 'inline');
        break;
    }
}

function removerAmigo(_index) {

    pessoas[_index].isAdded = 0;
       pessoas[_index].isProtected = 0;
       
    for (var i = 0; i < amigosAdicionados.length; i++) { 
       if (amigosAdicionados[i].nome == pessoas[_index].nome)
        break;
    }

    amigosAdicionados.splice(i, 1);
    
    switch (_index) {
    case 0:
        $('#iconCarlos').css('display', 'none');
        break;
    case 1:
        $('#iconJoao').css('display', 'none');
        break;
    case 2:
        $('#iconJoana').css('display', 'none');
        break;
    case 3:
        $('#iconMerio').css('display', 'none');
        break;
    case 4:
        $('#iconRita').css('display', 'none');
        break;
    }

}

function toggleProtection(_index) {
    var char = pessoas[_index].nome.slice(-1);
    char = (char == "a" ? "a" : "o");
    
    var frase = "rotegid"+char+" com sucesso";
    
    pessoas[_index].isProtected = (pessoas[_index].isProtected == 0 ? 1 : 0);
    pessoas[_index].isProtected == 0 ? frase ="desp"+frase : frase ="p"+frase+"!";
    frase = pessoas[_index].nome + " foi " + frase;
    $("#protSucesso").html(frase);

}

function goToOpcoesAmigo(_index){
    var esteAmigo = pessoas[_index];
    
    $("#queroRemoverQuem").attr("onclick","removerAmigo("+_index+");amigos();return false;");
    

    $("#opcoes_joao").html("<div onclick='toggleProtection("+_index+");goToSlide(7);return false;' class='menu_entrada'> \
                                <img src='img/multy-user.png ' class='imgEntrada '>" +
                                (esteAmigo.isProtected == 1 ? "Desproteger" : "Proteger") + 
                            "</div>");
                            
    goToSlide(6);
    $("#titulo_menu").html(esteAmigo.nome);
    

}


function amigos() {
    
    //swiperVAmigos.removeAllSlides();
    goToSlide(5);
    
    if (amigosAdicionados.length == 0)
        $("#lista_joao").html("<p style=\"text-align:center\" >Não tem amigos");
    else{
        $("#lista_joao").html("");
        $.each( amigosAdicionados, function( i, pess ){
            //console.log( "Index #" + i + ": " + pess.nome );
            $("#lista_joao").append("<div class='swiper-slide menu_entrada' onclick='goToOpcoesAmigo("+pess.index+");return false;'>"
                                        + imgUserAmigo + pess.nome + (pess.isProtected == 1 ? imgShieldAmigo : "") +
                                    "</div>");
        });
    }
    
    
}


function goToMenu() {
    goToSlide(0);

}


// opcoes do menu principal 
function mapa() {
    goToSlide(12);
}

function procurar() {
    goToSlide(8);
}

function horario() {
    goToSlide(17);
}

function cartaz() {
    goToSlide(21);
}

function maoLivre() {
    goToSlide(13);
    if (hf_on == 0) {
        $("#mao_livre").html("Toque para activar o modo mãos livres! \
                                <p></p> \
                                <a href='# ' class='botao' onclick='hfOn();goToSlide(0);return false; '> \
                                    <img src='img/user1.png ' class='imgEntrada '> OK \ </a>");
    }
    else {
        $("#mao_livre").html("Toque para desactivar o modo mãos livres \
                                <p></p> \
                                <a href='# ' class='botao' onclick='hfOff();goToSlide(0);return false; '> \
                                    <img src='img/user1.png ' class='imgEntrada '> OK \ </a>");
    }
}

function hfOn() {
    hf_on = 1;
    $('.hf_inactivos').css('display', "none");
}

function hfOff() {
    hf_on = 0;
    $('.hf_inactivos').css('display', "inline");
}

//opcoes do procurar




function addAmigos() {

    goToSlide(2);

}

function historico(){
    goToSlide(19);
    
    if (totalComprado === 0)
        return;
    
    $("#listaHistoricoCompras").html("Total Gasto: " + totalComprado + "€");
    for (var i = 0; i < itemsComprados.length; i++) {
        $("#listaHistoricoCompras").append(itemsComprados[i]);
    }
    
    
}

function comida() {
    //valorCompra = 0;
    itemsCompra = [];

    goToSlide(9);
    $("#botContinuar").css("display", "block");
}

function merch() {
    //valorCompra = 0;
    itemsCompra = [];

    goToSlide(14);
    $("#botContinuar").css("display", "block");
}

function banho() {
    $('#mapa').css('top', '-90pt');
    $('#mapa').css('left', '-20pt');
    mapa();
}

function cartazNext() {
    if (dia != 2) {
        if (dia == 1) {
            $('#cartaz-next').css('visibility', 'hidden');
        } else {
            $('#cartaz-previous').css('visibility', 'visible');
        }
        dia++;
        $("#cartaz-dia").html(cartazTitulo[dia]);
        swiperHCartaz.slideTo(dia);
    }
}

function cartazPrevious() {
    if (dia != 0) {
        if (dia == 2) {
            $('#cartaz-next').css('visibility', 'visible');
        } else {
            $('#cartaz-previous').css('visibility', 'hidden');
        }
        dia--;
        $("#cartaz-dia").html(cartazTitulo[dia]);
        swiperHCartaz.slideTo(dia);
    }
}

function encontros() {
    goToSlide(18);
}

function continuarCompra() {
    var num, value = 0,
        string, thisValue;
        
    itemsCompra=[], valorCompra=0;
    var el = $('input:checkbox[name="compra"]');



    el.each(function() {
        if ($(this).is(':checked')) {
            //var alerte = !$(this).is(':checked');
            //$(this).prop('checked', alerte);

            num = parseFloat($(this).prop("value"));
            string = $(this).attr("produ") + ": " + $(this).prop("value") + "€";


            string = "<div class='swiper-slide menu_entrada'>" + string + "</div>";

            itemsCompra.push(string);
            console.log(string);
            value = value + num;
        }

    });
    console.log(itemsCompra);
    //////////////////////////////////////     DIZER que nao tem nada selecionado, seleccionar algo
    if (value === 0)
        return false;

    valorCompra = value;
    $(".exchangeCompra").html("Total Pedido: " + value + "€");

    for (var i = 0; i < itemsCompra.length; i++) {
        $(".exchangeCompra").append(itemsCompra[i]);
    }

    $(".exchangeCompra").append("<div class='menu_entrada '></div>");
    $(".exchangeCompra").append("<div class='swiper-slide '></div>");

    //alert(value);
    //alert(itemsCompra);
    $("#botContinuar").css("display", "none");
    $("#botVoltarConfirmar").css("display", "flex"); // ou flex ?


    next();

}

/*
function voltarCompra() {
    value = 0;
    itemsCompra = [];
    $("#botContinuar").css("display", "block");
    $("#botVoltarConfirmar").css("display", "none");

    prev();
}
*/
function efectuarCompra() {
	totalComprado += valorCompra;
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
    if (hf_on == 1) { mapa(); }
}


function help() {
    if (help_ecras[current_i] == 0) {
        help_ecras[current_i] = 1;
        $(elSlides[current_i]).find('.help_screen').css("top", "2pt");
        $(elSlides[current_i]).find('.help_screen').css("left", "5pt");
        $(elSlides[current_i]).find('.help_screen').css("display", "inline");
    }
    else {
        help_ecras[current_i] = 0;
        $(elSlides[current_i]).find('.help_screen').css("display", "none");
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
            var rand;
            while (amigosAdicionados.length !=pessoas.length){
                rand = Math.floor((Math.random() * pessoas.length) ); 
                if(pessoas[rand].isAdded == 0)
                    break;
            }
            
            detectadoAmigo(rand);
            next();
            break;
        case 37:
            goToSlide(current_i - 1); // num funcemina bem
            //prev();
            break;
    }
});