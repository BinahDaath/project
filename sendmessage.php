<?php
require_once("connexion.php");
$connexion=Connexion('Binah','Binah2001','sdr','localhost');
if (isset($_COOKIE['id'])&&isset($_COOKIE['password'])&&aut2($_COOKIE['id'],$_COOKIE['password'],$connexion)&&((strlen($_POST['message_text'])>0)||isset($_FILES['message_image']))) 
{
	$id=$_COOKIE['id'];
	$message=mysqli_real_escape_string($connexion,$_POST['message_text']);
	$im_path="";
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
		ExecRequete("create table if not exists message$id_message(id_message  integer not null auto_increment primary key,sent_by integer,message varchar (200),image varchar(200))",$connexion);
		ExecRequete("create table if not exists id_image$id_message(id  integer )",$connexion);
		if(!mysqli_fetch_object(ExecRequete("select * from id_image$id_message",$connexion)))
		{
            ExecRequete("insert into id_image$id_message (id) values(1)",$connexion);
            mkdir('message'.$id_message);
		}
		if (isset($_FILES['message_image'])&&preg_match("/image/i",$_FILES['message_image']['type'])) 
		{
			$image=$_FILES['message_image'];
			$id_image=mysqli_fetch_object(ExecRequete("select * from id_image$id_message",$connexion))->id;
			$im_path="message$id_message/image$id_image";
			copy($image["tmp_name"],$im_path); 
			$id_image++;
			ExecRequete("update id_image$id_message set id=$id_image",$connexion);
		}
        ExecRequete("insert into message$id_message (sent_by,message,image) values($id,'$message','$im_path')",$connexion);
    }

}
//######################

?>