var swiperH,
    swiperV,
    swiperV2,
    swiperVProcurar,
    swiperVCartaz,
    swiperV3,
    swiperVAmigos,
    swiperVComes,
    swiperVMerch,
    swiperVHistorico,
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
    
    
var prevStack = [];

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
                
var setasHf = ["top","bot","right",
                "left","topr","botr",
                "topl","botl"]
                
var amigosAdicionados = [];

var cartazOn = 0;





$(document).ready(function() {

    // fix checkbox detect
    var el = $('input:checkbox[name="compra"]');
    el.each(function() {
        $(this).on('click', function(event) {
            event.stopPropagation();

        });

    });
    
    /*
    $('.hf_inactivos').each(function() {
        console.log("1");
        $(this).on('click', function(event) {
            event.stopPropagation();
            console.log("Stopped propagation");

        });

    });
    
*/
        
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
    
    swiperVComes = new Swiper('.swiper-container-vComes', {
        pagination: '.swiper-pagination-vComes',
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
    
    swiperVMerch = new Swiper('.swiper-container-vMerch', {
        pagination: '.swiper-pagination-vMerch',

        direction: 'vertical',
        slidesPerView:3,
        slidesPerScroll: 1,

        freeMode: true,
        freeModeMomentum: false

    });
    
    swiperVMerch2 = new Swiper('.swiper-container-vMerch2', {
        //pagination: '.swiper-pagination-vMerch',

        direction: 'vertical',
        slidesPerView:3,
        slidesPerScroll: 1,

        freeMode: true,
        freeModeMomentum: false

    });
    
    
    
    swiperVHistorico = new Swiper('.swiper-container-vHistorico', {
        //pagination: '.swiper-pagination-vMerch',

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
        slidesPerView: 8,
        slidesPerScroll: 3,

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
    

    elSlides = swiperH.slides;
    

    /* mapa e derivados */
    /*
    var conterTop = $("#conter_mapaTOP").position().top + $("#conter_mapaTOP").position().top *0.3;
    var conterBot = $("#conter_mapaBOT").height()*0.90;  //$("#conter_mapaBOT").position().top + ....
    var conterLeft = $("#conter_mapaLEFT").position().left;
    var conterRight =  conterLeft +$("#conter_mapaLEFT").width()*0.40;

    console.log("MAPA",conterLeft,conterTop,conterRight,conterBot);
*/
    //top e bot inconsistentes
    //$('#mapa').draggable({containment : [conterLeft,0,conterRight,conterBot] , scroll: false });
    
    // so para na esquerda
    //('#mapa').draggable({containment : "#conter_mapaLEFT" , scroll: false });
    
    //  O CRIME:     \$('#mapa').draggable({  ILLEGAL!!!!!
    $('#mapa').draggable({
        stop: function() {
            checkBorders()
        }
    });
    
    
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
    
    // click handler para os icones dos amigos no mapa
	$.each( pessoas, function( i, pess ){
		var nome_temp = (pess.nome == "João" ? "Joao" : pess.nome);
		$('#icon'+nome_temp).click(function() {
			goToOpcoesAmigo(i);
		});
	});
    
    
    // Tratar dos hovers ficarem a laranja
    $.each( setasHf, function( i, seta ){
		$('.hf_'+seta).hover(function() {
			$(".map_nav > img").attr('src', 'img/hf_arrows/gesto_navegar_mapa_'+seta+'.png');
			
		}, function() {
			$(".map_nav > img").attr('src', 'img/hf_arrows/gesto_navegar_mapa.png');
		});
	});
	
	
    var pxAmount = 45;
    
    $('.hf_top').click(function() { 
        $('#mapa').animate({top:'+='+pxAmount}, 100 ); 
        checkBorders();
    });
    
    $('.hf_bot').click(function() {
        $('#mapa').animate({top:'-='+pxAmount}, 100 ); 
        checkBorders();
    });

       
    $('.hf_right').click(function() { 
        console.log("detected hand move right");
        if (cartazOn) {
            cartazNext();
        }
        else { 
            $('#mapa').animate({left:'-='+pxAmount}, 100 ); 
            checkBorders();
        }
        
    });

    $('.hf_left').click(function(){
        console.log("detected hand move left");
        if (cartazOn) {
            cartazPrevious();
        }
        else {
            $('#mapa').animate({left:'+='+pxAmount}, 100 ); 
            checkBorders();
        }
    });

    $('.hf_topr').click(function() { 
        $('#mapa').animate({top:'+='+pxAmount, left:'-='+pxAmount}, 100 ); 
        checkBorders();            
    });

    $('.hf_botr').click(function() { 
        $('#mapa').animate({top:'-='+pxAmount, left:'-='+pxAmount}, 100 ); 
        checkBorders();
    });
        
    $('.hf_topl').click(function() { 
        $('#mapa').animate({top:'+='+pxAmount, left:'+='+pxAmount}, 100 ); 
        checkBorders();    
    });

    $('.hf_botl').click(function() { 
        $('#mapa').animate({top:'-='+pxAmount, left:'+='+pxAmount}, 100 ); 
        checkBorders();
    });
    

    /* end mapa e derivados */
    
    $('#botao_encostar').click(function() {
        var rand;
            while (amigosAdicionados.length !=pessoas.length){
                rand = Math.floor((Math.random() * pessoas.length) ); 
                if(pessoas[rand].isAdded == 0)
                    break;
            }
            
            detectadoAmigo(rand);
            next();
    });
    
    $('.help_drag').draggable({axis: "y"});
    
    $('.compras').click(function() {
        //$('input[type=checkbox]').attr('checked', false);
        var checkbox = $('input[type=checkbox]').eq($(this).index('.compras'));
        var alerte = !checkbox.is(':checked');
        checkbox.prop('checked', alerte);
    });

    /*
    $('ul.list > li').click(function() {

        var _that = $(this);
        $(this).addClass('highlighted');
        setTimeout(function() {
            _that.removeClass('highlighted');
        }, 200);
        
    });
    */
    
    //add highlight no menu
    $('.menu_entrada').click(function() {
       
        var _that = $(this);
        $(this).addClass('highlighted');
        setTimeout(function() {
            _that.removeClass('highlighted');
        }, 200);
        
    });

    //add highlight no perfil
    $('.perfil_entrada').click(function() {
        
        var _that = $(this);
        $(this).addClass('highlighted');
        setTimeout(function() {
            _that.removeClass('highlighted');
        }, 200);
        
    });

    //add highlight no botao para add. amigos
    $('.botao').click(function() {
        
        var _that = $(this);
        $(this).addClass('highlighted');
        setTimeout(function() {
            _that.removeClass('highlighted');
        }, 200);
        
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


var nome_Titulos = ["Menu",
    "<img src='img/user1.png' class='imgTitulo'> Perfil",             //1
    "<img src='img/add-user.png' class='imgTitulo'> Add. Amigos",     //2
    "<img src='img/add-user.png' class='imgTitulo'> Add. Amigos",     //3
    "<img src='img/add-user.png' class='imgTitulo'> Add. Amigos",     //4
    "<img src='img/multy-user.png' class='imgTitulo'> Lista Amigos",  //5
    "<img src='img/user1.png' class='imgTitulo'> João",               //6
    "<img src='img/shield.png' class='imgTitulo'> Proteção",          //7
    "<img src='img/active-search.png' class='imgTitulo'> Procurar",   //8
    "<img src='img/foods.png' class='imgTitulo'> Comes/Bebes",        //9
    "<img src='img/foods.png' class='imgTitulo'> Comes/Bebes",       //10
    "<img src='img/foods.png' class='imgTitulo'> Comes/Bebes",       //11
    "<img src='img/map-2.png' class='imgTitulo'> Mapa",              //12
    "<img src='img/hands-free.png' class='imgTitulo'> Mãos Livres",   //13
    "<img src='img/euro_1.png' class='imgTitulo'> Merchandising",    //14
    "<img src='img/euro_1.png' class='imgTitulo'> Merchandising",    //15
    "<img src='img/euro_1.png' class='imgTitulo'> Merchandising",    //16
    "<img src='img/Agenda.png' class='imgTitulo'> Horário",          //17
    "<img src='img/pointer.png' class='imgTitulo'> Encontros",       //18 antes 21
    "<img src='img/euro.png' class='imgTitulo'> Histórico",       //19 antes 22 AINDA NAO HA ICON !!!!
    "<img src='img/cartaz.png' class='imgTitulo'> nooope",           //20
    "<img src='img/cartaz.png' class='imgTitulo'> Cartaz",           //21 antes18
        "<img src='img/cartaz.png' class='imgTitulo'> Cartaz",        //22
            "<img src='img/cartaz.png' class='imgTitulo'> Cartaz"        //23
    
];

//                0  1  2  3  4  5  6  7  8  9  10  11  12  13  14  15  16  17  18  19  20  21  22  23     
var help_ecras = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 0];

//              0  1   2  3  4   5   6  7  8   9  10  11   12  13   14  15  16  17  18  19     21  22  23    
var prevEcra = [0, 0, -1, 2, 5, -1, -1, 6, 0, -1,  9,  8,  -1,  0,  -1, 14,  8,  0, -1,  1, 0, -1,  21, 22];


var current_i = 0;
var previous_i = 0;

var hf_on = 0;

var dia = 0;

var prompt = 0;

function mudarNome(i) {
    $("#titulo_menu").html(nome_Titulos[i]);
}

function prev() {
    
    // caso se se estar a cancelar um remove amigo
    if (prompt == 1) {
        prompt = 0;
        $('.remove_screen').css("display", "none");
        return;
    }
    
    
    canChangePrev = 0;
    
    thePrev = prevEcra[current_i];
    if (thePrev === -1) {

        console.log(-1 + " $$$$$$");
        console.log(nome_Titulos[current_i] + "(" + current_i + " -> " + nome_Titulos[previous_i] + "(" + prevEcra[previous_i]);
        //preserve previous_i

        //goToSlide(previous_i);
        
            if(prevStack.length !==0){
                var temp_slide = prevStack.pop();
                goToSlide(temp_slide);
                prevStack.pop();
            }
                 // queue is now [5]
            
            //return;
   

    } else {
        console.log(prevEcra[current_i]);
        //current_i -1
        console.log(nome_Titulos[current_i] + "(" + current_i + " -> " + nome_Titulos[prevEcra[current_i]] + "(" + prevEcra[current_i]);
        
        prevStack.pop();
        goToSlide(prevEcra[current_i]);
        prevStack.pop();

    }
    
    canChangePrev = 1;

}

function next() {

    if (current_i <= nome_Titulos.length) {
        goToSlide(current_i + 1);
    }

}

function checkBorders(){
    var centerX = $('#botoes').offset().left + ($('#botoes').width()/2);
    var centerY = $('#botoes').offset().top + ($('#botoes').height()/2);
    
    var mapaX = $('#imgMapa').offset().left;
    var mapaY = $('#imgMapa').offset().top;
    var mapaW = $('#imgMapa').width();
    var mapaH = $('#imgMapa').height();
    
    //left border
    if (mapaX + 10 > centerX) { $('#mapa').animate({left: '-='+(10+mapaX-centerX)+'pt'}, 100);}
    //right border
    if (mapaX + mapaW - 10 < centerX) { $('#mapa').animate({left: '+='+(10+centerX-(mapaX+mapaW))+'pt'}, 100);}
    //top border
    if (mapaY + 10 > centerY) { $('#mapa').animate({top: '+='+(10+centerY-mapaY)+'pt'}, 100);}
    //bottom border
    if (mapaY + mapaH - 30 < centerY) { $('#mapa').animate({top: '+='+(30+centerY-(mapaY+mapaH))+'pt'}, 100);}
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
    
    if (current_i === 2) $('#botao_encostar_inact').css('display','inline');
    if (i ===2) $('#botao_encostar_inact').css('display','none');
    
   
    if (i >= 0 && i <= nome_Titulos.length - 1) {
        
         //casos de hands-free no cartaz
        if (current_i == 21 && !(i >= 21 && i <= 23)) {
            cartazOn = 0;
            console.log("not cartaz!");
            
        }
        
        if (i >= 21 && i <= 23) { cartazOn = 1; }
    
        //limpar remove
        if (current_i == 6) {
            prompt = 0;
            $('.remove_screen').css("display", "none");
        }
        
        
        prevStack.push(current_i);
        
        if(i===9 || i ===14)
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
            console.log("IN can change prev");
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
                           <a href='# ' class='botao' onclick='adicionarAmigo("+ _index +");return false; '> \
                        		<img src='img/check.png ' class='imgEntrada '> Sim \
                        	</a>\
                        	<a href='# ' class='botao' onclick='prev();return false; '> \
                        		<img src='img/cross.png ' class='imgEntrada '> Não \
                        	</a>");

}

function adicionarAmigo(_index) {
    
    var pess = pessoas[_index];
    
    if (pess.isAdded)
        return;
        
    amigosAdicionados.push(pess);
    pess.isAdded = 1;
    pess.index = _index;
    
    var char = pess.nome.slice(-1);
    char = (char == "a" ? "a" : "o");
    
     $("#AmgAdicionado").html("<p></p> "+char.toUpperCase()+" " + pess.nome + " foi adicionad"+char+" com sucesso.");
    
    //mostrar icone do amigo no mapa
    var nomeTemp = (pess.nome == "João" ? "Joao" : pess.nome);
    $('#icon'+nomeTemp).css('display', 'inline');
    
    if (amigosAdicionados.length == 1)
        $("#lista_joao").html("");
    console.log( "Index #" + _index + ": " + pess.nome );
    $("#lista_joao").append("<div class='swiper-slide menu_entrada' onclick='goToOpcoesAmigo("+pess.index+");return false;'>"
                                + imgUserAmigo + pess.nome + (pess.isProtected == 1 ? imgShieldAmigo : "") +
                            "</div>");
                            
    
    console.log(prevStack);
    prevStack.pop();
    console.log(prevStack);
    
    next();
    console.log(prevStack);
    
     //para nao voltar a perguntar se quer adicionar ao voltar atras depois de adicionar
    prevStack.pop();
    console.log(prevStack);

    
    
     
}

function actualizarListaAmigos(){
         $("#lista_joao").html("");
        $.each( amigosAdicionados, function( i, pess ){
            //console.log( "Index #" + i + ": " + pess.nome );
            $("#lista_joao").append("<div class='swiper-slide menu_entrada' onclick='goToOpcoesAmigo("+pess.index+");return false;'>"
                                        + imgUserAmigo + pess.nome + (pess.isProtected == 1 ? imgShieldAmigo : "") +
                                    "</div>");
        });
}

function removerAmigo(_index) {

    pessoas[_index].isAdded = 0;
    pessoas[_index].isProtected = 0;
       
    //encontrar o indice do amigo a remover no array dos adicionados
    for (var i = 0; i < amigosAdicionados.length; i++) { 
        if (amigosAdicionados[i].nome == pessoas[_index].nome)
            break;
    }

    amigosAdicionados.splice(i, 1);
    
    //tirar o amigo do mapa
    var nomeTemp = (pessoas[_index].nome == "João" ? "Joao" : pessoas[_index].nome);
    $('#icon'+nomeTemp).css('display', 'none');
    
    //reescrever a lista de amigos
     if (amigosAdicionados.length == 0)
        $("#lista_joao").html("<p style=\"text-align:center\" >Não tem amigos");
    else{
        actualizarListaAmigos();
    }
}

function localizarAmigo(_index){
    switch (_index) {
    case 0: //Carlos
        $('#mapa').css('top', '50pt');
        $('#mapa').css('left', '-123pt');
        break;
    case 1: //Joao
        $('#mapa').css('top', '-20pt');
        $('#mapa').css('left', '-90pt');
        break;
    case 2: //Joana
        $('#mapa').css('top', '-18pt');
        $('#mapa').css('left', '-78pt');
        break;
    case 3: //Merio
        $('#mapa').css('top', '-100pt');
        $('#mapa').css('left', '-30pt');
        break;
    case 4: //Rita
        $('#mapa').css('top', '74pt');
        $('#mapa').css('left', '-22pt');
        break;
    }
    mapa();
}


function toggleProtection(_index) {
    var char = pessoas[_index].nome.slice(-1);
    char = (char == "a" ? "a" : "o");
    
    var frase = "rotegid"+char+" com sucesso";
    
    pessoas[_index].isProtected = (pessoas[_index].isProtected == 0 ? 1 : 0);
    pessoas[_index].isProtected == 0 ? frase ="desp"+frase : frase ="p"+frase+"!";
    frase = pessoas[_index].nome + " foi " + frase;
    $("#protSucesso").html(frase);
    
    actualizarListaAmigos();

}

function goToOpcoesAmigo(_index){
    var esteAmigo = pessoas[_index];
    
    $("#queroLocalizarQuem").attr("onclick","localizarAmigo("+_index+");return false;");
    
    $("#queroRemoverQuem").attr("onclick","removerAmigo("+_index+");amigos();return false;");
    

    $("#opcoes_joao").html("<div onclick='toggleProtection("+_index+");goToSlide(7);return false;' class='menu_entrada'> \
                                <img src='img/shield.png ' class='imgEntrada '>&nbsp;" +
                                (esteAmigo.isProtected == 1 ? "Desproteger" : "Proteger") + 
                            "</div>");
                            
                            
                            
    nome_Titulos[6] =  "<img src='img/user1.png' class='imgTitulo'>&nbsp;" + 
                        esteAmigo.nome + 
                        (esteAmigo.isProtected == 1 ? "&nbsp;<img src='img/shield.png ' class='imgTitulo'>" : ""); 
    
    goToSlide(6);
    
    //era preciso alterar o nome depois porque o goToSlide altera tambem o nome
    //$("#titulo_menu").html(esteAmigo.nome);
    

}


function amigos() {
    //se estiver no perfil ou procurar
    if(current_i==1 ||current_i==8)
        prevEcra[5]=current_i;
    goToSlide(5);
    
    //reescrever a lsita agora é feito no remover e adicionar amigo

}


function goToMenu() {
    
    goToSlide(0);
    prevStack = [];
}

// opcoes do menu principal 
function mapa() {
    //if(current_i==0 || current_i==0 )
        prevEcra[12]=current_i;
    goToSlide(12);
}

function procurar() {
    goToSlide(8);
}

function horario() {
    goToSlide(17);
}

function maoLivre() {
    goToSlide(13);
}

function toggleHandsFree() {
    if (hf_on == 0) {
        hf_on = 1;
        $('.hf_inactivos').css('display', "none");
        $("#mao_livre").html("<p>Toque para <br> desactivar o modo mãos livres.");
    }
    else {
        hf_on = 0;
        $('.hf_inactivos').css('display', "inline");
        $("#mao_livre").html("<p>Toque para activar o modo mãos livres!");
    }
}



function cartaz() {
    dia = 0;
    cartazOn==1;
    goToSlide(21);
    $(".theSpecialEntrada").css("height","21pt");
}





//opcoes do procurar



function addAmigos() {
    prevEcra[2]=current_i;
    goToSlide(2);
}


function historico(){
    goToSlide(19);
    
    if (totalComprado === 0)
        return;
    
    $("#listaHistoricoCompras").html("Total Gasto: " + totalComprado + "€ <div style='height:3pt;width:1pt;'></div>");
    for (var i = 0; i < itemsComprados.length; i++) {
        $("#listaHistoricoCompras").append(itemsComprados[i]);
    }
    
    
}

function comida() {
    //valorCompra = 0;
    itemsCompra = [];

    goToSlide(9);
    $("#botContinuar").css("display", "block");
    
    var checkss = $('input:checkbox[name="compra"]');
    //uncheck cmidas
     checkss.each(function() {
        if ($(this).is(':checked')) {
            var alerte = !$(this).is(':checked');
            $(this).prop('checked', alerte);
        }

    });
    
    
}

function merch() {
    //valorCompra = 0;
    itemsCompra = [];

    goToSlide(14);
    $("#botContinuar").css("display", "block");
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
    $(".exchangeCompra").html("Total Pedido: " + value + "€ <div style='height:3pt;width:1pt;'>");

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
    prevStack.pop();
    prevStack.pop();
}





function banho() {
    $('#mapa').css('top', '-90pt');
    $('#mapa').css('left', '-20pt');
    mapa();
}

function goToP1() {
    $('#mapa').css('top', '50pt');
    $('#mapa').css('left', '-60pt');
    mapa();
}

function goToP2() {
    $('#mapa').css('top', '8pt');
    $('#mapa').css('left', '5pt');
    mapa();
}


function cartazNext() {
    if (current_i >= 21 && current_i < 23) { next(); }

        //goToSlide(21+dia);
        //next();
    
}

function cartazPrevious() {
    
     if (current_i >= 21 && current_i <= 23) { prev(); }
     //if (current_i == 21) cartazOn ==0;

        
        //prevStack.pop();
        //prevStack.pop();
    
}

function encontros() {
    goToSlide(18);
}


function hf_mapa() {
    if (hf_on == 1) { mapa(); }
}


function removePrompt() {
    if (prompt == 0) {
        prompt = 1;
        $('.remove_screen').css("display", "inline");
    }
    else {
        
    }
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