

function carregaDados () {
    'use strict';
	/* var flickerAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
		$.getJSON( flickerAPI, {
		tags: "mount rainier",
		tagmode: "any",
		format: "json"})
		.done( function ( data ){
			console.log(data);
		});*/
	var gpsOnibus = "http://dadosabertos.rio.rj.gov.br/apiTransporte/apresentacao/rest/index.cfm/obterTodasPosicoes";

	$.ajax({
        type : 'GET',
		url: gpsOnibus,
		contentType : 'json',	
		complete : function ( data ) {
			console.log($.parseJSON(data));
		},
		success : function (data){
			console.log(data);
		},
		error : function ( e ){
			console.log( e.message );
		}
		
    });
	
   /* var gpsOnibus = "http://dadosabertos.rio.rj.gov.br/apiTransporte/apresentacao/rest/index.cfm/obterTodasPosicoes";
    console.log(gpsOnibus);
    $.getJSON( gpsOnibus, {})
	.done( function( data ){
		console.log( jQuery.parseJSON( data) );
	});*/
    
    /*.done( function ( data ) {
        $.each( data.DATA, function( dataRow ) {
            
            0 : DATAHORA
            1 : ORDEM
            2 : LINHA
            3 : LATITUDE
            4 : LONGITUDE
            5 : VELOCIDADE
            
            var dataHora, ordem, linha, latitude, longitude, velocidade;
            dataHora = "<td>" + dataRow[0] + "</td>";
            ordem = "<td>"+dataRow[1]+"</td>";
            linha = "<td>"+dataRow[2]+"</td>";
            latitude = "<td>"+dataRow[3]+"</td>";
            longitude = "<td>"+dataRow[4]+"</td>";
            velocidade = "<td>"+dataRow[5]+"</td>";
            alert(linha);
            items.push("<tr>"+dataHora+ordem+linha+latitude+longitude+velocidade+"</tr>");
            
        });
        $("#tabela").append(items.join(""));
    });*/
        
}