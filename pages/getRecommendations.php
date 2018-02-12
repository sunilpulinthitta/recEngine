<?php

// get the userInfo parameter from URL.
$movieTitle   = $_REQUEST["movieTitle"];

$recommendations = "";

if( isset($_GET['movieTitle']))    
{
	$movieTitle = $_GET['movieTitle'];
	$e = exec("Rscript C:/xampp/htdocs/rcEngine/rscripts/getRecommendations.R $movieTitle", $recommendations);
	var_dump($e);
}
print_r($recommendations);
// Output "no suggestion" if no retVal was found or output correct values 
//echo $retVal === "" ? "failed" : $retVal;
?>
