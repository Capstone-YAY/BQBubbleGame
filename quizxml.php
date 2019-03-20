 <?php
	$type=$_GET['t'];
	$start=$_GET['s'];
	$end=$_GET['e'];
	$num=$_GET['n'];
	/* TO DO - in future, pull this from db table where don't have to change it manually each year */
	if ($type == 0) {
		$max = 176;  // CHANGE
	} else if ($type == 1) {
		$max = 281;  // CHANGE
	} else if ($type == 2) {
		$max = 427;  // CHANGE
	} else {
		$type = 3;
		$max = 540;  // CHANGE
	}
	if (!($start >= 1 && $start <= $max)) {
		$start = 1;
	}
	if (!($end >= 1 && $end <= $max)) {
		$end = $max;
	}
	if ($start > $end) {
		$tmp = $start;
		$start = $end;
		$end = $tmp;
	}
	
include("constants2.php");
$linkID = mysql_connect(DBM_SERVER, DBM_USER, DBM_PASS) or die("Could not connect.  Check back later.");
mysql_select_db(DBM_NAME, $linkID) or die("Could not find database.");
$typetable = "jrverses2019";  // CHANGE
if ($type > 1) {
	$typetable = "srverses2019";  // CHANGE
}
$query = "SELECT * FROM $typetable WHERE id >= $start AND id <= $end ORDER BY RAND() LIMIT $num";
$resultID = mysql_query($query, $linkID) or die("Data not found.");

$xml_output = "<?xml version=\"1.0\"?>\n";
$xml_output .= "<quiz>\n";
$xml_output .= "<items>\n";

for($x = 0 ; $x < mysql_num_rows($resultID) ; $x++){
    $row = mysql_fetch_assoc($resultID);
	$verses[$x] = $row['verse'];
	$refs[$x] = $row['ref'];
	$ids[$x] = $row['id'];
}

// loop through and create xml for each question
for($x = 0 ; $x < $num ; $x++){
	$cid = $ids[$x];
	$cref = $refs[$x];
	$cverse = $verses[$x];
    $xml_output .= "\t<item>\n";
    $xml_output .= "\t\t<question>$cverse</question>\n";

	// get 5 random wrong answers	
	$query = "SELECT * FROM $typetable WHERE id >= $start AND id <= $end AND id != $cid ORDER BY RAND() LIMIT 5";
	$resultID = mysql_query($query, $linkID) or die("Data not found.");
	for($xx = 0 ; $xx < mysql_num_rows($resultID) ; $xx++){
		$row = mysql_fetch_assoc($resultID);
		$wverses[$xx] = $row['verse'];
		$wrefs[$xx] = $row['ref'];
		$wids[$xx] = $row['id'];
	}
	
	// randomize the mc indexes
	$rand_indexes=array(0=>0,1=>1,2=>2,3=>3,4=>4,5=>5);
	shuffle($rand_indexes);
	
	// create xml for 6 answers, including the correct one
	$count = 0;
	$wrongidx = 0;
	while ($count < 6) {
		if ($rand_indexes[$count] == 0) {	// put correct answer
    		$xml_output .= "\t\t<ans".$count.">$cref</ans".$count.">\n";
    		$xml_output .= "\t\t<ref".$count.">Correct</ref".$count.">\n";
    		$xml_output .= "\t\t<idd".$count.">$cid</idd".$count.">\n";
		} else { // put a random incorrect answer
    		$xml_output .= "\t\t<ans".$count.">".$wrefs[$wrongidx]."</ans".$count.">\n";
    		$xml_output .= "\t\t<ref".$count.">".$wverses[$wrongidx]."</ref".$count.">\n";
    		$xml_output .= "\t\t<idd".$count.">".$wids[$wrongidx]."</idd".$count.">\n";
			$wrongidx++;
		}
		$count++;
	}
    $xml_output .= "\t</item>\n";
}
$xml_output .= "	</items>\n";
$xml_output .= "</quiz>\n";

echo $xml_output;

?>