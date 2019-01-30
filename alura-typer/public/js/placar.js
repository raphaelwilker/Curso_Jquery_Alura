$('#botao-show-placar').click(mostraPlacar);
$('#botao-sync').click(sincronizaPlacar);

function inserePlacar() {
    var corpoTabela = $(".placar").find("tbody");
    var usuario = "Douglas"
    var numPalavras = $("#contador-palavras").text();

    var linha = novaLinha(usuario, numPalavras);
    linha.find(".botao-remover").click(removeLinha);

    corpoTabela.append(linha);
    $('#botao-show-placar').slideDown(600);
    scrollPlacar();
}

function scrollPlacar(){
    let posicaoPlacar = $('.placar').offset().top;
    $("body").animate({
        scrollTop: posicaoPlacar+"px"
    },1000);
}

function novaLinha(usuario, palavras) {
    var linha = $("<tr>");
    var colunaUsuario = $("<td>").text(usuario);
    var colunaPalavras = $("<td>").text(palavras);
    var colunaRemover = $("<td>");

    var link = $("<a>").addClass("botao-remover").attr("href", "#");
    var icone = $("<i>").addClass("small").addClass("material-icons").text("delete");

    link.append(icone);

    colunaRemover.append(link);

    linha.append(colunaUsuario);
    linha.append(colunaPalavras);
    linha.append(colunaRemover);

    return linha;
}

function removeLinha() {
    event.preventDefault();
    let tr = $(this).parent().parent();
    tr.fadeOut(1000);
    setTimeout(function(){
        tr.remove();
    },1000)
}


function mostraPlacar(){
    $('.placar').stop().slideToggle(600);
}

function sincronizaPlacar(){
    let placar = [];
    let linhas = $('tbody>tr');
    linhas.each(function(){
        
        let usuario = $(this).find('td:nth-child(1)').text();
        let palavras  = $(this).find('td:nth-child(2)').text();
        
        let score = {
            usuario:usuario,
            pontos:palavras
        }

        placar.push(score);
    });

    let data = {
        placar:placar
    }

    $.post("http://localhost:3000/placar",data,function(){
        console.log("Salvou o placar no servidor.");
        $('#spinner').toggle();
    })
    .fail(function(){
        $('#erro').slideDown();
        setTimeout(function(){
            $('#erro').slideToggle();
        },2000);
    })
    .always(function(){
        $('#spinner').toggle();
    });

}

function atualizaPlacar() {

    $.get("http://localhost:3000/placar",function(data){
        $(data).each(function(){
            let linha = novaLinha(this.usuario,this.pontos);
            linha.find(".botao-remover").click(removeLinha);
            $('tbody').append(linha);
        });
        $('#spinner').toggle();
    })
    .fail(function(){
       $('#erro').slideDown();
       setTimeout(function(){
           $('#erro').slideToggle();
       },2000);
    })
    .always(function(){
        $('#spinner').toggle();
    });
}