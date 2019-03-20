<?php
//echo("Start...");
$username = $_GET['user']; 
$passw = $_GET['pass']; 
$game = $_GET['game'];
$lev = $_GET['lev'];
$numq = $_GET['numq']; 
$score = $_GET['score']; 
$timer = $_GET['timer']; 
$numc = $_GET['numc']; 
$nume = $_GET['nume']; 
$stamp = $_GET['stamp']; 
$cor = $_GET['cor']; 
$err = $_GET['err']; 

include("constants2.php");
$linkID = mysql_connect(DBM_SERVER, DBM_USER, DBM_PASS) or die("Could not connect.  Check back later.");
mysql_select_db(DBM_NAME, $linkID) or die("Could not find database.");

if (strlen($username) > 0) {
	$query = "SELECT level FROM game_users WHERE name = '$username'";
	$result2= mysql_query($query,$linkID) or die("Data not found.");
	$row = mysql_fetch_assoc($result2);
	$lev = $row['level'];
}

$query="INSERT into gamescores VALUES ('$username', '$passw', '$game', $lev, $numq, $score, $timer, $numc, $nume, $stamp, '$cor', '$err')";
//echo($query);
mysql_query($query);
//echo("The data has been written to the table!");
?>