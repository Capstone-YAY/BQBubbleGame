<?php
/**
 * Created by PhpStorm.
 * User: Emily Entrup
 * Date: 4/6/2019
 * Time: 9:00 AM
 */

session_start();

$bqUserInfo = $_SESSION['bqQuizUser'];
$username = $bqUserInfo['name'];
$passw = $bqUserInfo['pass'];
$game = $bqUserInfo['game'];
$lev = $bqUserInfo['level'];

//timestamp in epoch miliseconds
$stamp = $_POST['timestamp'];

//total number of questions from game
$numq = $_POST['numQuest'];
//timer value
$timer = $_POST['time'];
//convert timer from 00:00:00 (min:sec:milisec) format to miliseconds
$timerArr = explode(':', $timer);
$timer = $timerArr[0]*60000 + $timerArr[1]*1000 + $timerArr[2];

//count of right verses
$numc = $_POST['numCorrect'];
//count of wrong verses
$nume = $_POST['numWrong'];


//@todo figure out where this is from
$score = $_POST['score'];

$returnData = new stdClass();

include("../constants2.php");

try {
    //connect to database
    $database = new PDO("mysql:host=" . DBM_SERVER . ";dbname=" . DBM_NAME,
        DBM_USER, DBM_PASS);

    //get level by username
    if (strlen($username) > 0) {
        $sql = "SELECT level
        FROM game_users
        WHERE name = :username";

        $stmt = $database->prepare($sql);
        $stmt->bindValue(":username", $username);
        $stmt->execute();
        $results = $stmt->fetch(PDO::FETCH_ASSOC);
        if (! $results) {
            error_log("Could not get user level to log scores\n", 3, "error.log");
            exit;
        }
        else {
            $lev = $results['level'];
        }
    }

    //get all scores for game and level
    $sql = "SELECT *
    FROM gamescores
    WHERE game = :game AND level = :lev";

    $stmt = $database->prepare($sql);
    $stmt->bindValue(":game", $game);
    $stmt->bindValue(":lev", $lev);
    $stmt->execute();
    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $num = count($results);

    $returnData->totalGames = $num;



    $sql = "set @N = 0;";
    $stmt = $database->prepare($sql);
    $stmt->execute();

    //get user's rank
    $sql = "SELECT rank
    FROM (
      SELECT @N := @N +1 AS rank, name, (numc/numq)*100.0 AS pc,
        (time/numq)/1000.0 AS avgtime, timestamp
      FROM gamescores
      WHERE game = :game AND level = :lev
      ORDER BY (numc/numq)*100.0 DESC, (time/numq)/1000.0) AS ranktable
    WHERE name = :username AND timestamp = :stamp; ";


    $stmt = $database->prepare($sql);
    $stmt->bindValue(":game", $game);
    $stmt->bindValue(":lev", $lev);
    $stmt->bindValue(":username", $username);
    $stmt->bindValue(":stamp", $stamp);

    $stmt->execute();
    $results = $stmt->fetch(PDO::FETCH_ASSOC);

    if (! $results) {
        error_log("Could not get user rank for score window\n", 3, "error.log");
        exit;
    }
    else {
        $rank = $results['rank'];
    }

    $returnData->userRank = $rank;


    $returnData->overallScores = [];

    $sql = "set @N = 0;";
    $stmt = $database->prepare($sql);
    $stmt->execute();

    //get top 5 overall scores
    $sql = "SELECT rank, name, numc, avgtime
    FROM (
      SELECT @N := @N +1 AS rank, name, numc,
        (time/numq)/1000.0 AS avgtime, timestamp
      FROM gamescores
      WHERE game = :game AND level = :lev
      ORDER BY numc DESC, (time/numq)/1000.0) AS ranktable 
    LIMIT 5 ";

    $stmt = $database->prepare($sql);
    $stmt->bindValue(":game", $game);
    $stmt->bindValue(":lev", $lev);
    $stmt->execute();

    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
    if (! $results) {
        error_log("Could not get overall best scores for score window\n", 3, "error.log");
        exit;
    }
    else {
        foreach($results as $row) {
            $scoreData = new stdClass();
            $scoreData->rank = $row['rank'];
            $scoreData->name = $row['name'];
            $scoreData->numCorrect = $row['numc'];
            $scoreData->avgTime = $row['avgtime'];
            $returnData->overallScores[] = $scoreData;
        }
    }


    $returnData->userBestScores = [];

    $sql = "set @N = 0;";
    $stmt = $database->prepare($sql);
    $stmt->execute();

    //get user's top 5 games
    $sql = "SELECT rank, name, numc, avgtime
    FROM (
      SELECT @N := @N +1 AS rank, name, numc,
        (time/numq)/1000.0 AS avgtime, timestamp
      FROM gamescores
      WHERE name = :username AND pass = :passw AND game = :game AND level = :lev
      ORDER BY numc DESC, (time/numq)/1000.0) AS ranktable
    LIMIT 5";

    $stmt = $database->prepare($sql);
    $stmt->bindValue(":username", $username);
    $stmt->bindValue(":passw", $passw);
    $stmt->bindValue(":game", $game);
    $stmt->bindValue(":lev", $lev);
    $stmt->execute();
    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if (! $results) {
        error_log("Could not get user best scores for score window\n", 3, "error.log");
        exit;
    }
    else {
        foreach($results as $row) {
            $scoreData = new stdClass();
            $scoreData->rank = $row['rank'];
            $scoreData->name = $row['name'];
            $scoreData->numCorrect = $row['numc'];
            $scoreData->avgTime = $row['avgtime'];

            $returnData->userBestScores[] = $scoreData;
        }
    }

    echo json_encode($returnData);

    return;

} catch (PDOException $e) {
    echo ("Could not connect.  Check back later.");
    error_log("Could not connect to the database\n", 3, "error.log");
    exit;
}
