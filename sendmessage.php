<?php
require_once("connexion.php");
$connexion=Connexion('Binah','Binah2001','sdr','localhost');
if (isset($_COOKIE['id'])&&isset($_COOKIE['password'])&&aut2($_COOKIE['id'],$_COOKIE['password'],$connexion)) 
{
	$id=$_COOKIE['id'];
	$message=mysqli_real_escape_string($connexion,$_POST['message']);
	$id1=$_POST['id'];
	if(mysqli_fetch_object(ExecRequete("select id from user where id = $id1",$connexion)))
	{
		if(!mysqli_fetch_object(ExecRequete("select id from contact$id where id = $id1",$connexion)))
		{
			$username=mysqli_fetch_object(ExecRequete("select username from user where id = $id1",$connexion))->username;
			ExecRequete("insert into contact$id (id,username) values($id1,'$username')",$connexion);
			$username=mysqli_fetch_object(ExecRequete("select username from user where id = $id",$connexion))->username;
			ExecRequete("insert into contact$id1 (id,username) values($id,'$username')",$connexion);

		}
		$id_message=create_id_message($id,$id1);
		ExecRequete("create table if not exists message$id_message(id_message  integer not null auto_increment primary key,sent_by integer,message varchar (200))",$connexion);
        ExecRequete("insert into message$id_message (sent_by,message) values($id,'$message')",$connexion);
    }

}
//######################

?>