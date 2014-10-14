//Iniciación de BD
var develup = {};
develup.webdb = {};
develup.webdb.db = null;

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
    tx.executeSql("CREATE TABLE IF NOT EXISTS eventos(ID INTEGER PRIMARY KEY ASC, nombre TEXT, fecha_ini DATETIME, fecha_fin DATETIME, precio INTEGER, publico TEXT, asistentes INTEGER, lugar TEXT, recinto TEXT, tipo TEXT, descripcion TEXT, imagen TEXT, mail TEXT)", []);
  });
}

//Inserta en la base de datos un nombre todo y se le asigna una fecha
develup.webdb.add_evento = function(nombre, fecha_ini, fecha_fin, precio, publico, asistentes, lugar, recinto, tipo, descripcion, imagen, mail) {
    var db = develup.webdb.db;
    //alert(nombre+" "+fecha_ini+" "+fecha_fin+" "+precio+" "+publico+" "+asistentes+" "+lugar+" "+recinto+" "+tipo);
    db.transaction(function(tx){
    tx.executeSql("INSERT INTO eventos(nombre, fecha_ini, fecha_fin, precio, publico, asistentes, lugar, recinto, tipo, descripcion, imagen, mail) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)",
        [nombre, fecha_ini, fecha_fin, parseInt(precio), publico, parseInt(asistentes), lugar, recinto, tipo, descripcion, imagen, mail],
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
    alert("Datos añadidos de forma satisfactoria.");
    console.log("exit on success");
}

//========== Muesta Datos

develup.webdb.getAllTodoItems = function(renderFunc) {
        var db = html5rocks.webdb.db;
        db.transaction(function(tx) {
          tx.executeSql("SELECT * FROM eventos", [], renderFunc,
              html5rocks.webdb.onError);
        });
      }
      
function loadTodoItems(tx, rs) {
        var rowOutput = "";
        var todoItems = document.getElementById("todoItems");
        for (var i=0; i < rs.rows.length; i++) {
          rowOutput += renderTodo(rs.rows.item(i));
        }
      
        todoItems.innerHTML = rowOutput;
      }

unction renderTodo(row) {
        return "<li>" + row.todo  + " [<a href='javascript:void(0);'  onclick='develup.webdb.deleteTodo(" + row.ID +");'>Delete</a>]</li>";
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
    develup.webdb.add_evento(lista_datos_evento[0], lista_datos_evento[1], lista_datos_evento[2], lista_datos_evento[3], lista_datos_evento[4], lista_datos_evento[5], lista_datos_evento[6], lista_datos_evento[7], lista_datos_evento[8], lista_datos_evento[9], lista_datos_evento[10], lista_datos_evento[11]);
}