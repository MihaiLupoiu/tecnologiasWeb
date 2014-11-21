<?php


/*esto es un comentario 
que termina aqui*/

//Esto es otro comentario de sólo una linea


//constante
const PI=2.1416;

//Variables
$a=2;
$b=2;
echo "Hola Mundo";
echo $c;
$c=$a+$b;
$d=$a.$b;
echo $d;
echo "$c";
echo '$c';
echo PI*3;

//Funciones

function concatenar($a)
{

$a="bienvenida/o\n";
echo $a;
echo "aui\n";
}
concatenar("oo\n");


$lista=array(1,2,3,4,5);
for ($i=0;$i<$lista.length;$i++){
	echo $lista[$i];	
} 

$lista=array();
$lista[]=1;
print_r($lista);

//diccionarios

$grants=array('read'=>'1','write'=>'2');
echo $grants['read'],"\n";
print_r ($grants);  //muestra listas
var_dump ($grants);  //muestra tipos complejos
foreach($grants as $val => $n)
{echo $val,"-",$n,"\n";}

if ($a=='hola') echo "1";
else echo "2";
$a="3";
switch ( $a){
case "1":echo "1";break;
case "2":echo "2";break;
default:echo "3";break;
}	


$messages = array(
		   array(

			 'id'=>'wellcome',
			 'description'=>'Bien Venid@'
			 ),
		   array(
			 'id'=>'logout',
			 'description'=>'Salir'
			 ),
		   array(
			 'id'=>'calendarlist',
			 'description'=>'Calendarios'
			 )
		   );


print_r($messages);
echo "=========== POST ============";
print_r ($_POST);
echo "=========== GET  ============";
print_r ($_GET);
echo "=========== REQUEST ============";
print_r ($_REQUEST);
echo "=========== GLOBALS ============";
print_r ($GLOBALS);
echo "=========== COOKIE ============";
print_r ($_COOKIE);
echo "=========== SERVER ============";
print_r ($_SERVER);
?>
