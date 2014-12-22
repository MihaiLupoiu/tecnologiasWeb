<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

//conexión BD.
require_once('./bd2.php');
// gestion errores BD.

$result = $db->prepare("SELECT * FROM usuariosDevelup");
$result->execute();

$rs = $result->fetchAll(PDO::FETCH_ASSOC);

$outp = "[";
foreach ($rs as $row){
    if ($outp != "[") {
	    $outp .= ",";    
    }
    $outp .= '{"Nombre":"'  . $row["nombre"] . '",';
    $outp .= '"Apellido":"'   . $row["apellido"]        . '",';
    $outp .= '"Email":"'. $row["email"]     . '"}'; 
}
$outp .="]";


echo($outp);

?>