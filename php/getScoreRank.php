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


include("../constants2.php");

try {
    $database = new PDO("mysql:host=" . DBM_SERVER . ";dbname=" . DBM_NAME,
        DBM_USER, DBM_PASS);

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

    $sql = "SELECT * 
    FROM gamescores 
    WHERE game = :game AND level = :lev";

    $stmt = $database->prepare($sql);
    $stmt->bindValue(":game", $game);
    $stmt->bindValue(":lev", $lev);
    $stmt->execute();
    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $num = count($results);


    $sql = "set @N = 0;";
    $stmt = $database->prepare($sql);
    $stmt->execute();


    $sql = "SELECT rank 
    FROM (
      SELECT @N := @N +1 AS rank, name, (numc/numq)*100.0 AS pc,  
        (time/numq)/1000.0 AS avgtime, timestamp 
      FROM gamescores 
      WHERE game = :game AND level = :lev
      ORDER BY (numc/numq)*100.0 DESC, (time/numq)/1000.0) AS ranktable 
    WHERE name = :username AND timestamp = :stamp";


    $stmt = $database->prepare($sql);
    $stmt->bindValue(":game", $game);
    $stmt->bindValue(":lev", $lev);
    $stmt->bindValue(":username", $username);
    $stmt->bindValue(":stamp", $stamp);
    $stmt->execute();
    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if (! $results) {
        error_log("Could not get user rank for score window\n", 3, "error.log");
        exit;
    }
    else {
        $rank = $results['rank'];
    }

    echo("You are rank {$rank} out of {$num} total games played.\n\n");



    $sql = "set @N = 0;";
    $stmt = $database->prepare($sql);
    $stmt->execute();


    echo("Overall best scores:\n");

    $sql = "SELECT rank, name, numc, avgtime 
    FROM (
      SELECT @N := @N +1 AS rank, name, numc,  
        (time/numq)/1000.0 AS avgtime, timestamp 
      FROM gamescores 
      WHERE game = :game AND level = :lev 
      ORDER BY numc DESC, (time/numq)/1000.0) AS ranktable LIMIT 5 ";

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
            printf ("%s\t%s\t%3.0f correct\t\t%5.3f s/v\n", $row['rank'], $row['name'], $row['numc'], $row['avgtime']);
        }
    }


    $sql = "set @N = 0;";
    $stmt = $database->prepare($sql);
    $stmt->execute();


    echo("\nYour best scores:\n");

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
            printf ("%s\t%s\t%3.0f correct\t\t%5.3f s/v\n", $row['rank'], $row['name'], $row['numc'], $row['avgtime']);
        }
    }


    return;

} catch (PDOException $e) {
    echo ("Could not connect.  Check back later.");
    error_log("Could not connect to the database\n", 3, "error.log");
    exit;
}
