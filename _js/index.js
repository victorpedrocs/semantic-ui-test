/*	
	0 : DATAHORA
	1 : ORDEM
	2 : LINHA
	3 : LATITUDE
	4 : LONGITUDE
	5 : VELOCIDADE
*/
$( function(){
//	key listener no input
	$('#numero_linha').keypress( function( event ){
		if(event.which == 13){
			carregaDados($('#numero_linha').val());	
		}
	});
	$('#mensagem').hide();
});
function carregaDados (numeroLinha) {
    'use strict';
	
	console.log(numeroLinha);
    var gpsOnibus = 'http://riob.us/proxy.php';
	var dataType = 'json';
//	var gpsOnibus = 'http://dadosabertos.rio.rj.gov.br/apiTransporte/apresentacao/rest/index.cfm/obterTodasPosicoes';
//	var dataType = "";
    var vetorOnibus = [];
	$.ajax({
		url : gpsOnibus,
		data : { linha : numeroLinha },
		async : false,
		dataType : dataType,
		success : function ( data ){
             	$.each( data.DATA, function( id , row ){
					var onibus = {
						dataHora : row[0],
						ordem : row[1],
						linha : row[2],
						latitude : row[3],
						longitude : row[4],
						velocidade : row[5]						
					};
					vetorOnibus.push(onibus);
				});
			$('#mensagem').show();
			$('.ui.message').removeClass('error');
			$('.ui.message').addClass('success');
			$('#mensagem_cabecalho').text('JSON carregado com sucesso');
			$('#mensagem_corpo').text(data.DATA);
		},
		error : function ( e ) {
			$('#mensagem').show();
			$('.ui.message').removeClass('success');
			$('.ui.message').addClass('error');
			$('#mensagem_cabecalho').text('Erro');
			$('#mensagem_corpo').text(e.message);
		}
	});
	
	vetorOnibus.forEach(function( row ){
		console.log( row );
	});
        
}