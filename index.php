<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
    <link rel="stylesheet" href="jquery-style.css">
    <link rel="stylesheet" href="BQAllElements.css">

    <script src="https://code.jquery.com/jquery-1.12.4.js"></script>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <script src="verses.js"></script>
    <script src="new_verses.js"></script>
    <script src="BQBase.js"></script>
</head>
<body>
<div id="container">
    <div id="startWindow">
        <div class="bibleQ">
            BQ <br> Bubble <br> Blast
        </div><!--bibleQ div-->

        <div class="options">
            <label for="division"> Select a Division </label>
            <select name="division" id="division">
                <option selected="selected">Beginner</option>
                <option>Junior</option>
                <option>Int Sr</option>
                <option>Exp Sr</option>
            </select>

            <label for="verse_part"> Select a Verse Part </label>
            <select name="verse_part" id="verse_part">
                <option value="wholeVerse" selected="selected">Whole Verse</option>
                <option value="firstHalf">First Half</option>
                <option value="secondHalf">Second Half</option>
            </select>

            <label for="start_verse"> Select a Start Verse </label>
            <select name="start_verse" id="start_verse">
                <option id="startEmptyOption" />
            </select>

            <label for="end_verse"> Select an End Verse </label>
            <select name="end_verse" id="end_verse">
                <option id="endEmptyOption" />
            </select>

            <label for="num_of_questions"> Select # of Questions </label>
            <select name="num_of_questions" id="num_of_questions">
                <option id="numEmptyOption" />
            </select>

            <br><br><br>

            <input class="startbutton" type="submit" id="submitButton" value="Play">

        </div><!--options div-->

        <div id="loginDiv">
            <!--most likely going to be a form, for people to sign-in-->
            <!--<form action="login.php" method="POST">-->
            <div class="player">
                Optional (Sign-in not required)
                <br><br>
                Username: <input type="text" name="username" id="username" size="15"/>
                <br><br>
                Password: <input type="text" name="password" id="password" size="15"/>
                <br><br>
                *By signing in, your high scores <br>and performance will be saved
            </div>
            <!--</form>-->
        </div><!--login div-->

    </div> <!--startWindow div-->

    <div id="gameWindow" style="display: none;">
        <div id="bubbleBoundary">
            <canvas id="bubbleArea">
            </canvas>
        </div>

        <div id="correctVerse"></div>
    </div> <!--gameWindow-->

    <div id="correctWindow" style="display: none;">
        <div class='message'>
            CORRECT!
        </div>
    </div> <!--correctWindow-->

    <div id="wrongWindow" style="display: none;">
        <div class='message'>
            <span id="wrongVerse"></span>
            <br>
            <br>
        </div>
    </div> <!--wrongWindow-->

    <div id="scoreWindow" style="display: none;">
        <p id = "gameOver">Game Over! <button id = "playAgain"> Play Again! </button></p>

        <div class = "score">
            <span id="correctVerseCount"> </span> Verses Correct,
            <span id="wrongVerseCount"> </span> Missed
            <!-- This is to display the score; i.e., "[X] Correct, [Y] Missed" -->
        </div>
        <div class = "time">
            Game Duration: <span id="gameTime"></span>
            <!-- This is to display the total time it took for the player to complete all of the questions -->
        </div>
        <div class = "rank">
            You are ranked x out of x total games played.
            <!-- This shows the rank of the player, i.e. "You are rank [x] out of [y] total games played." -->
        </div>
        <div class = "ovScores">
            Overall Score:
            <!-- This shows the overall best scores of everyone who has created an account -->
        </div>
        <div class = "bestScores">
            Best Scores:
            <!-- This shows the player's best scores -->
        </div>
        <div class = "missed">
            Verses Missed:
            <ul id="wrongVerseList">

            </ul>
            <!-- This shows what verses the player got wrong -->
        </div>

    </div> <!--scoreWindow-->

</div><!--Container div-->
</body>
</html>