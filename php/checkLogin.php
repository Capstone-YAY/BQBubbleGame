<?php
/**
 * Created by PhpStorm.
 * User: Emily Entrup
 * Date: 4/4/2019
 * Time: 4:40 PM
 */

//used in place of userxml.php


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
            //add bubble blast game flag
            $results['game'] = 'bb';
            $_SESSION['bqQuizUser'] = $results;
            // var_dump($_SESSION['bqQuizUser']);
            //  'name' => string '' (length=4)
            //  'pass' => string '' (length=8)
            //  'email' => string '' (length=14)
            //  'level' => string '1' (length=1)
            //  'approved' => string '0' (length=1)
            //  'district' => string '0' (length=1)
            //  'team' => string '0' (length=1)
            //  'parent' => string '' (length=0)
            //  'coach' => string '' (length=0)
            //  'firstname' => string '' (length=0)

            echo 'Success';
            return;
        }
    }

} catch (PDOException $e) {
    echo ("Could not connect.  Check back later.");
    error_log("Could not connect to the database\n", 3, "error.log");
    exit;
}
