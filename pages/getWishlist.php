<?php

// get the userInfo parameter from URL
$userID  = $_REQUEST["userID"];

$retVal = "";

// Put user info in database.
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "recengine";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    echo("Connection failed: " . $conn->connect_error);
} 

$dateTimeVal = date("Y-m-d H:i:s");
$sql="SELECT wishlist FROM users WHERE id='$userID'";
$result=mysqli_query($conn,$sql);

// Associative array
$row=mysqli_fetch_assoc($result);

echo $row["wishlist"];

// Free result set
mysqli_free_result($result);

$conn->close();

// Output "no suggestion" if no retVal was found or output correct values 
// echo $retVal === "" ? "failed" : $retVal;
?>
