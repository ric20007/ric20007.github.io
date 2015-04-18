var isDragging = false;

$(document).ready(function() {

   var elem = document.getElementById('slider');   
    window.mySwipe = new Swipe(elem, {});

    //$("#activities").click(function(){
    //    $("#body").load("activities.html");
    //    $('div img').draggable();
    //});


   //ajuda a nao clicar quando se faz drag    
   $('.draggable').draggable({
        stop: function(event, ui) {
            $( event.toElement ).one('click', function(e){ e.stopImmediatePropagation(); } );
        }
    });
    
    $('.menu_entrada').click(function() {
        $(this).addClass('highlighted');
        setTimeout(function() {
              $('.menu_entrada').removeClass('highlighted');
          }, 200);
    });
    
    $('.perfil_entrada').click(function() {
        $(this).addClass('highlighted');
        
        setTimeout(function() {
              $('.perfil_entrada').removeClass('highlighted');
          }, 200);
    });
    
    $('.joao_add_amigos').click(function() {
        $(this).addClass('highlighted');
        
        setTimeout(function() {
              $('.joao_add_amigos').removeClass('highlighted');
          }, 200);
    });
    
     
    
    
        
    var menu_offset = $('#menu').offset();
    
        
    var altura_entrada_menu = $(".menu_entrada").height();
    
    //alert(altura_entrada_menu);
    
                                         //so funciona num ecra
    var menu_offset_top1 = menu_offset.top - (5.65 * altura_entrada_menu);
    
    var menu_offset_top2 = menu_offset.top;
    
    $('.draggable').draggable({axis: "y", containment: [0, menu_offset_top1, 0, menu_offset_top2]});
    
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


    
var nome = ["Menu", "<img src='img/user1.png' class='imgTitulo' align='center'> Perfil", 
            "<img src='img/add-user.png' class='imgEntrada' align='center' > Add. Amigos",
            "<img src='img/add-user.png' class='imgEntrada' align='center' > Add. Amigos",
            "<img src='img/add-user.png' class='imgEntrada' align='center' > Add. Amigos", 
            "<img src='img/multy-user.png' class='imgEntrada' align='center' > Lista Amigos"];
            
var current_i = 0;
var previous_i = 0;

var joao_added = 0;
function mudarNome(i) {
        $("#titulo_menu").html(nome[i]);
}

function prev() {
    if (previous_i == -1){
        
        current_i = 1;
        mudarNome(current_i);
        mySwipe.slide(current_i, 300);
        
        previous_i = 0;
    }
        
    
    else if(current_i !== 0){
        current_i = current_i -1;
        mudarNome(current_i);
    mySwipe.prev();
    }
        
}

function next() {
    //if(!wasDragging){
       if(current_i < nome.length -1) {
           current_i = current_i +1;
           mudarNome(current_i);
         mySwipe.next();
       }
    //}
}

function goToSlide(i) {
    if(i >= 0 && i < nome.length -1 ){
        current_i = i;
         mudarNome(current_i);
    mySwipe.slide(i, 300);
    }
        
}

function goToSix() {
    current_i = 5;
    mudarNome(current_i);
    mySwipe.slide(current_i, 300);
    previous_i = -1;
    
    if (joao_added === 1)
        $("#lista_joao").html("<p style=\"text-align:center\" >João" );
    else
        $("#lista_joao").html("<p style=\"text-align:center\" >Não tem amigos" );
    
     
    
}


function adicionarJoao() {
    joao_added = 1;
        
}

function removerJoao() {
    joao_added = 0;
        
}


    

$(document).keydown(function(e){
    switch(e.keyCode) {
        case 40:
            break;
        case 38:
            goToSlide(0);
            break;
        case 39:
            next();
            break;
        case 37:
            prev();
            break;
    }
});
