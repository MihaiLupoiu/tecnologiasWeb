<?php

//conexión BD.
require_once('./scrip_php/bd.php');
// gestion errores BD.

$html=file_get_contents('./html/index.html');

session_start();

if ( isset($_SESSION['nombre']) && !is_null($_SESSION['nombre']) ) {
	$diccionario = array(
	'usuario_cuadro1'=>$_SESSION['nombre'],
	'usuario_cuadro2'=>'salir',
	);		
}else{
	$diccionario = array(
	'usuario_cuadro1'=>'LogIn',
	'usuario_cuadro2'=>'registrar',
); 
}

#print_r($_SESSION);

foreach ($diccionario as $clave=>$valor) { //sustitullo los valores entrecomillas por los valores del dicciona-rio
$html = str_replace('{'.$clave.'}', $valor, $html); }

// dinamicamente se carga la parte central
$html = str_replace('{usuario_cuadro1}', $fuente, $html);
$html = str_replace('{usuario_cuadro2}', $fuente, $html);
$html = str_replace('{contenido_titulo}', $fuente, $html);
#$html = str_replace('{mensaje}', $fuente, $html);


if (isset($_REQUEST['accion'] )) {$accion=$_REQUEST['accion']; }
else $accion="inicio";
switch ( $accion){
case "login":
	if ( !isset($_SESSION['email']) && is_null($_SESSION['email']) ) {
	
		if (isset($_POST['email'] )) {
			$result = "";
			try{
				$stmt = $db->prepare("SELECT * FROM usuariosDevelup WHERE UPPER(email) = UPPER(:email)");
				$stmt->execute(array(':email'=>$_REQUEST['email']));
				$result = $stmt->fetch(PDO::FETCH_ASSOC);
			}catch(Exception $e)
			{
				echo 'Error '.$e->getMessage();
			}
			
			if ($result["email"] == $_POST['email'] && $result["clave"] == $_POST['clave'] ){
				
				
				$_SESSION['email']  = $_POST['email'];
				$_SESSION['nombre']  = $result["nombre"];
				$_SESSION['time']   = time();
				
				$fuente="<h1>Bienvenido ". $_POST["email"]. "</h1>"; 
				$html = str_replace('{central}', $fuente, $html);
				
				$sec = "3";
				header("Refresh: $sec; url=index.php?accion=inicio");
			
			}else{
				$fuente="<h1>Error: los datos del usuario no son correctos.</h1>"; 
				$html = str_replace('{central}', $fuente, $html);	
			}
			
		}else{
			$titulo = "LogIn"; 
			$html = str_replace('{contenido_titulo}', $titulo, $html);
			
			$fuente = file_get_contents('./html/login.html');
			$html = str_replace('{central}', $fuente, $html); 
		}
		
	}else{
		$fuente="<h1>Error: Usuario ya registrado.</h1>"; 
		$html = str_replace('{mensaje}', $fuente, $html);
		
		$html = str_replace('{central}', "", $html);
		
		$sec = "3";
		header("Refresh: $sec; url=index.php?accion=inicio");
	}

	
	break;
	
case "registrar":
	$fuente = file_get_contents('html/registrar.html'); 
	$html = str_replace('{central}', $fuente, $html);
	
	$datos_usuario = $_REQUEST;
	#print_r($datos_usuario);
	$length = sizeof($datos_usuario);
	#print_r($length);
	
	#if (isset($_REQUEST) && !empty($_REQUEST) ) {
	if($length == 5 && $_REQUEST['email'] != ""){
		#echo "##" . isset($db) . "##" . var_dump($db);	
		
		$count = "";
		try{
			$stmt = $db->prepare("SELECT COUNT(*) FROM usuariosDevelup WHERE UPPER(email) = UPPER(:email)");
			$stmt->execute(array(':email'=>$_REQUEST['email']));
			$count = $stmt->fetchColumn();
		}catch(Exception $e){
			echo 'Eerror '.$e->getMessage();
		}
		
		#print_r($stmt);
		#echo "patata" . $count. "patata";
		#$stmt->debugDumpParams();
		if ($count <= 0 ){
			try{
				$stmt = $db->prepare("INSERT INTO usuariosDevelup(nombre ,apellido, email, clave)  VALUES(?, ?, ?, ?)");
				$stmt->execute(array($_REQUEST['nombre'], $_REQUEST['apellido'],$_REQUEST['email'],$_REQUEST['clave'] ));	
				#$stmt->debugDumpParams();
			}catch(Exception $e){
				echo 'Eerror '.$e->getMessage();
			}
		}
		else{
			 $fuente="<h1>Error: El correo ". $_POST["email"]." ya existe. </h1>"; 
			 $html = str_replace('{mensaje}', $fuente, $html);
			 $html = str_replace('{central}', "", $html);
		}
	}else{
		if($length > 1){
			$fuente="<h1>Error: El correo ". $_POST["email"]." ya existe. </h1>";
			$html = str_replace('{mensaje}', $fuente, $html);
			$html = str_replace('{central}', "", $html);
		}
	}
	break;

case "salir":
	session_destroy();
	$fuente = file_get_contents('./html/inicio_1.html');
	$html = str_replace('{central}', $fuente, $html);
	#$page = $_SERVER['PHP_SELF'];
	
	$sec = "0";
	header("Refresh: $sec; url=index.php?accion=inicio");
	
	break;
	
case "listar":
	$result = "";
	$stmt = $db->prepare("SELECT * FROM eventos");
	$stmt->execute();
	$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
		
	$fuente = file_get_contents('./html/listar.html');
	$html = str_replace('{central}', $fuente, $html);
	
	$texto = "<tr> <td> nombre </td><td> fecha inicio </td><td>fecha fin</td><td>precio</td><td>publico</td><td>asistentes</td><td>lugar</td><td>recinto</td><td>tipo</td><td>descripcion</td><td> imagen </td><td>mail</td></tr>";
	for($i=0; $i<count($result); $i++) {
		$fuente2 = "<tr>"."<td>".$result[$i]["nombre"]."</td>"."<td>".$result[$i]["fecha_ini"]."</td>"."<td>".$result[$i]["fecha_fin"]."</td>"."<td>".$result[$i]["precio"]."</td>"."<td>".$result[$i]["publico"]."</td>"."<td>".$result[$i]["asistentes"]."</td>"."<td>".$result[$i]["lugar"]."</td>"."<td>".$result[$i]["recinto"]."</td>"."<td>".$result[$i]["tipo"]."</td>"."<td>".$result[$i]["descripcion"]."</td>"."<td>".$result[$i]["imagen"]."</td>"."<td>".$result[$i]["mail"]."</td>"."</tr>";
		$texto=$texto.$fuente2;
	}
	$html = str_replace('{tabla}', $texto, $html);
	break;

case "formulario":
	if ( isset($_SESSION['email']) && !is_null($_SESSION['email']) ) {
	
		$fuente = file_get_contents('./html/formulario.html');
		$html = str_replace('{central}', $fuente, $html);
	}else{
		$fuente=" <h1>No se permite la acción si no está registrado. </h1>"; 
		$html = str_replace('{mensaje}', $fuente, $html);
		$html = str_replace('{central}', "", $html);
	}
	break;	

case "formularioAjax":
	if ( isset($_SESSION['email']) && !is_null($_SESSION['email']) ) {
	
		$fuente = file_get_contents('./html/formulario.html');
		echo $fuente;
		
	}else{
		$fuente=" <h1>No se permite la acción si no está registrado. </h1>"; 
		echo $fuente;
	}
	return 1;
	break;
	
case "addEvent":

	if (isset($_REQUEST['type']) && $_REQUEST['type'] = 'Ajax'){

		$fuente = file_get_contents('php://input');

		$a=json_decode($fuente, true) ; //devuelve diccionario
		
		array_pop($a);
		array_pop($a);

		$fields=array_keys($a); // here you have to trust your field names! 
		$values=array_values($a);
		$fieldlist=implode(',',$fields);
		$qs=str_repeat("?,",count($fields)-1);
		try{
			$sql="INSERT INTO eventos ($fieldlist) values(${qs}?)";
			
			$stmt = $db->prepare($sql);
			$stmt->execute($values);
		}catch(Exception $e)
		{
			echo 'Eerror '.$e->getMessage();
		}

		$result = "";
		
		$stmt = $db->prepare("SELECT * FROM eventos");
		$stmt->execute();
		$result = $stmt->fetchAll(PDO::FETCH_ASSOC);

		$fuente=" <h1>Evento añadido con exito. </h1><br>"; 
		echo $fuente;

		$texto = "<tr> <td> nombre </td><td> fecha inicio </td><td>fecha fin</td><td>precio</td><td>publico</td><td>asistentes</td><td>lugar</td><td>recinto</td><td>tipo</td><td>descripcion</td><td> imagen </td><td>mail</td></tr>";
		for($i=0; $i<count($result); $i++) {
			$fuente2 = "<tr>"."<td>".$result[$i]["nombre"]."</td>"."<td>".$result[$i]["fecha_ini"]."</td>"."<td>".$result[$i]["fecha_fin"]."</td>"."<td>".$result[$i]["precio"]."</td>"."<td>".$result[$i]["publico"]."</td>"."<td>".$result[$i]["asistentes"]."</td>"."<td>".$result[$i]["lugar"]."</td>"."<td>".$result[$i]["recinto"]."</td>"."<td>".$result[$i]["tipo"]."</td>"."<td>".$result[$i]["descripcion"]."</td>"."<td>".$result[$i]["imagen"]."</td>"."<td>".$result[$i]["mail"]."</td>"."</tr>";
			$texto=$texto.$fuente2;
		}
		$fuente = '<div id="listEventos"><table id="todoItems" border="1" align="center">'.$texto.'</table> </div>';
		echo $fuente;
		
		return 1;

	}

	if (isset($_POST['nombre'] )) {
		$result = "";
		try{
			$stmt = $db->prepare("INSERT INTO eventos(nombre, fecha_ini, fecha_fin, precio, publico, asistentes, lugar, recinto, tipo, descripcion, imagen, mail) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)");
			$stmt->execute(array($_POST['nombre'],$_POST['fecha_ini'],$_POST['fecha_fin'],$_POST['precio'],$_POST['publico'],$_POST['asistentes'],$_POST['lugar'],$_POST['recinto'],$_POST['tipo'],$_POST['descripcion'],$_POST['imagen'],$_POST['mail']));
			$result = $stmt->fetch(PDO::FETCH_ASSOC);
		}catch(Exception $e)
		{
			echo 'Eerror '.$e->getMessage();
		}
		
		$fuente=" <h1>Evento añadido con exito. </h1>"; 
		$html = str_replace('{central}', $fuente, $html);
		$html = str_replace('{mensaje}', "", $html);
		
		$sec = "3";
		header("Refresh: $sec; url=index.php?accion=listar");
	}
	break;
	
case "busqueda":
	$texto="";
	if (isset($_POST['valor_buscado'])) {
		$result = "";
		if ($_POST['valor_buscado2'] != "" ) {
			$stmt = $db->prepare("SELECT * FROM eventos WHERE ".$_POST['campo1']." like \"".$_POST['valor_buscado']."\" AND ".$_POST['campo2']." like \"".$_POST['valor_buscado2']."\";");
		}else{
			$stmt = $db->prepare("SELECT * FROM eventos WHERE ".$_POST['campo1']." like \"".$_POST['valor_buscado']."\";");
		}
		$stmt->execute();
		$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
		$fuente = file_get_contents('./html/listar.html');
		$html = str_replace('{central}', $fuente, $html);
		
		$texto = "<tr> <td> nombre </td><td> fecha inicio </td><td>fecha fin</td><td>precio</td><td>publico</td><td>asistentes</td><td>lugar</td><td>recinto</td><td>tipo</td><td>descripcion</td><td> imagen </td><td>mail</td></tr>";
		for($i=0; $i<count($result); $i++) {
			$fuente2 = "<tr>"."<td>".$result[$i]["nombre"]."</td>"."<td>".$result[$i]["fecha_ini"]."</td>"."<td>".$result[$i]["fecha_fin"]."</td>"."<td>".$result[$i]["precio"]."</td>"."<td>".$result[$i]["publico"]."</td>"."<td>".$result[$i]["asistentes"]."</td>"."<td>".$result[$i]["lugar"]."</td>"."<td>".$result[$i]["recinto"]."</td>"."<td>".$result[$i]["tipo"]."</td>"."<td>".$result[$i]["descripcion"]."</td>"."<td>".$result[$i]["imagen"]."</td>"."<td>".$result[$i]["mail"]."</td>"."</tr>";
			$texto=$texto.$fuente2;
		}
	}
	if (isset($_REQUEST["type"])) {
		echo $texto;
		return 1;
	}else{
		$html = str_replace('{tabla}', $texto, $html);
	}
	break;

case "contactUs":

	$fuente = file_get_contents('./html/contact.html');
	$html = str_replace('{central}', $fuente, $html);
	
	break;

default:
		$fuente = file_get_contents('./html/inicio_1.html');
		$html = str_replace('{central}', $fuente, $html);
}

// dinamicamente se carga la parte central
$html = str_replace('{contenido_titulo}', $fuente, $html);


// parte de gestion de posibles errores
if (!isset($mensaje)) $mensaje="";

$html = str_replace('{mensaje}',$mensaje, $html);
unset($pdo);
print $html; // envia a la salida estandar el fichero html, o sea al navegador.

?>
