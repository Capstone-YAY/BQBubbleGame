<?php
/**
 * Created by PhpStorm.
 * User: Emily Entrup
 * Date: 4/4/2019
 * Time: 4:40 PM
 */

$guser = $_POST['u'];
$gpass = $_POST['p'];

include("../constants2.php");

try {
    $database = new PDO("mysql:host=" . DBM_SERVER . ";dbname=" . DBM_NAME,
        DBM_USER, DBM_PASS);

    $sql = "SELECT * 
    FROM game_users 
    WHERE name = :username";

    $stmt = $database->prepare($sql);
    $stmt->bindParam(":username", $guser);
    $stmt->execute();
    $results = $stmt->fetch(PDO::FETCH_ASSOC);
    if (! $results) {
        error_log("Invalid user\n", 3, "error.log");
        echo 'Invalid username';
        return;
    }
    else {
        //check password
        $sql = "SELECT * 
    FROM game_users 
    WHERE name = :username and pass = :password";

        $stmt = $database->prepare($sql);
        $stmt->bindValue(":username", $guser);
        $stmt->bindValue(":password", $gpass);
        $stmt->execute();

        $results = $stmt->fetch(PDO::FETCH_ASSOC);
        if (! $results) {
            error_log("Invalid password\n", 3, "error.log");
            echo 'Invalid password';
            return;
        }
        else {
            echo 'Success';
            return;
        }
    }

} catch (PDOException $e) {
    echo ("Could not connect.  Check back later.");
    error_log("Could not connect to the database\n", 3, "error.log");
    exit;
}


//$linkID = mysqli_connect(DBM_SERVER, DBM_USER, DBM_PASS) or
//die("Could not connect.  Check back later.");
//mysqli_select_db(DBM_NAME, $linkID) or die("Could not find database.");
//$query = "SELECT * FROM game_users WHERE name LIKE $guser";
//
//$resultID = mysqli_query($query, $linkID) or die("Data not found.");
//
/*$xml_output = "<?xml version=\"1.0\"?>\n";*/
//$xml_output .= "<user>\n";
//
//for($x = 0 ; $x < mysql_num_rows($resultID) ; $x++){
//    $row = mysql_fetch_assoc($resultID);
//    $xml_output .= "<info>\n";
//    $xml_output .= "\t<name>".$row['name']."</name>\n";
//    $xml_output .= "\t<pass>".$row['pass']."</pass>\n";
//    $xml_output .= "\t<email>".$row['email']."</email>\n";
//    $xml_output .= "\t<level>".$row['level']."</level>\n";
//    $xml_output .= "</info>\n";
//}
//
//$xml_output .= "</user>\n";
//
//echo $xml_output;
//?>