var isDragging = false;
var nope = false;

$(document).ready(function() {

   var elem = document.getElementById('slider');   
    window.mySwipe = new Swipe(elem, {});

    //$("#activities").click(function(){
    //    $("#body").load("activities.html");
    //    $('div img').draggable();
    //});
    
    
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
    $('.joao_add_amigos').click(function() {
        if (nope == false) {
            var _that =  $(this);
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
        var t = setTimeout(function () {
            startTime();
        }, 500);
    }
    startTime();

   
   
});


    
var nome = ["Menu", 
            "<img src='img/user1.png' class='imgTitulo' align='center'> Perfil", 
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
    if (nope != false) {
        return false;
    }
    
    
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
    
      if (nope != false) {
        return false;
    }
    
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

function goToMenu() {
    goToSlide(0);
        
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
