//Iniciación de BD
var html5rocks = {};
html5rocks.webdb = {};
html5rocks.webdb.db = null;

//Se crea la base de datos denominada "Todo" con un tamaño de 5Mb
html5rocks.webdb.open = function() {
  var dbSize = 5 * 1024 * 1024; // 5MB
  html5rocks.webdb.db = openDatabase("DevelUP", "1.0", "Base de datos de DevelUP", dbSize);
                                    //Nombre, Versión, Descripción, Tamaño
}

//Crea la tabla "todo" con los argumentos ID, todo y added_on
//Donde ID es un numero autoincrementado y clave primaria
//Todo es un campo tipo texto
//Added_on es un campo de fecha
html5rocks.webdb.createTable = function() {
  var db = html5rocks.webdb.db;
  db.transaction(function(tx) {
    tx.executeSql("CREATE TABLE IF NOT EXISTS eventos(ID INTEGER PRIMARY KEY ASC, nombre TEXT, fecha_ini DATETIME, fecha_fin DATETIME, precio INTEGER, publico TEXT, asistentes INTEGER, lugar TEXT, recinto TEXT, tipo TEXT, descripcion TEXT, imagen TEXT, mail TEXT)", []);
  });
}

//Inserta en la base de datos un nombre todo y se le asigna una fecha
html5rocks.webdb.add_evento = function(nombre, fecha_ini, fecha_fin, precio, publico, asistentes, lugar, recinto, tipo, descripcion, imagen, mail) {
  var db = html5rocks.webdb.db;
  db.transaction(function(tx){
    tx.executeSql("INSERT INTO eventos(nombre, fecha_ini, fecha_fin, precio, publico, asistentes, lugar, recinto, tipo, descripcion, imagen, mail) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)",
        [nombre, fecha_ini, fecha_fin, precio, publico, asistentes, lugar, recinto, tipo, descripcion, imagen, mail],
        html5rocks.webdb.onSuccess,
        html5rocks.webdb.onError);
   });
}

//Muestra por pantalla si ha habido un error
html5rocks.webdb.onError = function(tx, e) {
  alert("There has been an error: " + e.message);
}

//Muestra todo los elementos de la base de datos
html5rocks.webdb.onSuccess = function(tx, r) {
  // re-render the data.
  //html5rocks.webdb.getAllTodoItems(loadTodoItems);
    console.log("exit on success");
}

//Muestra todos los datos de una variable
html5rocks.webdb.getAllTodoItems = function(renderFunc) {
  var db = html5rocks.webdb.db;
  db.transaction(function(tx) {
    tx.executeSql("SELECT * FROM todo", [], renderFunc,
        html5rocks.webdb.onError);
  });
}

//Elimina todos los datos donde el id coincide
html5rocks.webdb.deleteTodo = function(id) {
  var db = html5rocks.webdb.db;
  db.transaction(function(tx){
    tx.executeSql("DELETE FROM todo WHERE ID=?", [id],
        html5rocks.webdb.onSuccess,
        html5rocks.webdb.onError);
    });
}

//Imprime todos los datos
function loadTodoItems(tx, rs) {
  var rowOutput = "";
  var todoItems = document.getElementById("todoItems");
  for (var i=0; i < rs.rows.length; i++) {
    rowOutput += renderTodo(rs.rows.item(i));
  }

  todoItems.innerHTML = rowOutput;
}

//Imprime en forma de lista todo los datos
function renderTodo(row) {
  return "<li>" + row.todo  + " [<a href='javascript:void(0);'  onclick='html5rocks.webdb.deleteTodo(" + row.ID +");'>Delete</a>]</li>";
}

//orden de ejecución de las funciones
function init() {
  html5rocks.webdb.open();
  html5rocks.webdb.createTable();
  //html5rocks.webdb.getAllTodoItems(loadTodoItems);
}

function addEvent() {
  var lista_datos_evento = document.getElementById("form_evento").elements;
    html5rocks.webdb.add_evento(lista_datos_evento[0].value, lista_datos_evento[1].value, lista_datos_evento[2].value, lista_datos_evento[3].value, lista_datos_evento[4].value, lista_datos_evento[5].value, lista_datos_evento[6].value, lista_datos_evento[7].value, lista_datos_evento[8].value, lista_datos_evento[9].value, lista_datos_evento[10].value, lista_datos_evento[11].value)
    
    
    //for(var i = 0; i< lista_datos_evento.length; i++ ){
        //html5rocks.webdb.add_event(lista_datos_evento[i].value);
    //}
}