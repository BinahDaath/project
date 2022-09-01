<?php
function Connexion ($pNom,$pMotPasse,$pBase,$pServeur )
{
// Connexion au serveur
$connexion = mysqli_connect($pServeur,$pNom,$pMotPasse,$pBase);
if (!$connexion) {
echo " Désolé , connexion au serveur $pServeur impossible \n";
exit;
}
// Connexion à la bas
// On renvoie la variable de connexion
return $connexion;
} // Fin de la fonction



function ExecRequete ($requete,$connexion)
{
$resultat = mysqli_query($connexion,$requete) ;
if ($resultat)
return $resultat ;
else {
echo"<b>Erreur dans l’exécution de la requête ’ $requete ’ .
</b><br/> " ;
echo "<b>Message de MySQL : </b>" . mysql_error ($connexion) ;
exit ;
}
} // Fin de la fonction ExecRequete
// Recherche de l ’ objet suivant
function ObjetSuivant( $resultat )
{
return mysql_fetch_object ($resultat ) ;
}
// Recherche de la ligne suivante (retourne un tableau)
function LigneSuivante ( $resultat )
{
return mysql_fetch_assoc ($resultat);
}
function mailexist($mail,$connexion)
{
	$resultat=ExecRequete("select id from user where mail='$mail'",$connexion);
	if(mysqli_fetch_object($resultat)) {
		return 1;
	}
	else
		return 0;
}
function aut1($mail,$password,$connexion)
{   
	$mail=mysqli_real_escape_string($connexion,$mail);
	$password=mysqli_real_escape_string($connexion,$password);
	$resultat=ExecRequete("select id from user where mail='$mail' and password='$password'",$connexion);
	if (mysqli_fetch_object($resultat)) {
		return 1;
	}
	else
		return 0;
}
function aut2($id,$password,$connexion)
{
	$resultat=ExecRequete("select id from user where id=$id and password='$password'",$connexion);
	if (mysqli_fetch_object($resultat)) {
		return 1;
	}
	else
		return 0;
}
function string_to_x($string,$x)
{
	$i=$x-strlen($string);
	$a="";
	while ( $i>0) 
	{
       $a.="0";
       $i--;
	}
	return $a.$string;
}
function create_id_message($id,$id1)
{
	$idc=string_to_x("".$id,11);
	$id1c=string_to_x("".$id1,11);
	if($id<$id1)
	{
       return $idc.$id1c;
	}
	else
		return $id1c.$idc;
}
?>