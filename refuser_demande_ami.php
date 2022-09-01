<?php
require_once("connexion.php");
$connexion=Connexion('Binah','Binah2001','sdr','localhost');
if (isset($_COOKIE['id'])&&isset($_COOKIE['password'])&&aut2($_COOKIE['id'],$_COOKIE['password'],$connexion)) 
{
	$id=$_COOKIE['id'];
	$id1=$_POST['id'];
    ExecRequete("delete from demande_by_other$id where id=$id1",$connexion);
    ExecRequete("delete from demande_by_me$id1 where id=$id",$connexion);
}
//######################

?>