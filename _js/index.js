

function carregaDados (numeroLinha) {
    'use strict';
	console.log(numeroLinha);
    var gpsOnibus = 'http://riob.us/proxy.php';
    
    $.getJSON(gpsOnibus, 
              {
				  linha : numeroLinha
              },
             function ( data ){
             	$.each( data.COLUMNS, function( i, d ){
					alert( d );
				});
             });
    
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