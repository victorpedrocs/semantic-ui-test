/*	
	0 : DATAHORA - data e hora da coleta dos dados
	1 : ORDEM - identificação do ônibus (número que fica na lateral)
	2 : LINHA
	3 : LATITUDE
	4 : LONGITUDE
	5 : VELOCIDADE - Km/h
*/
'use strict';
var markers = [];

$( function(){
//	key listener no input
	$('#numero_linha').keypress( function( event ){
		if(event.which === 13){
			carregaDados($('#numero_linha').val());	
		}
	});
	$('#mensagem').hide();

});

// carrega um ponto no mapa
function inserePontoMapa(onibus){
	var latLang = new google.maps.LatLng(onibus.latitude, onibus.longitude);

	var image = {
		url : '../_image/bus_pinpoint_icon_mini.png',
		size : new google.maps.Size(20,32)
	};

	var marker = new google.maps.Marker({
		position : latLang,
		map : map,
		icon : image,
		title : 'Linha: '+onibus.linha
			+' / Velocidade: '+onibus.velocidade+' Km/h'
	});

	markers.push(marker);
}

function clearMarkers(){
	$.each(markers, function(id, marker){
		marker.setMap(null);
	});

	markers = [];
}

function carregaDados (numeroLinha) {
    'use strict';
	
	console.log('Número da linha: '+numeroLinha);

//  var gpsOnibus = 'http://riob.us/proxy.php';
//	var gpsOnibus = 'http://dadosabertos.rio.rj.gov.br/apiTransporte/apresentacao/rest/index.cfm/obterTodasPosicoes';
	var gpsOnibus = 'http://dadosabertos.rio.rj.gov.br/apiTransporte/apresentacao/rest/index.cfm/obterPosicoesDaLinha/'+numeroLinha;
	var dataType = "json";
    var vetorOnibus = [];

	if(markers.length != 0){
		clearMarkers();
	}

	$.ajax({
		url : gpsOnibus,
//		data : { linha : numeroLinha },
		dataType : dataType,
		success : function ( data ){
             	$.each( data.DATA, function( id , row ){
					var onibus = {
						dataHora : row[0],
						identificacao : row[1],
						linha : row[2],
						latitude : row[3],
						longitude : row[4],
						velocidade : row[5]						
					};

					inserePontoMapa(onibus);
					vetorOnibus.push(onibus);
				});
			console.log(vetorOnibus);
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
