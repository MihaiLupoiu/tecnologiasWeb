//Iniciación de BD
var html5rocks = {};
html5rocks.webdb = {};
html5rocks.webdb.db = null;

//Se crea la base de datos denominada "Todo" con un tamaño de 5Mb
html5rocks.webdb.open = function() {
  var dbSize = 5 * 1024 * 1024; // 5MB
  html5rocks.webdb.db = openDatabase("Todo", "1.0", "Todo manager", dbSize);
                                    //Nombre, Versión, Descripción, Tamaño
}

//Crea la tabla "todo" con los argumentos ID, todo y added_on
//Donde ID es un numero autoincrementado y clave primaria
//Todo es un campo tipo texto
//Added_on es un campo de fecha
html5rocks.webdb.createTable = function() {
  var db = html5rocks.webdb.db;
  db.transaction(function(tx) {
    tx.executeSql("CREATE TABLE IF NOT EXISTS todo(ID INTEGER PRIMARY KEY ASC, todo TEXT, added_on DATETIME)", []);
  });
}

//Inserta en la base de datos un nombre todo y se le asigna una fecha
html5rocks.webdb.addTodo = function(todoText) {
  var db = html5rocks.webdb.db;
  db.transaction(function(tx){
    var addedOn = new Date();
    tx.executeSql("INSERT INTO todo(todo, added_on) VALUES (?,?)",
        [todoText, addedOn],
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
  html5rocks.webdb.getAllTodoItems(loadTodoItems);
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
  html5rocks.webdb.getAllTodoItems(loadTodoItems);
}

function addTodo() {
  var todo = document.getElementById("todo");
  html5rocks.webdb.addTodo(todo.value);
  todo.value = "";
}​