<?php
require_once("connexion.php");
$connexion=Connexion('Binah','Binah2001','sdr','localhost');
$go_connect=1;
if (isset($_COOKIE['id'])&&isset($_COOKIE['password'])&&aut2($_COOKIE['id'],$_COOKIE['password'],$connexion)) 
{
  $go_connect=0;
}
else if (isset($_POST['mail'])&&isset($_POST['password'])&&aut1($_POST['mail'],$_POST['password'],$connexion)) 
{
      $mail=mysqli_real_escape_string($connexion,$_POST['mail']);
      $password=mysqli_real_escape_string($connexion,$_POST['password']);
      $resultat=ExecRequete("select id from user where mail='$mail'",$connexion);
      $id=mysqli_fetch_object($resultat)->id;
      setcookie('id',$id);
      setcookie('password',$password);
      $go_connect=0;
}
?>
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
              <a href="#" onclick="">
              <input id="rechercher" type="texte" size="50"><span class="glyphicon glyphicon-search"></span>
              </a>
            </li>
            <li id="message">
              <a href="#">
                <span class="glyphicon glyphicon-envelope"></span><br class="hidden-xs"></a>
            </li>
            <li id="friend">
              <a href="#"><div>friend</div></a>
            </li>
            <li id="username">
              <a href="#">
                <span class="glyphicon glyphicon-user"></span></a>
            </li>
          </ul><!-- #nav-list -->
        </div><!-- .collapse .navbar-collapse -->
      </div><!-- .container -->
    </nav><!-- #header-nav -->
  </header>
  <div id="main-content" class="container">
  	<?php
  	if($go_connect)
    {
  		echo "<form action='connecte.php' method='post'>
  		<p>
  			mail<input type='text' name='mail' size='50'>
  		</p>
  		<p>
  			password<input type='password' name='password' size='50'>
  		</p>
  		<input type='submit'  value='se connecter'>
  		</form>";
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
