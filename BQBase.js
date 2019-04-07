
$( function() {
    StartWindowModule.render();

});

var StartWindowModule = {
    //set when the user clicks the play button
    gameDivision: null,
    gameVersePart: null,
    gameStartVerse: null,
    gameEndVerse: null,
    gameNumQuestions: null,

    render: function () {
        StartWindowModule.initializeSelectMenus();

        StartWindowModule.createSelectMenuEventListeners();

        StartWindowModule.fillDefaultOptions();
    },

    fillDefaultOptions: function() {
        //set the default division so we can initialize everything
        VersesModule.selectedGameRefs = VersesModule.getBeginnerRefs();
        VersesModule.selectedGameVerses = VersesModule.getBeginnerVersesFull();

        //get the default options for each menu
        VersesModule.populateStartSelectMenu();
        VersesModule.populateEndSelectMenu();
        VersesModule.populateQuestNumSelectMenu();
    },

    initializeSelectMenus: function() {
        //initialize all the select menus with jquery and make them scrollable
        $("#division").selectmenu();

        $("#verse_part").selectmenu();

        $("#start_verse").selectmenu()
            .selectmenu("menuWidget")
            .addClass("overflow");

        $("#end_verse").selectmenu()
            .selectmenu("menuWidget")
            .addClass("overflow");

        $("#num_of_questions").selectmenu()
            .selectmenu("menuWidget")
            .addClass("overflow");

    },

    //clear all the options in the list so it doesn't just keep appending
    clearAllSelectOptions: function() {
        $('#start_verse option').each(function (index, option) {
            $(option).remove();
        });

        $('#end_verse option').each(function (index, option) {
            $(option).remove();
        });

        $('#num_of_questions option').each(function (index, option) {
            $(option).remove();
        });
    },

    createSelectMenuEventListeners: function () {
        //if someone changes the division
        $( "#division" ).on( "selectmenuselect", function( event, ui ) {
            //clear the previous options
            StartWindowModule.clearAllSelectOptions();

            //prepare the appropriate verses
            if ($('#division').val() == 'Beginner') {
                VersesModule.selectedGameRefs = VersesModule.getBeginnerRefs();
                VersesModule.selectedGameVerses = VersesModule.getBeginnerVersesFull();
            }
            if ($('#division').val() == 'Junior') {
                VersesModule.selectedGameRefs = VersesModule.getJuniorRefs();
                VersesModule.selectedGameVerses = VersesModule.getJuniorVersesFull();
            }
            if ($('#division').val() == 'Int Sr') {
                VersesModule.selectedGameRefs = VersesModule.getIntSrRefs();
                VersesModule.selectedGameVerses = VersesModule.getIntSrVersesFull();
            }
            if ($('#division').val() == 'Exp Sr') {
                VersesModule.selectedGameRefs = VersesModule.getExpSrRefs();
                VersesModule.selectedGameVerses = VersesModule.getExpSrVersesFull();
            }

            //get the default options for each menu
            VersesModule.populateStartSelectMenu();
            VersesModule.populateEndSelectMenu();
            VersesModule.populateQuestNumSelectMenu();
        });

        //if someone changes the verse part
        $( "#verse_part" ).on( "selectmenuselect", function( event, ui ) {
            if ($('#verse_part').val() == 'wholeVerse') {
                //prepare the appropriate verses
                if ($('#division').val() == 'Beginner') {
                    VersesModule.selectedGameVerses = VersesModule.getBeginnerVersesFull();
                }
                if ($('#division').val() == 'Junior') {
                    VersesModule.selectedGameVerses = VersesModule.getJuniorVersesFull();
                }
                if ($('#division').val() == 'Int Sr') {
                    VersesModule.selectedGameVerses = VersesModule.getIntSrVersesFull();
                }
                if ($('#division').val() == 'Exp Sr') {
                    VersesModule.selectedGameVerses = VersesModule.getExpSrVersesFull();
                }
            }
            else if ($('#verse_part').val() == 'firstHalf') {
                //prepare the appropriate verses
                if ($('#division').val() == 'Beginner') {
                    VersesModule.selectedGameVerses = VersesModule.getBeginnerVersesBeg();
                }
                if ($('#division').val() == 'Junior') {
                    VersesModule.selectedGameVerses = VersesModule.getJuniorVersesBeg();
                }
                if ($('#division').val() == 'Int Sr') {
                    VersesModule.selectedGameVerses = VersesModule.getIntSrVersesBeg();
                }
                if ($('#division').val() == 'Exp Sr') {
                    VersesModule.selectedGameVerses = VersesModule.getExpSrVersesBeg();
                }
            }
            else if ($('#verse_part').val() == 'secondHalf') {
                //prepare the appropriate verses
                if ($('#division').val() == 'Beginner') {
                    VersesModule.selectedGameVerses = VersesModule.getBeginnerVersesEnd();
                }
                if ($('#division').val() == 'Junior') {
                    VersesModule.selectedGameVerses = VersesModule.getJuniorVersesEnd();
                }
                if ($('#division').val() == 'Int Sr') {
                    VersesModule.selectedGameVerses = VersesModule.getIntSrVersesEnd();
                }
                if ($('#division').val() == 'Exp Sr') {
                    VersesModule.selectedGameVerses = VersesModule.getExpSrVersesEnd();
                }
            }

        });

        //if someone changes the start verse
        $( "#start_verse" ).on( "selectmenuselect", function( event, ui ) {

            //clear all the end verses because the options might change
            $('#end_verse option').each(function (index, option) {
                $(option).remove();
            });

            //prepare the end verses list
            VersesModule.populateEndSelectMenu();
        });

        //if someone changes the end verse
        $( "#end_verse" ).on( "selectmenuselect", function( event, ui ) {

            //clear all the number of questions options because it'll change
            $('#num_of_questions option').each(function (index, option) {
                $(option).remove();
            });

            //prepare the number of questions list
            VersesModule.populateQuestNumSelectMenu();
        });

        //if someone clicks play
        $("#submitButton").on('click', function() {
            TimerModule.time = null;

            StartWindowModule.gameDivision = $('#division').val();
            StartWindowModule.gameVersePart = $('#verse_part').val();
            StartWindowModule.gameStartVerse = $('#start_verse').val();
            StartWindowModule.gameEndVerse = $('#end_verse').val();
            StartWindowModule.gameNumQuestions = $('#num_of_questions').val();

            if ($('#username').val() != '' || $('#password').val() != '') {
                if ($('#username').val() != '' && $('#password').val() != '') {
                    DatabaseModule.checkLogin();
                }
                else {
                    alert('You must BOTH a username and password to login');
                }
            }
            else {
                GameWindowModule.render();
            }
        });
    }

};

var VersesModule = {
    //array that holds beginner verse refs
    beginnerRefs: begRefs,
    //array holds full beginner verses
    beginnerVersesFull: begVerses,
    //array holds beginning beginner verses
    beginnerVersesBeg: begVersesBeg,
    //array holds ending beginner verses
    beginnerVersesEnd: begVersesEnd,

    //array that holds junior verse refs
    juniorRefs: jrRefs,
    //array holds full junior verses
    juniorVersesFull: jrVerses,
    //array holds beginning junior verses
    juniorVersesBeg: jrVersesBeg,
    //array holds ending junior verses
    juniorVersesEnd: jrVersesEnd,

    //array that holds int sr verse refs
    intSrRefs: intSrRefs,
    //array holds full int sr verses
    intSrVersesFull: intSrVerses,
    //array holds beginning int sr verses
    intSrVersesBeg: intSrVersesBeg,
    //array holds ending int sr verses
    intSrVersesEnd: intSrVersesEnd,

    //array that holds exp sr verse refs
    expSrRefs: expSrRefs,
    //array holds full exp sr verses
    expSrVersesFull: expSrVerses,
    //array holds beginning int sr verses
    expSrVersesBeg: expSrVersesBeg,
    //array holds ending int sr verses
    expSrVersesEnd: expSrVersesEnd,

    //holds the refs for the division currently selected
    //changes dynamically when division is changed
    selectedGameRefs: null,

    //holds the verses for the division AND verse part currently selected
    //changes dynamically when division OR verse part is changed
    selectedGameVerses: null,

    getBeginnerRefs: function() {
        return VersesModule.beginnerRefs;
    },

    getBeginnerVersesFull: function() {
        return VersesModule.beginnerVersesFull;
    },

    getBeginnerVersesBeg: function() {
        return VersesModule.beginnerVersesBeg;
    },

    getBeginnerVersesEnd: function() {
        return VersesModule.beginnerVersesEnd;
    },

    getJuniorRefs: function() {
        return VersesModule.juniorRefs;
    },

    getJuniorVersesFull: function() {
        return VersesModule.juniorVersesFull;
    },

    getJuniorVersesBeg: function() {
        return VersesModule.juniorVersesBeg;
    },

    getJuniorVersesEnd: function() {
        return VersesModule.juniorVersesEnd;
    },

    getIntSrRefs: function() {
        return VersesModule.intSrRefs;
    },

    getIntSrVersesFull: function() {
        return VersesModule.intSrVersesFull;
    },

    getIntSrVersesBeg: function() {
        return VersesModule.intSrVersesBeg;
    },

    getIntSrVersesEnd: function() {
        return VersesModule.intSrVersesEnd;
    },

    getExpSrRefs: function() {
        return VersesModule.expSrRefs;
    },

    getExpSrVersesFull: function() {
        return VersesModule.expSrVersesFull;
    },

    getExpSrVersesBeg: function() {
        return VersesModule.expSrVersesBeg;
    },

    getExpSrVersesEnd: function() {
        return VersesModule.expSrVersesEnd;
    },

    populateStartSelectMenu: function() {
        //empty the start verse options
        $('#start_verse option').each(function (index, option) {
            $(option).remove();
        });

        //add all the verses as options except the last 10 because the minimum number of questions is 10
        for(var i = 0; i < VersesModule.selectedGameRefs.length-10; i++) {
            $('#start_verse').append("<option>" + i + " - " + VersesModule.selectedGameRefs[i] + "</option>");
        }

        //refresh after all the options have been added
        $('#start_verse').selectmenu('refresh', true);
    },

    populateEndSelectMenu: function(){
        //empty the end verse options
        $('#end_verse option').each(function (index, option) {
            $(option).remove();
        });

        var startVerse = parseInt($('#start_verse').val());

        //excluding the 10 questions after the startVerse add all the verses as options
        for(var i = startVerse + 10; i < VersesModule.selectedGameRefs.length; i++) {
            $('#end_verse').append("<option>" + i + " - " + VersesModule.selectedGameRefs[i] + "</option>");
        }

        //refresh after all the options have been added
        $('#end_verse').selectmenu('refresh', true);
    },

    populateQuestNumSelectMenu: function(){
        //empty the number of questions options
        $('#num_of_questions option').each(function (index, option) {
            $(option).remove();
        });

        var startVerse = null;
        var endVerse = null;

        startVerse = parseInt($('#start_verse').val());
        endVerse = parseInt($('#end_verse').val());
        var verseDif = endVerse - startVerse;

        // $('#num_of_questions').append("<option>" + 3 + "</option>");

        //count from startVerse number to endVerse and if the number is divisible by 10 and is not 0 then add it as an option
        for(var i = startVerse; i <= endVerse; i++) {
            if (i % 10 == 0 && i != 0)
                $('#num_of_questions').append("<option>" + i + "</option>");
        }

        //if the ending verse is not divisible by 10 then print it out as an option
        if (verseDif % 10 != 0) {
            $('#num_of_questions').append("<option>" + verseDif + "</option>");
        }

        //refresh after all the options have been added
        $('#num_of_questions').selectmenu('refresh', true);

    },

};

var GameWindowModule = {
    currentQuest: 0,

    render: function () {
        $('#startWindow').css('display', 'none');
        $('#gameWindow').css('display', 'block');

        //set the bubble area's width and height equivalent to that of the page
        $('#bubbleArea').attr('width', $('#bubbleBoundary').width());
        $('#bubbleArea').attr('height', $('#bubbleBoundary').height());

        //set the height and width variables so we know how large the bubble area is
        BubbleModule.areaWidth = ($('#bubbleArea').width());
        BubbleModule.areaHeight = ($('#bubbleArea').height());

        //once the body is loaded render the bubbles
        $('body').ready(BubbleModule.startGame());

        GameWindowModule.createEventListeners();

    },

    createEventListeners: function() {
        //if the bubble area is clicked
        $('#bubbleArea').on('click', function(e) {
            //get the click location relative to parent's mouse position
            var posX = $(this).position().left;
            var posY = $(this).position().top;

            //get mouse x and y according to page so it matches the bubble's x and y ranges
            var mouseX = e.pageX - posX;
            var mouseY = e.pageY - posY;

            //check if there's a bubble at mouseX and mouseY
            BubbleModule.checkBubbleLocations(mouseX, mouseY);
        });
    }


};

var TimerModule = {
    //stores start time
    startTime: null,
    //stores end time
    endTime: null,
    //interval fixes speed randomly increasing as questions go on
    fpsInt: 0.25,
    //current time
    now: null,
    //previous time updated
    prev: null,
    //total elapsed
    elapsed: null,

    initTimer: function () {
        TimerModule.startTime = new Date();
        TimerModule.prev = TimerModule.startTime;
    },

    drawTimer: function () {
        let time = new Date().getTime() - TimerModule.startTime.getTime();
        let tDate = new Date(time);

        let milli = ('0' + tDate.getMilliseconds()).slice(-2);
        let sec = ('0' + tDate.getSeconds()).slice(-2);
        let min = ('0' + tDate.getMinutes()).slice(-2);

        // let time = parseInt((new Date() - TimerModule.startTime)/1000);
        BubbleModule.context.beginPath();
        BubbleModule.context.fillStyle = 'black';
        BubbleModule.context.font = 'bold 20px Consolas';

        BubbleModule.context.fillText(min + ':' + sec + ':' + milli,BubbleModule.areaWidth-75,25);

    },

    stopTimer: function () {
        TimerModule.endTime = new Date();
        let time = TimerModule.endTime.getTime() - TimerModule.startTime.getTime();
        let tDate = new Date(time);
        let milli = ('0' + tDate.getMilliseconds()).slice(-2);
        let sec = ('0' + tDate.getSeconds()).slice(-2);
        let min = ('0' + tDate.getMinutes()).slice(-2);
        TimerModule.finalTime = min + ':' + sec + ':' + milli;
    },


};

var BubbleModule = {
    //holds the animation frame id AKA the only way to stop the animation
    animationFrame: null,
    //width of the bubble area
    areaWidth: null,
    //height of the bubble area
    areaHeight: null,
    //canvas 2d content
    context: null,
    //array of Circle objects aka bubbles
    bubbleArray: [],
    //default starting number of bubbles
    defaultBubbleCount: 6,
    //total number of bubbles
    currBubbleCount: null,
    //radius for bubbles
    radius: 45,
    //ref indexes currently used
    usedRefs: [],
    //correct ref index
    correctIndex: null,
    //previous correct indexes - to prevent the same correct verse from duplicating during gameplay
    correctIndexArr: [],
    //directional x and y - speed of all bubbles during the game - so they're all the same speed
    dx: 1,
    dy: 1,
    //flag for first bubble click for each question - used to track wrong/correct verses
    firstClick: true,
    //holds indexes of verses that were correct
    correctQuestArr: [],
    //holds indexes of verses that were wrong
    wrongQuestArr: [],

    startGame: function() {
        //reset verses misses list on the score window
        $('#wrongVerseList').empty();
        $('#overallScoreList').empty();
        $('#userScoreList').empty();

        BubbleModule.animationFrame = null;
        // BubbleModule.bubbleArray = [];
        BubbleModule.usedRefs = [];
        BubbleModule.correctIndex = null;
        BubbleModule.firstClick = true;
        BubbleModule.correctQuestArr = [];
        BubbleModule.correctIndexArr = [];
        BubbleModule.wrongQuestArr = [];
        // BubbleModule.currBubbleCount = null;
        GameWindowModule.currentQuest = 0;

        TimerModule.initTimer();
        BubbleModule.startBubbleArea();
    },

    restartBubbleArea: function () {
        BubbleModule.resetBubbleArea();
        BubbleModule.startBubbleArea();
    },

    stopAnimation: function() {
        cancelAnimationFrame(BubbleModule.animationFrame);
    },

    resetBubbleArea: function() {
        cancelAnimationFrame(BubbleModule.animationFrame);
        BubbleModule.usedRefs = [];
        BubbleModule.correctIndex = null;
        BubbleModule.context.clearRect(0, 0, BubbleModule.areaWidth, BubbleModule.areaHeight);
    },

    //renders the bubbles
    startBubbleArea: function() {
        BubbleModule.currBubbleCount = BubbleModule.defaultBubbleCount;

        GameWindowModule.currentQuest++;
        console.log('cur quest: ' + GameWindowModule.currentQuest);

        //get what's there
        BubbleModule.context= bubbleArea.getContext('2d');

        //reset the bubbleArray for safety
        BubbleModule.bubbleArray = [];

        //total number of tries to get a full set of valid coordinates - helps prevent forever loops
        var maxAttempts = BubbleModule.defaultBubbleCount*10;

        //holds the possible points for the bubbles
        var points = [];

        while((points.length <= BubbleModule.defaultBubbleCount) && maxAttempts > 0) {
            var coords = BubbleModule.getNewCoords();
            var x = coords.x;
            var y = coords.y;

            var addFlag = true;
            //check the new coordinates against all other points in the array
            $.each(points, function (i, point) {
                //if the x and y coords are not valid then mark that it's not safe to add
                if (Math.sqrt( (point.x-x) * (point.x-x) + (point.y-y) * (point.y-y) ) < (BubbleModule.radius*2) ) {
                    addFlag = false;
                }
            });

            //if it is safe to add then add it to the points array
            if (addFlag) {
                points.push({
                    x: x,
                    y: y
                });
            }

            maxAttempts -= 1;
        }


        //create each bubble using the Circle object
        for (let i = 0; i < BubbleModule.defaultBubbleCount; i++) {
            if (i >= points.length) {
                alert("Could not create enough bubble locations");
                break;
            }
            else {
                //get the coordinates from the points array and assign it to x and y for the bubble
                coords = points[i];
                if (coords == null) {
                    alert('Ran out of bubble points!');
                    break;
                }

                x = coords.x;
                y = coords.y;


                var ref = BubbleModule.getRandomVerseIndex();

                while (BubbleModule.correctIndex == null) {
                    ref = BubbleModule.getRandomVerseIndex();
                }

                //create the Circle with the randomized variables
                BubbleModule.bubbleArray.push(new Circle(x, y, BubbleModule.dx, BubbleModule.dy, BubbleModule.radius, ref));
            }
        }

        // console.log(BubbleModule.correctIndexArr);

        //remove the ref from the verse so they don't see the answer
        let verse = VersesModule.selectedGameVerses[BubbleModule.correctIndex].substr(VersesModule.selectedGameVerses[BubbleModule.correctIndex].indexOf(' ')+1);
        //set the verse text at the bottom of the screen
        $('#correctVerse').text(verse);

        //start the page animation
        BubbleModule.animate();
    },

    getRandX: function () {
        return parseInt(Math.random() * (BubbleModule.areaWidth - BubbleModule.radius * 2) + BubbleModule.radius);
    },

    getRandY: function () {
        return parseInt(Math.random() * (BubbleModule.areaHeight - BubbleModule.radius  * 2) + BubbleModule.radius);
    },

    getNewCoords: function () {
        var x = BubbleModule.getRandX();
        var y = BubbleModule.getRandY();

        return {
            x: x,
            y: y
        };
    },

    //start the page animation
    animate: function() {
        //recursively call the animation
        BubbleModule.animationFrame = requestAnimationFrame(BubbleModule.animate);

        TimerModule.now = Date.now();
        TimerModule.elapsed = TimerModule.now - TimerModule.prev;

        //only redraw the bubbles if the fpsInterval (seconds) has elapsed
        if (TimerModule.elapsed > TimerModule.fpsInt) {
            //update then to be the
            TimerModule.prev= TimerModule.now - (TimerModule.elapsed % TimerModule.fpsInt);

            //erase the bubbles drawn
            BubbleModule.context.clearRect(0, 0, BubbleModule.areaWidth, BubbleModule.areaHeight);

            //redraw the timer
            TimerModule.drawTimer();

            //redraw each bubble using the update function
            for (let i = 0; i < BubbleModule.bubbleArray.length; i++) {
                BubbleModule.bubbleArray[i].update();
            }
        }
    },

    checkForCollisions: function (thisX, thisY) {
        //foreach bubble update the x and y then check for collisions
        $.each(BubbleModule.bubbleArray, function(index, bubble) {
            //force x and y variables (of the bubble from the bubbleArray) to be treated as integers for comparisons
            var x = bubble['x'];
            var y = bubble['y'];

            //if the x and y of the two bubbles being compared aren't equal
            if ( (thisX !== x ) && ( thisY !== y ) ) {

                //if both x and y are inside the range the bubble will span (radius * 2) = there will be a collision
                if (Math.sqrt( (thisX-x) * (thisX-x) + (thisY-y) * (thisY-y) ) < (BubbleModule.radius*2) ) {

                    //force the current bubble to reverse both x and y directions
                    this.dx *= (-1);
                    this.dy *= (-1);

                    //be sure to keep bubbles within the window size
                    if (this.x + this.radius > BubbleModule.areaWidth || this.x - this.radius < 0) {
                        this.x -= this.dx;
                    }
                    if ( this.y + this.radius > BubbleModule.areaHeight || this.y - this.radius < 0) {
                        this.y -= this.dy;
                    }

                    //change the current bubble's x and y to avoid the collision
                    this.x += this.dx;
                    this.y += this.dy;

                    return true;
                }
            }
        });

        return false;
    },

    getRandomVerseIndex: function () {
        var startIndex = $.trim(StartWindowModule.gameStartVerse.substr(0, StartWindowModule.gameStartVerse.indexOf('-')));
        var endIndex = $.trim(StartWindowModule.gameEndVerse.substr(0, StartWindowModule.gameEndVerse.indexOf('-')));

        var maxAttempts = 1000;
        var validIndex = false;

        while (! validIndex && maxAttempts > 0) {
            var verseIndex = BubbleModule.getRandomInt(startIndex, endIndex);

            if (BubbleModule.usedRefs.length === 0) {
                validIndex = true;
            }
            else if ($.inArray(verseIndex, BubbleModule.usedRefs) === -1){
                validIndex = true;
            }

            maxAttempts -= 1;
        }

        BubbleModule.usedRefs.push(verseIndex);

        if ($.inArray(verseIndex, BubbleModule.correctIndexArr) === -1 &&
            BubbleModule.correctIndex == null) {
            BubbleModule.correctIndex = verseIndex;
            BubbleModule.correctIndexArr.push(verseIndex);
        }

        return verseIndex;
    },

    getRandomInt: function (min,max) {
        return Math.floor(Math.random()*(max-min+1)+min);
    },

    //check if mouseX and mouseY are within x and y ranges of any bubble
    checkBubbleLocations: function(mouseX, mouseY) {

        //check each bubble against mouseX and mouseY
        for (var index = 0; index < BubbleModule.bubbleArray.length; index++) {
            var bubble = BubbleModule.bubbleArray[index];

            var x = parseInt(bubble['x']);
            var y = parseInt(bubble['y']);
            var rad = parseInt(bubble['radius']);
            var xMin = x - rad;
            var xMax = x + rad;
            var yMin = y - rad;
            var yMax = y + rad;

            //if the mouseX and mouseY are between their corresponding x and y then a bubble was clicked
            if ((mouseX > xMin && mouseX < xMax) && (mouseY > yMin && mouseY < yMax)) {
                BubbleModule.bubbleClicked(index);

            }
        }
    },

    bubbleClicked: function(clickedBubbleIndex) {
        var clickedBubble = BubbleModule.bubbleArray[clickedBubbleIndex];

        //remove the bubble from the array
        BubbleModule.bubbleArray.splice(clickedBubbleIndex, 1);
        //update the number of bubbles to account for the one being removed
        BubbleModule.currBubbleCount--;

        if (clickedBubble.verseIndex === BubbleModule.correctIndex) {
            if (BubbleModule.firstClick) {
                BubbleModule.correctQuestArr.push(clickedBubble.verseIndex);
            }
            BubbleModule.firstClick = true;
            BubbleModule.correctBubbleClicked();
        }
        else {
            if (BubbleModule.firstClick) {
                BubbleModule.wrongQuestArr.push(BubbleModule.correctIndex);
                BubbleModule.firstClick = false;
            }
            BubbleModule.wrongBubbleClicked(clickedBubble.verseIndex);
        }

    },

    wrongBubbleClicked: function (wrongVerseIndex) {
        $('#wrongVerse').text(allRefs[wrongVerseIndex] + ' - ' + allVerses[wrongVerseIndex]);
        BubbleModule.flashWindow($('#wrongWindow'), $('#gameWindow'));
    },

    correctBubbleClicked: function () {
        BubbleModule.flashWindow($('#correctWindow'), $('#gameWindow'));

        if (GameWindowModule.currentQuest < StartWindowModule.gameNumQuestions) {
            setTimeout(function() {
                BubbleModule.restartBubbleArea();
            }, 1000);
        }
        else {
            TimerModule.stopTimer();
            BubbleModule.stopAnimation();
            //have to wait until the gameWindow is displayed again from the flashWindow function
            setTimeout(function() {
                ScoreWindowModule.render();
            }, 1000);
        }
    },

    //flashId is the window
    flashWindow(flashId, origId) {
        BubbleModule.stopAnimation();
        origId.css('display', 'none');
        flashId.css('display', 'block');
        setTimeout(function() {
            flashId.css('display', 'none');
            origId.css('display', 'block');
            BubbleModule.animate();
        }, 1000);

    },



};

const Circle = function(x, y, dx, dy, radius, ref) {
    this.x = x;
    this.y = y;
    //ref to be displayed on the bubble
    this.verseIndex = ref;

    //direction of movement for x
    this.dx = dx;
    //direction of movement for y
    this.dy = dy;
    //bubble radius passed to function (should always be BubbleModule.radius)
    this.radius = radius;
    //bubble fill color
    this.color = 'blue';
    //text color inside bubble
    this.textColor = 'black';

    //draw the bubble on the canvas
    this.draw = function() {
        BubbleModule.context.beginPath();
        BubbleModule.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        BubbleModule.context.strokeStyle = this.color;
        BubbleModule.context.stroke();
        BubbleModule.context.fillStyle = this.color;
        BubbleModule.context.fill();

        BubbleModule.context.textAlign="center";
        BubbleModule.context.textBaseline="middle";
        BubbleModule.context.font=(this.radius*.5)+"px Consolas";
        BubbleModule.context.fillStyle = this.textColor;

        BubbleModule.context.fillText(VersesModule.selectedGameRefs[this.verseIndex], this.x, this.y);
    };

    //update the x and y then check for collisions before redrawing
    this.update = function() {

        //flag if there's a collision
        var col = false;

        //force x and y variables (of the current bubble) to be treated as integers for comparisons
        var thisX = this.x;
        var thisY = this.y;

        col = BubbleModule.checkForCollisions(thisX, thisY);

        //if there's a collision reverse this bubble too
        if (col == true) {
            //force the current bubble to reverse both x and y directions
            this.dx *= (-1);
            this.dy *= (-1);
        }


        //if the next x movement will put the bubble outside the window reverse direction
        if (this.x + this.radius > BubbleModule.areaWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }

        //if the next y movement will put the bubble outside the window reverse direction
        if (this.y + this.radius > BubbleModule.areaHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }

        //change the current bubble's x and y to move it
        this.x += this.dx;
        this.y += this.dy;


        //redraw the current bubble to it's new location
        this.draw();
    }
};

var ScoreWindowModule = {

    render: function() {
        $('#gameWindow').css('display', 'none');
        $('#scoreWindow').css('display', 'block');

        DatabaseModule.logScore();

        $('#correctVerseCount').text(BubbleModule.correctQuestArr.length);

        $('#wrongVerseCount').text(BubbleModule.wrongQuestArr.length);

        $.each(BubbleModule.wrongQuestArr, function (i, verseIndex) {
            $('#wrongVerseList').append('<li>' + VersesModule.selectedGameRefs[verseIndex] + '</li>');
        });

        $('#gameTime').text(TimerModule.finalTime);

        $('#playAgain').button();

        $('#playAgain').on('click', function() {
            $('#scoreWindow').css('display', 'none');
            $('#startWindow').css('display', 'block');
            StartWindowModule.render();
        });
    },


};

var DatabaseModule = {
    loggedIn: false,
    scoreTimestamp: null,

    checkLogin: function() {
        let username = $('#username').val();
        let password = $('#password').val();

        $.ajax({
            url: 'php/checkLogin.php',
            type: 'POST',
            data: {
                'u': username,
                'p': password
            },
            success: function(response) {
                if (response == 'Success') {
                    alert('logged in');
                    DatabaseModule.loggedIn = true;
                    GameWindowModule.render();
                }
                else if (response == 'Could not connect.  Check back later.') {
                    DatabaseModule.renderLoginInfoWindow('Could not connect.  Check back later.');
                }
                else {
                    DatabaseModule.renderLoginInfoWindow('incorrect username or password');
                }
            }
        });
    },

    renderLoginInfoWindow: function(text) {
        $('#startWindow').css('display', 'none');
        $('#loginInfoWindow').css('display', 'block');

        $('#loginInfo').text(text);

        $('#backButton').on('click', function() {
            $('#loginInfoWindow').css('display', 'none');
            $('#startWindow').css('display', 'block');
        });
    },

    logScore: function() {
        DatabaseModule.scoreTimestamp = Math.round(new Date().getTime());

        let numCorrect = BubbleModule.correctQuestArr.length;
        let numWrong = BubbleModule.wrongQuestArr.length;
        let time = TimerModule.finalTime;
        let numQuest = StartWindowModule.gameNumQuestions;

        let wrongVerseRefs = [];
        $.each(BubbleModule.wrongQuestArr, function(i, val) {
            wrongVerseRefs.push(VersesModule.selectedGameRefs[val]);
        });

        let correctVerseRefs = [];
        $.each(BubbleModule.correctQuestArr, function(i, val) {
            correctVerseRefs.push(VersesModule.selectedGameRefs[val]);
        });

        //@todo get score variable
        let score = 0;

        $.ajax({
            url: 'php/logScore.php',
            type: 'POST',
            data: {
                'numQuest': numQuest,
                'time': time,
                'timestamp': DatabaseModule.scoreTimestamp,
                'numCorrect': numCorrect,
                'numWrong': numWrong,
                'correctVerseRefs': correctVerseRefs,
                'wrongVerseRefs': wrongVerseRefs,
                'score': score
            },
            success: function(response) {
                console.log(response);

                DatabaseModule.getScoreRanks();
            }
        });
    },

    getScoreRanks: function() {
        let numCorrect = BubbleModule.correctQuestArr.length;
        let numWrong = BubbleModule.wrongQuestArr.length;
        let time = TimerModule.finalTime;
        let numQuest = StartWindowModule.gameNumQuestions;

        //@todo get score variable
        let score = 0;

        $.ajax({
            url: 'php/getScoreRank.php',
            type: 'POST',
            datatype: 'json',
            data: {
                'numQuest': numQuest,
                'time': time,
                'timestamp': DatabaseModule.scoreTimestamp,
                'numCorrect': numCorrect,
                'numWrong': numWrong,
                'score': score
            },
            success: function(response) {
                let data = JSON.parse(response);

                $('#userRank').text(data.userRank);
                $('#totalGames').text(data.totalGames);

                $.each(data.overallScores, function (i, val) {
                    $('#overallScoreList').append('<li>' + val.rank + ' ' + val.name + ' ' + val.numCorrect +
                        ' correct ' + val.avgTime + ' s/v' + '</li>');
                });

                $.each(data.userBestScores, function (i, val) {
                    $('#userScoreList').append('<li>' + val.rank + ' ' + val.name + ' ' + val.numCorrect +
                        ' correct ' + val.avgTime + ' s/v' + '</li>');
                });
            }
        });
    },




};