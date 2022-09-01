<?php
require_once("connexion.php");
$connexion=Connexion('Binah','Binah2001','sdr','localhost');
if (isset($_COOKIE['id'])&&isset($_COOKIE['password'])&&aut2($_COOKIE['id'],$_COOKIE['password'],$connexion)) 
{
	$id1=mysqli_real_escape_string($connexion,$_POST['id']);
	$id=$_COOKIE['id'];
	$resultat=ExecRequete("select id,username from user where id=$id1",$connexion);
	$reponse=array();
	while ($a=mysqli_fetch_object($resultat)) 
	{
		$reponse[]=$a;
	}
	echo json_encode($reponse);
}
//############################
?>