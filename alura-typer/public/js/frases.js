$('#botao-change-phrase').click(fraseAleatoria);
$('#botao-frase-id').click(buscaFrase);

function fraseAleatoria(){
	$('#spinner').show();
	$('body').css('cursor','wait');
	$.get("http://localhost:3000/frases",trocaFraseAleatoria)
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


function trocaFraseAleatoria(data){

	let frase = $('.frase');
	let randomNumber = Math.floor(Math.random() * data.length);
	frase.text(data[randomNumber].texto);
	atualizaTamanhoFrase();
	atualizaTempoIncial(data[randomNumber].tempo);
	$('body').css('cursor','auto');
}

function buscaFrase(){

	let fraseId = $('#frase-id').val();
	let dados = { id: fraseId};
	$('#spinner').show();
	$('body').css('cursor','wait');
	$.get("http://localhost:3000/frases",dados,trocaFrase)
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

function trocaFrase(data){

	let frase = $('.frase');
	frase.text(data.texto);
	atualizaTamanhoFrase();
	atualizaTempoIncial(data.tempo);
	$('body').css('cursor','auto');

}