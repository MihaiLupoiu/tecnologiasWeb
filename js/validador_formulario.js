function validacion() {
    //crear lista vacía para añadir los valores
    var lista_sql = ["SELECT", "DELETE", "FROM", "WHERE", "JOIN", "GROUP BY","*", "=", "%", "LIKE"];
    var inputs = document.getElementsByTagName('input');
    var date_rightnow = new Date();
    for(var i = 0; i < inputs.length; i++) {
        
        var valor = inputs[i].value.toUpperCase(); 
        if (lista_sql.indexOf(valor) > -1 ){
            alert('[ERROR] El campo no puede tener el valor '+inputs[i].value);
            return false;
        }
        //inputs["fecha_ini"] me devuelve el valor
        else if (inputs[i].getAttribute('id') =='fecha_ini'){
            var startdate = new Date(inputs[i].value);
            //alert(startdate);
            if (startdate < date_rightnow ){
                alert('[ERROR] Fecha inicio evento no puede ser menor que la fecha actual '+inputs[i].value);
                return false;
            }
        }
        else if (inputs[i].getAttribute('id') =='fecha_fin'){
            var enddate =  new Date(inputs[i].value);
            //alert(enddate);
            if (enddate < startdate){
                alert('[ERROR] Fecha finalización evento no puede ser menor que la de inicio '+inputs[i].value);
                return false;
            }
        }
        else if (inputs[i].getAttribute('id') =='precio'){
            if (inputs[i].value < 0){
                alert('[ERROR] Precio de evento no puede ser'+inputs[i].value);
                return false;
            }
        }
    }
    lista_eventos = crearlista(inputs);
    return true;
}

function crearlista(lista_imputs){
    var variables = document.getElementsByTagName('select');
    var descipcion = document.getElementsByTagName('textarea');
    var lista_valores_evento = [lista_imputs[0].value,lista_imputs[1].value,lista_imputs[2].value,lista_imputs[3].value,variables[0].value,lista_imputs[4].value,variables[1].value,lista_imputs[5].value,variables[2].value,descipcion[0].value,lista_imputs[6].value,lista_imputs[7].value]
    return lista_valores_evento;
}