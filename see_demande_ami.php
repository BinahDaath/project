<?php
// a ajouter
require_once("connexion.php");
$connexion=Connexion('Binah','Binah2001','sdr','localhost');
if (isset($_COOKIE['id'])&&isset($_COOKIE['password'])&&aut2($_COOKIE['id'],$_COOKIE['password'],$connexion)) 
{
	$id=$_COOKIE['id'];
	$by_who=$_POST['by_who'];
	if ($by_who==1) 
	{
		$resultat=ExecRequete("select * from demande_by_me$id",$connexion);
		$reponse=array();
		while ($a=mysqli_fetch_object($resultat)) 
		{
			$reponse[]=$a;
		}
		echo json_encode($reponse);	
	}
	else
	{
		$resultat=ExecRequete("select * from demande_by_other$id",$connexion);
		$reponse=array();
		while ($a=mysqli_fetch_object($resultat)) 
		{
			$reponse[]=$a;
		}
		echo json_encode($reponse);
	}
}
//############################
?>