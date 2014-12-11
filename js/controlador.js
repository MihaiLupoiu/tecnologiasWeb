function cargarUrl(url,elementoID,method,data) {
  var xhr = new XMLHttpRequest();
  xhr.open(method, url, true);  
  if (!xhr) {
    alert('Fallo AJAX'); 
    return; 
  }
  xhr.onload = function() {
    document.querySelector(elementoID).innerHTML=xhr.responseText;
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


window.addEventListener("load", function () {

var form = document.querySelector('#buscar');

	cargarUrl("scrip_php/opciones.php",'[name="campo1"]',"GET","");
	cargarUrl("scrip_php/opciones.php",'[name="campo2"]',"GET","");

	if (form)
	{
	
		form.addEventListener("submit",function(evt){
		evt.preventDefault();
		/*var data = {};
  		for (var i = 0, ii = form.length; i < ii; ++i) {
    	var input = form[i];
    	if (input.name) {
      		data[input.name] = input.value;
    	}
       }
		enviarJsonUrl(form.action+"&type=Ajax",data,"#mensaje")
	*/
	console.log(form.action);
	var formulario = new FormData(form);
	url=form.action+"&type=Ajax";
	console.log(url);
	cargarUrl(url,"table","post",formulario);
	
		})
		}
/*si soporta Ajax*/
	var xhr0 = new XMLHttpRequest();
	if (xhr0) {  
		enlacesAjax();
	}
});

