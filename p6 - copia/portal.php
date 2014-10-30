<?php
//conexión BD.
require_once('./script_php/bd.php');
// gestion errores BD.



$html=file_get_contents('./html/portal_t.html');

//asignar datos dinámicos portal
$diccionario = array(
'titulo'=>'Portal ',
'subtitulo'=>'Entra en el portal'); 

foreach ($diccionario as $clave=>$valor) { //sustitullo los valores entrecomillas por los valores del dicciona-rio
$html = str_replace('{'.$clave.'}', $valor, $html); }


//Gestion acciones usuario

if (isset($_REQUEST['accion'] )) {$accion=$_REQUEST['action']; }
else $accion="inicio";
switch ( $accion){
case "formulario":
	 $fuente = file_get_contents('./html/login_t.html'); $html = str_replace('{central}', $fuente, $html); 
	
case "login":
	if (isset($_POST['nombre'] )) {
		$fuente="<h1>Bienvenido ". $_POST["nombre"]. "</h1>"; $html = str_replace('{central}', $fuente, $html);}
	else{ $fuente = file_get_contents('./html/login_t.html'); $html = str_replace('{central}', $fuente, $html); }
case "listar": 
    $result= $pdo->prepare("SELECT * FROM usuarios  "); 
	$result->execute(); 	
    $datos= $result->fetchAll(PDO::FETCH_ASSOC);
	$fuente="";
	foreach($datos as $row){ 
    	foreach ($row as $key => $val){
		$fuente= $fuente. $key.": ".$val. " <br/>";}
		}
	$html = str_replace('{central}', $fuente, $html);
    default: $fuente="<h1>Bienvenido  </h1>"; 
}

// dinamicamente se carga la parte central
$html = str_replace('{central}', $fuente, $html);


// parte de gestion de posibles errores
if (!isset($mensaje)) $mensaje="";

$html = str_replace('{mensaje}',$mensaje, $html);
unset($pdo);
print $html; // envia a la salida estandar el fichero html, o sea al navegador.
?>
