<?php

// get the userInfo parameter from URL
$userID    = $_REQUEST["userID"];
$movieInfo = $_REQUEST["movieInfo"];

$retVal = "";

// Put user info in database.
$servername = "localhost";
$username   = "root";
$password   = "";
$dbname     = "recengine";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    echo("Connection failed: " . $conn->connect_error);
} 

$dateTimeVal = date("Y-m-d H:i:s");
$sql = "UPDATE users SET wishlist=concat_ws(';',wishlist,'{$movieInfo}') WHERE id='{$userID}'";

if ($conn->query($sql) === TRUE) {
    echo "Updated wishlist";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();

// Output "no suggestion" if no retVal was found or output correct values 
// echo $retVal === "" ? "failed" : $retVal;
?>
