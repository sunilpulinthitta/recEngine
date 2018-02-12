<?php

// get the userInfo parameter from URL
//$userID   = $_POST["userID"];
$UseName = $_POST["Name"];
$userEmail=$_POST["Email"];
$userPW=$_POST["password"];
$userConfirm=$_POST["confirm"];
$gender   = $_REQUEST["optionsRadios"];
$AgeR = $_REQUEST["age"];


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


$select = mysqli_query($conn, "SELECT Email FROM users WHERE Email = '".$_POST['Email']."'");

if(mysqli_num_rows($select)) {
    echo ('This email is already being used. Please use a different email id.');

	exit();
}

$uniid=md5(uniqid(rand(), true));
$sql="INSERT INTO users ( UserName, Email, Gender, ageRange, Password, id) VALUES('{$UseName}','{$userEmail}', '{$gender}', '{$AgeR}', '{$userPW}', '{$uniid}') ";
  // {$sql = "INSERT INTO users (id, userName, gender, ageRange, lastLogin) VALUES ('{$userID}', '{$userName}', '{$gender}', '{$ageRange}', '{time()}')";}
//$sql12="INSERT INTO movielist (id) VALUES ('{$useriD}')";
if ($conn->query($sql) === TRUE) {
    echo "You have registered successfully";
		echo  '<p><a href="login.html">Click here to login</a> </p>';
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();

// Output "no suggestion" if no retVal was found or output correct values 
//echo $retVal === "" ? "failed" : $retVal;
?>
