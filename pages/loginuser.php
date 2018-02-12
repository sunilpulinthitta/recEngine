<?php

// get the userInfo parameter from URL
//$userID   = $_POST["userID"];
//$LoginName = $_POST["Name"];
$userEmail=$_POST["email"];
$userPW=$_POST["password"];
//$userConfirm=$_POST["confirm"];
//$gender   = $_REQUEST["optionsRadios"];
//$AgeR = $_REQUEST["age"];


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


$select = mysqli_query($conn, "SELECT Email FROM users WHERE Email = '".$_POST['email']."'");

if(mysqli_num_rows($select)>0) {
   echo header("location: index.html?email=$userEmail");
	exit();
}
else {
echo ("Please provide the correct email and password");
}



//$sql="INSERT INTO users (UserName, Email, Gender, ageRange, Password) VALUES('{$UseName}','{$userEmail}', '{$gender}', '{$AgeR}', '{$userPW}') ";
  // {$sql = "INSERT INTO users (id, userName, gender, ageRange, lastLogin) VALUES ('{$userID}', '{$userName}', '{$gender}', '{$ageRange}', '{time()}')";}
//$sql12="INSERT INTO movielist (id) VALUES ('{$useriD}')";
//if ($conn->query($sql) === TRUE) {
  //  echo "You have registered successfully";
	//	echo  '<p><a href="login.html">Click here to login</a> </p>';
//} else {
  //  echo "Error: " . $sql . "<br>" . $conn->error;
//}

$conn->close();

// Output "no suggestion" if no retVal was found or output correct values 
//echo $retVal === "" ? "failed" : $retVal;
?>
