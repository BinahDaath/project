<?php
require_once("connexion.php");
$connexion=Connexion('Binah','Binah2001','sdr','localhost');
if (isset($_COOKIE['id'])&&isset($_COOKIE['password'])&&aut2($_COOKIE['id'],$_COOKIE['password'],$connexion)) 
{
	$id=$_COOKIE['id'];
	$resultat=ExecRequete("select * from contact$id",$connexion);
	$reponse=array();
	while ($a=mysqli_fetch_object($resultat)) 
	{
		$reponse[]=$a;
	}
	echo json_encode($reponse);
}
//######################

?>