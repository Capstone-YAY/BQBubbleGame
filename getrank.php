<?php
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

include("constants2.php");
$linkID = mysql_connect(DBM_SERVER, DBM_USER, DBM_PASS) or die("Could not connect.  Check back later.");
mysql_select_db(DBM_NAME, $linkID) or die("Could not find database.");

if (strlen($username) > 0) {
	$query = "SELECT level FROM game_users WHERE name = '$username'";
	$result2= mysql_query($query,$linkID) or die("Data not found.");
	$row = mysql_fetch_assoc($result2);
	$lev = $row['level'];
}
$query = "SELECT * FROM gamescores WHERE game = '$game' AND level = $lev";
$result = mysql_query($query, $linkID);
$num = mysql_num_rows($result);

$query="set @N = 0;";
mysql_query($query);


$query="SELECT rank FROM (SELECT @N := @N +1 AS rank, name, (numc/numq)*100.0 AS pc,  (time/numq)/1000.0 AS avgtime, timestamp FROM gamescores WHERE game = '$game' AND level = $lev ORDER BY (numc/numq)*100.0 DESC, (time/numq)/1000.0) AS ranktable WHERE name = '$username' AND timestamp = $stamp";
//echo($query);
$result2= mysql_query($query,$linkID) or die("Data not found.");
$row = mysql_fetch_assoc($result2);
$rank = $row['rank'];
echo("You are rank {$rank} out of {$num} total games played.\n\n");
$query="set @N = 0;";
mysql_query($query);

echo("Overall best scores:\n");

$query="SELECT rank, name, numc, avgtime FROM (SELECT @N := @N +1 AS rank, name, numc,  (time/numq)/1000.0 AS avgtime, timestamp FROM gamescores WHERE game = '$game' AND level = $lev ORDER BY numc DESC, (time/numq)/1000.0) AS ranktable LIMIT 5";
//echo($query);
$result2= mysql_query($query,$linkID) or die("Data not found.");
for($x = 0 ; $x < mysql_num_rows($result2) ; $x++){
    $row = mysql_fetch_assoc($result2);
	printf ("%s\t%s\t%3.0f correct\t\t%5.3f s/v\n", $row['rank'], $row['name'], $row['numc'], $row['avgtime']);
	//echo "".$row['rank']."\t\t".$row['name']."\t\t".$row['pc']."\t\t".$row['avgtime']."\n";
}

$query="set @N = 0;";
mysql_query($query);
echo("\nYour best scores:\n");

$query="SELECT rank, name, numc, avgtime FROM (SELECT @N := @N +1 AS rank, name, numc,  (time/numq)/1000.0 AS avgtime, timestamp FROM gamescores WHERE name = '$username' AND pass = '$passw' AND game = '$game' AND level = $lev ORDER BY numc DESC, (time/numq)/1000.0) AS ranktable LIMIT 5";
//echo($query);
$result2= mysql_query($query,$linkID) or die("Data not found.");
for($x = 0 ; $x < mysql_num_rows($result2) ; $x++){
    $row = mysql_fetch_assoc($result2);
	printf ("%s\t%s\t%3.0f correct\t\t%5.3f s/v\n", $row['rank'], $row['name'], $row['numc'], $row['avgtime']);
	//echo "".$row['rank']."\t\t".$row['name']."\t\t".$row['pc']."\t\t".$row['avgtime']."\n";
}

?>