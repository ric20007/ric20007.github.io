var swiperH,
    valorCompra = 0,
    totalComprado =0;
    
var swipers;
    
var swiperCartaz= [0,0,0];
    
var itemsCompra = [];
var itemsComprados = [];
var elSlides;

var thePrev;
var SpecialthePrev; 
var canChangePrev = 1;

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
                new pessoa("Joana"),
                new pessoa("João"),
                new pessoa("Merio"),
                new pessoa("Rita")];
                
var setasHf = ["top","bot","right",
                "left","topr","botr",
                "topl","botl"]
                
var amigosAdicionados = [];

var cartazOn = 0;

var contaClicks =0
var mouseups =0;
var minus =0;

$(document).click( function(){
    contaClicks++;
    //minus =mouseups-contaClicks;
    //console.log("clicks: " + contaClicks +" | drags ?: "+minus);
} );

$(document).mouseup( function(){
    mouseups++;
    minus =mouseups-contaClicks;
    console.log("clicks: " +contaClicks +" | drags ?: "+minus);
} );

$(document).ready(function() {

    // fix checkbox detect
    var el = $('input:checkbox[name="compra"]');
    el.each(function() {
        $(this).on('click', function(event) {
            event.stopPropagation();
        });

    });

    swiperH = new Swiper('.swiper-container-h', {
        speed: 200,
        onlyExternal: true,
        //setWrapperSize:true
    });
    
    elSlides = swiperH.slides;
    
    
    swipers =[
    new Swiper('.swiper-container-v', {
        pagination: '.swiper-pagination-v',
        paginationClickable: true,
        direction: 'vertical',
        slidesPerView: 3,
        slidesPerScroll: 1,
        freeMode: true,
        freeModeMomentum: false
    }),
            
    new Swiper('.swiper-container-v2', {
        pagination: '.swiper-pagination-v2',
        paginationClickable: true,
        direction: 'vertical',
        slidesPerView: 3,
        slidesPerScroll: 1,
        freeMode: true,
        freeModeMomentum: false

    }),
    new Swiper('.swiper-container-vProcurar', {
        pagination: '.swiper-pagination-vProcurar',
        paginationClickable: true,
        direction: 'vertical',
        slidesPerView: 4,
        slidesPerScroll: 2,
        freeMode: true,
        freeModeMomentum: false

    }),
    new Swiper('.swiper-container-vComes', {
        pagination: '.swiper-pagination-vComes',
        paginationClickable: true,
        direction: 'vertical',
        slidesPerView: 4,
        slidesPerScroll: 2,
        freeMode: true,
        freeModeMomentum: false

    }),
    new Swiper('.swiper-container-v3', {
        pagination: '.swiper-pagination-v3',
        direction: 'vertical',
        slidesPerView:4,
        slidesPerScroll: 2,
        freeMode: true,
        freeModeMomentum: false

    }),
    new Swiper('.swiper-container-vMerch', {
        pagination: '.swiper-pagination-vMerch',
        direction: 'vertical',
        slidesPerView:4,
        slidesPerScroll: 1,
        freeMode: true,
        freeModeMomentum: false

    }),
    new Swiper('.swiper-container-vMerch2', {
        pagination: '.swiper-pagination-vMerch2',
        direction: 'vertical',
        slidesPerView:3,
        slidesPerScroll: 2,
        freeMode: true,
        freeModeMomentum: false

    }),
    new Swiper('.swiper-container-vHistorico', {
        //pagination: '.swiper-pagination-vMerch',
        direction: 'vertical',
        slidesPerView:3,
        slidesPerScroll: 1,
        freeMode: true,
        freeModeMomentum: false

    }),
    new Swiper('.swiper-container-vCartaz', {
        pagination: '.swiper-pagination-vCartaz',
        paginationClickable: true,
        direction: 'vertical',
        slidesPerView: 8,
        slidesPerScroll: 3,
        freeMode: true,
        freeModeMomentum: false

    }),
    new Swiper('.swiper-container-vAmigos', {
        pagination: '.swiper-pagination-vAmigos',
        direction: 'vertical',
        slidesPerView: 5,
        slidesPerScroll: 1,
        freeMode: true,
        freeModeMomentum: false

    })
    ]

    // swipers de cada cartaz
    for (var i = 0; i < swiperCartaz.length; i++) {
        swiperCartaz[i] = new Swiper('.swiper-container-vCartaz'+i, {
                                pagination: '.swiper-pagination-vCartaz'+i,
                                paginationClickable: true,
                                direction: 'vertical',
                                slidesPerView: 4,
                                slidesPerScroll: 1,
                        
                                freeMode: true,
                                freeModeMomentum: false
                        
                            });
    }


    /* mapa e derivados */

    $('#mapa').draggable({
        stop: function() {
            $('#wcFila').css('display', 'none');
            wcFilaToggle = 0;
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
        if (current_i >= 21 && current_i <= 23) {
            console.log("pah ya up");
            swiperCartaz[dia].slidePrev(true, 100);
        }
        else {
            $('#mapa').animate({top:'+='+pxAmount}, 100 ); 
            checkBorders();
        }
    });
    
    $('.hf_bot').click(function() {
        if (current_i >= 21 && current_i <= 23) {
            dia = current_i - 21;
            swiperCartaz[dia].slideNext(true, 100);
        }
        else{
            $('#mapa').animate({top:'-='+pxAmount}, 100 ); 
            checkBorders();
        }
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
    "<img src='img/foods.png' class='imgTitulo'> Restaurante",        //9
    "<img src='img/foods.png' class='imgTitulo'> Restaurante",       //10
    "<img src='img/foods.png' class='imgTitulo'> Restaurante",       //11
    "<img src='img/map-2.png' class='imgTitulo'> Mapa",              //12
    "<img src='img/hands-free.png' class='imgTitulo'> Mãos Livres",  //13
    "<img src='img/merch.png' class='imgTitulo'> Souvenires",        //14
    "<img src='img/merch.png' class='imgTitulo'> Souvenires",        //15
    "<img src='img/merch.png' class='imgTitulo'> Souvenires",        //16
    "<img src='img/Agenda.png' class='imgTitulo'> Horário",          //17
    "<img src='img/pointer.png' class='imgTitulo'> Encontros",       //18 
    "<img src='img/euro.png' class='imgTitulo'> Histórico",          //19
    "<img src='img/cartaz.png' class='imgTitulo'> Titulo",           //20
    "<img src='img/cartaz.png' class='imgTitulo'> Cartaz",           //21
    "<img src='img/cartaz.png' class='imgTitulo'> Cartaz",           //22
    "<img src='img/cartaz.png' class='imgTitulo'> Cartaz"            //23
    
];

//                0  1  2  3  4  5  6  7  8  9  10  11  12  13  14  15  16  17  18  19  20  21  22  23     
var help_ecras = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 0];

//              0  1   2  3  4   5   6  7  8   9  10  11   12  13   14  15  16  17  18  19     21  22  23    
var prevEcra = [0, 0, -1, 2, 5, -1, -1, 6, 0, -1,  9,  8,  -1,  0,  -1, 14,  8,  0, -1,  1, 0, -1,  -1, -1];

var current_i = 0;
var previous_i = 0;

var hf_on = 0;

var dia = 0;

var promptRemove = 0;

function mudarNome(i) {
    $("#titulo_menu").html(nome_Titulos[i]);
}

function prev() {
    
    // caso se se estar a cancelar um remove amigo
    if (promptRemove == 1) {
        promptRemove = 0;
        $('.remove_screen').css("display", "none");
        return;
    }
    
    canChangePrev = 0;
    
    thePrev = prevEcra[current_i];
    if (thePrev === -1) {
        //goToSlide(previous_i);
        
        if(prevStack.length !==0){

            var temp_slide = prevStack.pop();
            console.log(nome_Titulos[current_i] + " :" + current_i + " -> " + nome_Titulos[temp_slide] + " :" + temp_slide);

            goToSlide(temp_slide);
            prevStack.pop();
            
            //hack para o cartaz regressar de onde veio
            if(!hf_on){
                if(current_i >= 21)
                    prev();
                if(current_i >= 22)
                    prev();
            }
            
        }
    } 
    else {
        console.log(nome_Titulos[current_i] + " :" + current_i + " -> " + nome_Titulos[prevEcra[current_i]] + " :" + prevEcra[current_i]);
        
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
            promptRemove = 0;
            $('.remove_screen').css("display", "none");
        }
        
        //esconder wcFila
        if (current_i == 12) {
            $('#wcFila').css('display', 'none');
            wcFilaToggle = 0;
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
        if(i!== 12 || !cartazOn )
            $('.specialSeta').css('display', "inline");
        
        
        SpecialthePrev = prevEcra[i];
        if (canChangePrev === 1  && SpecialthePrev === -1) {
            console.log("In can change prev");
            previous_i = current_i;
        }
        
        mudarNome(i);
        
        //esconder o help do ecra a transitar
        help_ecras[current_i] = 0;
        $(elSlides[current_i]).find('.help_screen').css("display", "none");
        
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

function actualizarListaAmigos(){
    
    // para o botao de adicionar amigos nao fugir
    if (amigosAdicionados.length >=4){
        $("#plsbegone").css("display","none");
        $(".bot_pergunta_amigo").css("font-size","9pt");

    }
    else{
        $("#plsbegone").css("display","block");
        $(".bot_pergunta_amigo").css("font-size","11.25pt");

    }
    if(amigosAdicionados.length >4)
        $("#bot_add_amigo_pergunta").css("display","none");
    else
        $("#bot_add_amigo_pergunta").css("display","block");
    
    // mostrar protegidos primeiro
    $("#lista_joao").html("");
    $.each( pessoas, function( i, pess ){
        if (pess.isAdded && pess.isProtected){
            $("#lista_joao").append("<div class='swiper-slide menu_entrada' onclick='goToOpcoesAmigo("+pess.index+");return false;'>"
                                        + imgUserAmigo + pess.nome + (pess.isProtected == 1 ? imgShieldAmigo : "") +
                                    "</div>");
        }
    });
    
    $.each( pessoas, function( i, pess ){
        if (pess.isAdded && !pess.isProtected){
            $("#lista_joao").append("<div class='swiper-slide menu_entrada' onclick='goToOpcoesAmigo("+pess.index+");return false;'>"
                                        + imgUserAmigo + pess.nome + (pess.isProtected == 1 ? imgShieldAmigo : "") +
                                    "</div>");
        }
    });
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
  
    actualizarListaAmigos();
                            
    // pops para controlar o estado da stack
    prevStack.pop();
    next();

     //para nao voltar a perguntar se quer adicionar ao voltar atras depois de adicionar
    prevStack.pop();

}


function removerAmigo(_index) {

    pessoas[_index].isAdded = 0;
    pessoas[_index].isProtected = 0;
       
    //encontrar o indice do amigo a remover no array dos adicionados
    for (var i = 0; i < amigosAdicionados.length; i++) { 
        if (amigosAdicionados[i].nome == pessoas[_index].nome)
            break;
    }
    
    //remover um amigo
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
        $('#mapa').css('left', '-121pt');
        break;
    case 1: //Joana
        $('#mapa').css('top', '-19pt');
        $('#mapa').css('left', '-78pt');
        break;
    case 2: //Joao
        $('#mapa').css('top', '-20pt');
        $('#mapa').css('left', '-87pt');
        break;
    case 3: //Merio
        $('#mapa').css('top', '-100pt');
        $('#mapa').css('left', '-28pt');
        break;
    case 4: //Rita
        $('#mapa').css('top', '74pt');
        $('#mapa').css('left', '-23pt');
        break;
    }
    mapa();
}

function toggleProtection(_index) {
    var esteAmigo = pessoas[_index];
    
    var char = esteAmigo.nome.slice(-1);
    char = (char == "a" ? "a" : "o");
    
    var frase = "rotegid"+char+" com sucesso";
    
    esteAmigo.isProtected = (esteAmigo.isProtected == 0 ? 1 : 0);
    esteAmigo.isProtected == 0 ? frase ="desp"+frase : frase ="p"+frase+"!";
    frase = esteAmigo.nome + " foi " + frase;
    $("#protSucesso").html(frase);
    
    actualizarListaAmigos();
    
     $("#opcoes_joao").html("<div onclick='toggleProtection("+_index+");goToSlide(7);return false;' class='menu_entrada'> \
                                <img src='img/shield.png ' class='imgEntrada '>&nbsp;" +
                                (esteAmigo.isProtected == 1 ? "Desproteger" : "Proteger") + 
                            "</div>");

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
    
}


function amigos() {
    //se estiver no perfil ou procurar
    if(current_i==1 ||current_i==8)
        prevEcra[5]=current_i;
    goToSlide(5);
    
    //reescrever a lista agora é feito no remover e adicionar amigo

}

function goToMenu() {
    
    goToSlide(0);
    prevStack = [];
}

// opcoes do menu principal 
function mapa() {
    prevEcra[12]=current_i;
        
    goToSlide(12);
    if(hf_on)
        $('.specialSeta').css('display', "none");
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
        $('specialSeta').css('display', "inline"); // setas só funciona no mapa ou cartaz
        
        $("#mao_livre").html("<p>Toque para <br> desactivar o modo mãos livres.");
    }
    else {
        hf_on = 0;
        $('.hf_inactivos').css('display', "inline");
        $("#mao_livre").html("<p>Toque para activar o modo mãos livres!");
    }
}


function cartaz() {
    cartazOn==1;
    goToSlide(21);
    
    if(hf_on)
        $('.specialSeta').css('display', "none");
    
    // tamanho entradas do cartaz
    $('.specialwidth').each(function() {
        $(this).css("height","25pt");

    });
	$('.helpResize').each(function() {
        $(this).css("height","30pt");
    });

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

function findComida() {
    $('#mapa').css('top', '-25pt');
    $('#mapa').css('left', '-30pt');
    mapa();
}

function comida() {
    //valorCompra = 0;
    itemsCompra = [];

    goToSlide(9);
    $("#botContinuar").css("display", "block");
    
    var checkss = $('input:checkbox[name="compra"]');
    //uncheck comidas
     checkss.each(function() {
        if ($(this).is(':checked')) {
            var alerte = !$(this).is(':checked');
            $(this).prop('checked', alerte);
        }

    });
    
}

function findMerch() {
    $('#mapa').css('top', '0pt');
    $('#mapa').css('left', '-121pt');
    mapa();
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
    $(".exchangeCompra").html("Total Pedido " + value + "€ <div style='height:3pt;width:1pt;'>");
    
    for (var i = 0; i < itemsCompra.length; i++) {
        $(".exchangeCompra").append(itemsCompra[i]);
    }
    

    $(".exchangeCompra").append("<div class='swiper-slide menu_entrada'></div>");
    $(".exchangeCompra").append("<div class='swiper-slide menu_entrada'></div>");

    $("#botContinuar").css("display", "none");
    $("#botVoltarConfirmar").css("display", "block"); // flex

    next();

}

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
    $('#mapa').css('left', '-18pt');
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
}

function cartazPrevious() {
     if (current_i >= 21 && current_i <= 23) { prev(); }
}

function encontros() {
    goToSlide(18);
}

function hf_mapa() {
    if (hf_on == 1) { mapa(); }
}


function removePrompt() {
    promptRemove = 1;
    $('.remove_screen').css("display", "inline");
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
            goToSlide(current_i - 1);
            //prev();
            break;
    }
});