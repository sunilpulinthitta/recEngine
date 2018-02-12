<?php

// get the userInfo parameter from URL
$userID   = $_REQUEST["userID"];
$userName = $_REQUEST["userName"];
$gender   = $_REQUEST["gender"];
$ageRange = $_REQUEST["ageRange"];

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

//$query = "SELECT COALESCE ((SELECT count(id) as c FROM users WHERE id='$userID' GROUP BY id), 0)";

//$query = "SELECT COUNT(*) FROM Users WHERE id = '$userID'";

//$result = mysqli_query($conn, $query);
//print_r($result);
//print_r(mysqli_fetch_assoc($result));

//if (FALSE != $result)
//{
//	if ( mysqli_fetch_assoc($result) ) 
//	{
//		echo "Already exists";
//	} 
//	else 
//	{
//		$query = "INSERT INTO users (id, userName, gender, ageRange, lastLogin) VALUES ('{$userID}', '{$userName}', '{$gender}', '{$ageRange}', '{$dateTimeVal}')";
//		$result = mysqli_query($conn, $query);
//		echo $result;
//	}
//}

$query="INSERT INTO users (id, userName, gender, ageRange, lastLogin) VALUES('{$userID}', '{$userName}', '{$gender}', '{$ageRange}', '{$dateTimeVal}') ON DUPLICATE KEY UPDATE lastLogin='{$dateTimeVal}'";


//$query = "INSERT INTO users (id, userName, gender, ageRange, lastLogin) VALUES ('{$userID}', '{$userName}', '{$gender}', '{$ageRange}', '{$dateTimeVal}')";
if ($conn->query($query) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();

// Output "no suggestion" if no retVal was found or output correct values 
//echo $retVal === "" ? "failed" : $retVal;
?>
