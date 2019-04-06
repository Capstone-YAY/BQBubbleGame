<?php
/**
 * Created by PhpStorm.
 * User: Emily Entrup
 * Date: 4/6/2019
 * Time: 9:00 AM
 */

$bqUserInfo = $_SESSION['bqQuizUser'];
$username = $bqUserInfo['name'];
$passw = $bqUserInfo['pass'];
$game = $bqUserInfo['game'];
$lev = $bqUserInfo['level'];

//timestamp in epoch miliseconds
$stamp = round(microtime(true) * 1000);

//@todo pass all these variables
//total number of questions from game
$numq = $_POST['numq'];
//timer value
$timer = $_POST['timer'];
//count of right verses
$numc = $_POST['numc'];
//count of wrong verses
$nume = $_POST['nume'];


//@todo figure out where this is from
$score = $_POST['score'];

//@todo get verse ids from db
//verse ids that were correct
$cor = $_POST['cor'];
//verse ids that were wrong
$err = $_POST['err'];
//
//include("../constants2.php");
//
//try {
//    $database = new PDO("mysql:host=" . DBM_SERVER . ";dbname=" . DBM_NAME,
//        DBM_USER, DBM_PASS);
//
//    if (strlen($username) > 0) {
//        $sql = "SELECT level
//        FROM game_users
//        WHERE name = :username";
//
//        $stmt = $database->prepare($sql);
//        $stmt->bindValue(":username", $username);
//        $stmt->execute();
//        $results = $stmt->fetch(PDO::FETCH_ASSOC);
//        if (! $results) {
//            error_log("Could not get user level to log scores\n", 3, "error.log");
//            exit;
//        }
//        else {
//            $lev = $results['level'];
//        }
//    }
//
//    $sql ="INSERT into gamescores
//    VALUES (:username, :passw, :game, :lev, :numq, :score, :timer, :numc, :nume, :stamp, :cor, :err)";
//
//    $stmt = $database->prepare($sql);
//    $stmt->bindValue(":username", $username);
//    $stmt->bindValue(":passw", $passw);
//    $stmt->bindValue(":game", $game);
//    $stmt->bindValue(":lev", $lev);
//    $stmt->bindValue(":numq", $numq);
//    $stmt->bindValue(":score", $score);
//    $stmt->bindValue(":timer", $timer);
//    $stmt->bindValue(":numc", $numc);
//    $stmt->bindValue(":nume", $nume);
//    $stmt->bindValue(":stamp", $stamp);
//    $stmt->bindValue(":cor", $cor);
//    $stmt->bindValue(":err", $err);
//
//
//    $booleanResult = $stmt->execute();
//
//    if (!$booleanResult) {
//        error_log("Could not log scores\n", 3, "error.log");
//    }
//    else {
//        echo("The data has been written to the table!");
//    }
//
//    return;
//
//} catch (PDOException $e) {
//    echo ("Could not connect.  Check back later.");
//    error_log("Could not connect to the database\n", 3, "error.log");
//    exit;
//}
//
//
