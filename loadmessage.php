<?php
require_once("connexion.php");
$connexion=Connexion('Binah','Binah2001','sdr','localhost');
if (isset($_COOKIE['id'])&&isset($_COOKIE['password'])&&aut2($_COOKIE['id'],$_COOKIE['password'],$connexion)) 
{
	$id=$_COOKIE['id'];
	$id1=$_POST['id'];
	$id_message=create_id_message($id,$id1);
	$resultat=ExecRequete("select * from message$id_message",$connexion);
	$reponse=array();
	while ($a=mysqli_fetch_object($resultat)) 
	{
		$reponse[]=$a;
	}
	echo json_encode($reponse);
}
//############################
?>