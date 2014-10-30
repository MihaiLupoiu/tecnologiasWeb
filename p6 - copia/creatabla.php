<?php

require_once  "privado/datosLocales.php";
 /* $hostname = "";
    $dbname = "";
    $username = "";
    $pw = "";
*/


/*Ahora conecto BD*/ 
    
try {
   $pdo = new PDO ("mysql:host=$hostname;dbname=$dbname","$username","$pw");
 
  
$query="CREATE TABLE IF NOT EXISTS usuarios2 (id INT(11) NOT NULL AUTO_INCREMENT, nombre VARCHAR(100), apellido VARCHAR(100), email VARCHAR(100), clave VARCHAR(25), PRIMARY KEY(id))";

$pdo->exec($query);
unset ($pdo);
 } 
    catch (PDOException $e) {
    echo "Failed to get DB handle: " . $e->getMessage() . "\n";
    exit;
  }
 
/*
$db = new PDO('mysql:host=localhost;dbname=<SOMEDB>', '<USERNAME>', 'PASSWORD');
$stmt = $db->prepare("select contenttype, imagedata from images where id=?");
$stmt->execute(array($_GET['id']));
*/

?>