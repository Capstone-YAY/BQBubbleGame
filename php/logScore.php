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

//references of correct verses to get ids from database
$correctVerseRefs = [];
if (isset($_POST['correctVerseRefs'])) {
    $correctVerseRefs = $_POST['correctVerseRefs'];
}

//references of wrong verses to get ids from database
$wrongVerseRefs = [];
if (isset($_POST['wrongVerseRefs'])) {
    $wrongVerseRefs = $_POST['wrongVerseRefs'];
}




include("../constants2.php");

try {
    //connect to database
    $database = new PDO("mysql:host=" . DBM_SERVER . ";dbname=" . DBM_NAME,
        DBM_USER, DBM_PASS);

    //verse ids that were correct
    $cor = "";
    if (sizeof($correctVerseRefs) > 0) {
        $refList = '';
        $count = 0;
        foreach ($correctVerseRefs as $ref) {
            $refList .= ":ref$count ";
            if (sizeof($correctVerseRefs) - 1 > $count) {
                $refList .= ', ';
            }
            $count++;
        }

        $sql = "SELECT id
        FROM `srverses2018`
        WHERE ref in ($refList) ";

        $stmt = $database->prepare($sql);

        $count = 0;
        foreach ($correctVerseRefs as $ref) {
            $stmt->bindValue(":ref$count", $ref);
            $count++;
        }

        $stmt->execute();
        $ids = $stmt->fetchAll(PDO::FETCH_COLUMN);
        if (!$ids) {
            error_log("Could not get correct ref ids from database\n", 3, "error.log");
            exit;
        } else {
            $count = 0;
            foreach($ids as $id) {
                $cor .= $id;
                if (sizeof($ids) - 1 > $count) {
                    $cor .= '%';
                }
                $count++;
            }
        }
    }

    //verse ids that were wrong
    $err = "";
    if (sizeof($wrongVerseRefs) > 0) {
        $refList = '';
        $count = 0;
        foreach ($wrongVerseRefs as $ref) {
            $refList .= ":ref$count ";
            if (sizeof($wrongVerseRefs) - 1 > $count) {
                $refList .= ', ';
            }
            $count++;
        }

        $sql = "SELECT id
        FROM `srverses2018`
        WHERE ref in ($refList) ";

        $stmt = $database->prepare($sql);

        $count = 0;
        foreach ($wrongVerseRefs as $ref) {
            $stmt->bindValue(":ref$count", $ref);
            $count++;
        }

        $stmt->execute();
        $ids = $stmt->fetchAll(PDO::FETCH_COLUMN);
        if (!$ids) {
            error_log("Could not get wrong ref ids from database\n", 3, "error.log");
            exit;
        } else {
            $count = 0;
            foreach($ids as $id) {
                $err .= $id;
                if (sizeof($ids) - 1 > $count) {
                    $err .= '%';
                }
              $count++;
            }
        }
    }

    //get user's level
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

    //write score to database
    $sql ="INSERT into gamescores
    VALUES (:username, :passw, :game, :lev, :numq, :score, :timer, 
    :numc, :nume, :stamp, :cor, :err)";

    $stmt = $database->prepare($sql);
    $stmt->bindValue(":username", $username);
    $stmt->bindValue(":passw", $passw);
    $stmt->bindValue(":game", $game);
    $stmt->bindValue(":lev", $lev);
    $stmt->bindValue(":numq", $numq);
    $stmt->bindValue(":score", $score);
    $stmt->bindValue(":timer", $timer);
    $stmt->bindValue(":numc", $numc);
    $stmt->bindValue(":nume", $nume);
    $stmt->bindValue(":stamp", $stamp);
    $stmt->bindValue(":cor", $cor);
    $stmt->bindValue(":err", $err);


    $booleanResult = $stmt->execute();

    if (!$booleanResult) {
        error_log("Could not log scores\n", 3, "error.log");
    }
    else {
        echo("The data has been written to the table!");
    }

    return;


} catch (PDOException $e) {
    echo ("Could not connect.  Check back later.");
    error_log("Could not connect to the database\n", 3, "error.log");
    exit;
}


