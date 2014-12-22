function cargarUrl(url,elementoID,method,data) {
  var xhr = new XMLHttpRequest();
  xhr.open(method, url, true);  
  if (!xhr) {
    alert('Fallo AJAX'); 
    return; 
  }
  xhr.onload = function() {
    document.querySelector(elementoID).innerHTML=xhr.responseText;

    var form2 = document.querySelector('#form_evento');
	if (form2){
		form2.addEventListener("submit",function(evt){
			evt.preventDefault();
			    var data = {};
				for (var i = 0, ii = form2.length; i < ii; ++i) {
					var input = form2[i];
					if (input.name) {
						data[input.name] = input.value;
					}
				}
				//console.log(data);
				enviarJsonUrl(form2.action+"&type=Ajax",data,"#central");
	        })
	}
  }; 
 xhr.onerror = function() {
    alert('Woops, there was an error making the request.'); 
  }; 
  xhr.send(data); 
}

function enlacesAjax() {
	anchors=document.querySelector("#add_event");
	var url=anchors.href;
	anchors.href="javascript:cargarUrl(\""+url+"Ajax\",\"#central\",\"GET\",\"\")";
}


window.addEventListener("load", function (evt) {

	var form = document.querySelector('#buscar');	
	
	//listar las opciones
	cargarUrl("scrip_php/opciones.php",'[name="campo1"]',"GET","");
	cargarUrl("scrip_php/opciones.php",'[name="campo2"]',"GET","");

	if (form)
	{
		form.addEventListener("submit",function(evt){
		evt.preventDefault();
	//console.log(form.action);
	var formulario = new FormData(form);
	url=form.action+"&type=Ajax";
	//console.log(url);
	cargarUrl(url,"table","post",formulario);
	
		})
		}
/*si soporta Ajax*/
	var xhr0 = new XMLHttpRequest();
	if (xhr0) {  
		enlacesAjax();
	}
});

function enviarJsonUrl(url,DatoJson,elemento) {
 
  var xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);  
 
  // Response handlers.
  xhr.setRequestHeader('Content-Type', 'application/json');
 
 
   xhr.onerror = function() {
    alert('Woops, there was an error making the request.'); 
  };
   xhr.onload = function() {
   document.querySelector(elemento).innerHTML=xhr.responseText;
   //postJson();
   }
   console.log(DatoJson);
   console.log(url);
  xhr.send(JSON.stringify(DatoJson)); 
 // xhr.send('{myData:"hola"}');
  return false;
}
