 <!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>site de rencontre</title>
    <link rel="stylesheet" href="css/bootstrap.min.css">
    <link rel="stylesheet" href="css/styles.css">
    <link href='https://fonts.googleapis.com/css?family=Oxygen:400,300,700' rel='stylesheet' type='text/css'>
    <link href='https://fonts.googleapis.com/css?family=Lora' rel='stylesheet' type='text/css'>
  </head>
<body>
  <header>
    <nav id="header-nav" class="navbar navbar-default">
      <div class="container">  
        <div id="" class="">
           <ul id="nav-list" class="nav navbar-nav navbar-right">
            <li id="">
              <a href="#">
              <input id="rechercher" type="texte" size="50">
              </a>
            </li>
            <li id="message">
              <a href="#">
                <span class="glyphicon glyphicon-info-sign"></span><br class="hidden-xs">message</a>
            </li>
            <li id="username">
              <a href="#">
                <span class="glyphicon glyphicon-certificate"></span><br class="hidden-xs">username</a>
            </li>
            <li id="friend">
              <a href="#"><div>friend</div></a>
            </li>
          </ul><!-- #nav-list -->
        </div><!-- .collapse .navbar-collapse -->
      </div><!-- .container -->
    </nav><!-- #header-nav -->
  </header>
  <div id="main-content" class="container">
  	<?php
  	require_once("connexion.php");
  	$connexion=Connexion('Binah','Binah2001','sdr','localhost');
  	if (!(isset($_GET['mail'])&&isset($_GET['username'])&&isset($_GET['password'])&&!(mailexist($_GET['mail'],$connexion)))) {
  		echo "<form action='inscription.php' method='get'>
  		<p>
  			mail<input type='text' name='mail' size='50'>
  		</p>
  		<p>
  			username<input type='text' name='username' size='50'>
  		</p>
  		<p>
  			passwors<input type='password' name='password' size='50'>
  		</p>
  		<input type='submit'  value=\"s'inscrire\">
  		</form>";
  	}
  	else
  	{
      $mail=mysqli_real_escape_string($connexion,$_GET['mail']);
      $username=mysqli_real_escape_string($connexion,$_GET['username']);
      $password=mysqli_real_escape_string($connexion,$_GET['password']);
      ExecRequete("insert into user (mail,username,password) values ('$mail','$username','$password')",$connexion);
      $resultat=ExecRequete("select id from user where mail='$mail'",$connexion);
      $a=mysqli_fetch_object($resultat);
      $id=$a->id;
      ExecRequete("create table contact$id (id integer,username varchar(50))",$connexion);
      ExecRequete("create table friend$id (id integer,username varchar(50))",$connexion);
      ExecRequete("create table demande_by_me$id (id integer,username varchar(50))",$connexion);
      ExecRequete("create table demande_by_other$id (id integer,username varchar(50))",$connexion);
      //ExecRequete("create table desc$id (id_message  integer not null auto_increment primary key,message varchar(200),image varchar(200))",$connexion);
      //ExecRequete("create table id_image$id(id  integer )",$connexion);
      //ExecRequete("insert into id_image$id (id) values(1)",$connexion);
      //mkdir('message'.$id);
  	}
	?>
  </div>
  <!-- jQuery (Bootstrap JS plugins depend on it) -->
  <script src="js/jquery-2.1.4.min.js"></script>
  <script src="js/bootstrap.min.js"></script>
  <script src="js/ajax-utils.js"></script>
  <script src="js/script.js"></script>
</body>
</html>
