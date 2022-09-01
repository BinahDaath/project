<?php
require_once("connexion.php");
$connexion=Connexion('Binah','Binah2001','sdr','localhost');
if (isset($_COOKIE['id'])&&isset($_COOKIE['password'])&&aut2($_COOKIE['id'],$_COOKIE['password'],$connexion)) 
{
	$id=$_COOKIE['id'];
	$id1=$_POST['id'];
    $username=mysqli_fetch_object(ExecRequete("select username from user where id = $id1",$connexion))->username;
    ExecRequete("insert into friend$id (id,username) values($id1,'$username')",$connexion);
    $username=mysqli_fetch_object(ExecRequete("select username from user where id = $id",$connexion))->username;
    ExecRequete("insert into friend$id1 (id,username) values($id,'$username')",$connexion);
    ExecRequete("delete from demande_by_other$id where id=$id1",$connexion);
    ExecRequete("delete from demande_by_me$id1 where id=$id",$connexion);
}
//######################

?>