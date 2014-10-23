//Iniciación de BD
var develup = {};
develup.webdb = {};
develup.webdb.db = null;

//objeto evento

var Objetoevento = new Object();
Objetoevento.nombre = "nombre";
Objetoevento.fecha_ini = "22-02-2014";
Objetoevento.fecha_fin = "31-03-2014";
Objetoevento.precio = "precio del evento";
Objetoevento.publico = "500";
Objetoevento.asistentes = "Mixto";
Objetoevento.lugar = "Castellon";
Objetoevento.recinto = "Ribalta";
Objetoevento.tipo = "LanParty";
Objetoevento.descripcion = "asdf";
Objetoevento.imagen = "";
Objetoevento.mail = "22@gmail.com";


Objetoevento.constructorEvento = function(nombre,fecha_ini, fecha_fin, precio, publico, asistentes, lugar, recinto, tipo, descripcion, imagen, mail)
{this.nombre = nombre;
this.fecha_ini = fecha_ini;
this.fecha_fin = fecha_fin;
this.precio = precio;
this.publico = publico;
this.asistentes = asistentes;
this.lugar = lugar;
this.recinto = recinto;
this.tipo = tipo;
this.descripcion = descripcion;
this.imagen = imagen;
this.mail = mail;}


//Se crea la base de datos denominada "Todo" con un tamaño de 5Mb
develup.webdb.open = function() {
  var dbSize = 5 * 1024 * 1024; // 5MB
  develup.webdb.db = openDatabase("DevelUP", "1.0", "Base de datos de DevelUP", dbSize);
                                    //Nombre, Versión, Descripción, Tamaño
}

//Crea la tabla "todo" con los argumentos ID, todo y added_on
//Donde ID es un numero autoincrementado y clave primaria
//Todo es un campo tipo texto
//Added_on es un campo de fecha
develup.webdb.createTable = function() {
  var db = develup.webdb.db;
  db.transaction(function(tx) {
    tx.executeSql("CREATE TABLE IF NOT EXISTS eventos(ID INTEGER PRIMARY KEY ASC, nombre TEXT, fecha_ini TEXT, fecha_fin TEXT, precio TEXT, publico TEXT, asistentes TEXT, lugar TEXT, recinto TEXT, tipo TEXT, descripcion TEXT, imagen TEXT, mail TEXT)", []);
  });
}

//Inserta en la base de datos un nombre todo y se le asigna una fecha
develup.webdb.add_evento = function(objeto_evento) {
    var db = develup.webdb.db;
    db.transaction(function(tx){
    tx.executeSql("INSERT INTO eventos(nombre, fecha_ini, fecha_fin, precio, publico, asistentes, lugar, recinto, tipo, descripcion, imagen, mail) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)",
        [objeto_evento.nombre, objeto_evento.fecha_ini, objeto_evento.fecha_fin, parseInt(objeto_evento.precio), objeto_evento.publico, parseInt(objeto_evento.asistentes), objeto_evento.lugar, objeto_evento.recinto, objeto_evento.tipo, objeto_evento.descripcion, objeto_evento.imagen, objeto_evento.mail],
        develup.webdb.onSuccess,
        develup.webdb.onError);
   });
}

//Muestra por pantalla si ha habido un error
develup.webdb.onError = function(tx, e) {
    alert("There has been an error: " + e.message);
}

//Muestra todo los elementos de la base de datos
develup.webdb.onSuccess = function(tx, r) {
  // re-render the data.
    alert("Operacion realizada con exito.");
    console.log("exit on success");
}

//========== Muesta Datos

develup.webdb.getAllTodoItems = function(renderFunc) {
        var db = develup.webdb.db;
        db.transaction(function(tx) {
          tx.executeSql("SELECT * FROM eventos", [], renderFunc,
              develup.webdb.onError);
        });
      }
      
function loadTodoItems(tx, rs) {
        var rowOutput = "";
        texto = "<tr> <td> nombre </td><td> fecha inicio </td><td>fecha fin</td><td>precio</td><td>publico</td><td>asistentes</td><td>lugar</td><td>recinto</td><td>tipo</td><td>descripcion</td><td> imagen </td><td>mail</td></tr>"
        rowOutput += texto;
        var todoItems = document.getElementById("todoItems");
        for (var i=0; i < rs.rows.length; i++) {
          rowOutput += renderTodo(rs.rows.item(i));
        }
      
        todoItems.innerHTML = rowOutput;
      }

function renderTodo(row) {
        return "<tr>" + "<td>" + row.nombre +  "</td>" + "<td>" + row.fecha_ini +  "</td>" + "<td>" + row.fecha_fin +  "</td>" + "<td>" + row.precio +  "</td>" +
        "<td>" + row.publico +  "</td>" + "<td>" + row.asistentes + "</td>" + "<td>" + row.lugar +  "</td>" + "<td>" + row.recinto +  "</td>" + "<td>" + row.tipo +  "</td>" +
        "<td>" + row.descripcion + "</td>" + "<td>" + row.imagen + "</td>" + "<td>" + row.mail +  "</td>" + "<td>[<a href='javascript:void(0);'  onclick='develup.webdb.deleteTodo(" + row.ID +");'>Delete</a>]</td></tr>";
      }

develup.webdb.deleteTodo = function(id) {
        var db = develup.webdb.db;
        db.transaction(function(tx){
          tx.executeSql("DELETE FROM eventos WHERE ID=?", [id],
              develup.webdb.onSuccess,
              develup.webdb.onError);
          });
      }

//==================================


//orden de ejecución de las funciones
function init() {
    develup.webdb.open();
    develup.webdb.createTable();
    develup.webdb.getAllTodoItems(loadTodoItems);
}

function addEvent(lista_datos_evento) {
    //alert('Dentro de db '+lista_datos_evento);
    console.log(lista_datos_evento);
    evento = new Objetoevento.constructorEvento(lista_datos_evento[0], lista_datos_evento[1], lista_datos_evento[2], lista_datos_evento[3], lista_datos_evento[4], lista_datos_evento[5], lista_datos_evento[6], lista_datos_evento[7], lista_datos_evento[8], lista_datos_evento[9], lista_datos_evento[10], lista_datos_evento[11]);
    develup.webdb.add_evento(evento);
}