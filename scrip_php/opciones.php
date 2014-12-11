<?php

//conexión BD.
require_once('./bd2.php');
// gestion errores BD.

$stmt = $db->prepare("SELECT * FROM usuariosDevelup WHERE UPPER(email) = UPPER(:email)");
#$stmt->execute("set names utf8");

#SELECT COLUMN_NAME
#FROM information_schema.columns
#WHERE table_name =  'eventos';


$result = $stmt->fetch(PDO::FETCH_ASSOC);

$db->exec("set names utf8");
    $sql = "SELECT COLUMN_NAME FROM information_schema.columns WHERE table_name='eventos'";

    foreach ($db->query($sql) as $row){
    	if ($row['COLUMN_NAME'] != "id" and $row['COLUMN_NAME'] != "imagen"){
	    	echo '<option value="' . $row['COLUMN_NAME'] . '">' . $row['COLUMN_NAME'] . '</option>' ;	
    	}
        
    }

?>