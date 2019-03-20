 <?php
	$guser=$_GET['u'];
	$gpass=$_GET['p'];

include("constants2.php");
$linkID = mysql_connect(DBM_SERVER, DBM_USER, DBM_PASS) or die("Could not connect.  Check back later.");
mysql_select_db(DBM_NAME, $linkID) or die("Could not find database.");
$query = "SELECT * FROM game_users WHERE name LIKE '$guser'";
$resultID = mysql_query($query, $linkID) or die("Data not found.");

$xml_output = "<?xml version=\"1.0\"?>\n";
$xml_output .= "<user>\n";

for($x = 0 ; $x < mysql_num_rows($resultID) ; $x++){
    $row = mysql_fetch_assoc($resultID);
	$xml_output .= "<info>\n";
    $xml_output .= "\t<name>".$row['name']."</name>\n";
    $xml_output .= "\t<pass>".$row['pass']."</pass>\n";
    $xml_output .= "\t<email>".$row['email']."</email>\n";
    $xml_output .= "\t<level>".$row['level']."</level>\n";
	$xml_output .= "</info>\n";
}

$xml_output .= "</user>\n";

echo $xml_output;
?>