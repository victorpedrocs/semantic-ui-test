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
//  var gpsOnibus = 'http://riob.us/proxy.php';
//	var gpsOnibus = 'http://dadosabertos.rio.rj.gov.br/apiTransporte/apresentacao/rest/index.cfm/obterTodasPosicoes';
var gpsOnibus = 'http://dadosabertos.rio.rj.gov.br/apiTransporte/apresentacao/rest/index.cfm/obterPosicoesDaLinha/';
var dataType = "json";
var vetorOnibus = [];

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
	var infoString =
		'<div id="content">'
    	+'<div id="siteNotice">'
		+'<div>'
		+'<h1 id="firstHeading" class="firstHeading">'+onibus.identificacao+'</h1>'
		+'<div id="bodyContent">'
		+'Valocidade : '+onibus.velocidade+' Km/h'
		+'<br>Linha : '+onibus.linha
		+'</div>'
		+'</div>'
		+'</div>'

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

	var info = new google.maps.InfoWindow({
		content : infoString
	});

	google.maps.event.addListener(marker, 'click', function(){
		info.open(map, marker);
	})

	markers.push(marker);
}

function clearAllMarkers(){
	$.each(markers, function(id, marker){
		marker.setMap(null);
	});

	markers = [];
}

function carregaDados (numeroLinha) {
	
	console.log('Número da linha: '+numeroLinha);

	if(markers.length != 0){
		clearAllMarkers();
	}

	$.ajax({
		url : gpsOnibus+numeroLinha,
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
