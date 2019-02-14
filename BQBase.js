
$( function() {
    StartWindowModule.render();

});

var StartWindowModule = {
    //set when the user clicks the play button
    gameDivision: null,
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
        VersesModule.selectedDivisionRefs = VersesModule.getBeginnerRefs();

        //get the default options for each menu
        VersesModule.populateStartSelectMenu();
        VersesModule.populateEndSelectMenu();
        VersesModule.populateQuestNumSelectMenu();
    },

    initializeSelectMenus: function() {
        //initialize all the select menus with jquery and make them scrollable
        $("#division").selectmenu();

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
                VersesModule.selectedDivisionRefs = VersesModule.getBeginnerRefs();
            }
            if ($('#division').val() == 'Junior') {
                VersesModule.selectedDivisionRefs = VersesModule.getJuniorRefs();
            }
            if ($('#division').val() == 'Int Sr') {
                VersesModule.selectedDivisionRefs = VersesModule.getIntSrRefs();
            }
            if ($('#division').val() == 'Exp Sr') {
                VersesModule.selectedDivisionRefs = VersesModule.getExpSrRefs();
            }

            //get the default options for each menu
            VersesModule.populateStartSelectMenu();
            VersesModule.populateEndSelectMenu();
            VersesModule.populateQuestNumSelectMenu();
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

            // alert("YAY you're ready to play");
            StartWindowModule.gameDivision = $('#division').val();
            StartWindowModule.gameStartVerse = $('#start_verse').val();
            StartWindowModule.gameEndVerse = $('#end_verse').val();
            StartWindowModule.gameNumQuestions = $('#num_of_questions').val();

            GameWindowModule.render();
        });
    }

};

var VersesModule = {
    //index that ends the beginner array
    beginnerArrayIndex: 136,
    //array that holds beginner verse refs
    beginnerRefs: [],
    //index that ends the junior array
    juniorArrayIndex: 267,
    //array that holds junior verse refs
    juniorRefs: [],
    //index that ends the int Sr array
    intSrArrayIndex: 378,
    //array that holds int sr verse refs
    intSrRefs: [],
    //expSrArrayIndex is all the verses
    expSrArrayIndex: allRefs.length,
    //array that holds exp sr verse refs
    expSrRefs: allRefs,

    //holds the refs for the division that is currently selected
    //changes dynamically when division is changed
    selectedDivisionRefs: null,

    getBeginnerRefs: function() {
        if (VersesModule.beginnerRefs.length === 0) {
            for (var i = 0; i < VersesModule.beginnerArrayIndex; i++) {
                VersesModule.beginnerRefs.push(allRefs[i]);
            }
        }
        return VersesModule.beginnerRefs;
    },

    getJuniorRefs: function() {
        if (VersesModule.juniorRefs.length === 0) {
            for (var i = 0; i < VersesModule.juniorArrayIndex; i++) {
                VersesModule.juniorRefs.push(allRefs[i]);
            }
        }

        return VersesModule.juniorRefs;
    },

    getIntSrRefs: function() {
        if (VersesModule.intSrRefs.length === 0) {
            for (var i = 0; i < VersesModule.intSrArrayIndex; i++) {
                VersesModule.intSrRefs.push(allRefs[i]);
            }
        }

        return VersesModule.intSrRefs;
    },

    getExpSrRefs: function() {
        if (VersesModule.expSrRefs.length === 0) {
            for (var i = 0; i < VersesModule.expSrArrayIndex; i++) {
                VersesModule.expSrRefs.push(allRefs[i]);
            }
        }

        return VersesModule.expSrRefs;
    },

    populateStartSelectMenu: function() {
        //empty the start verse options
        $('#start_verse option').each(function (index, option) {
            $(option).remove();
        });

        //add all the verses as options except the last 10 because the minimum number of questions is 10
        for(var i = 0; i < VersesModule.selectedDivisionRefs.length-10; i++) {
            $('#start_verse').append("<option>" + i + " - " + VersesModule.selectedDivisionRefs[i] + "</option>");
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
        for(var i = startVerse + 10; i < VersesModule.selectedDivisionRefs.length; i++) {
            $('#end_verse').append("<option>" + i + " - " + VersesModule.selectedDivisionRefs[i] + "</option>");
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

        // BubbleModule.setGameBubbleSpeed();

        //once the body is loaded render the bubbles
        $('body').ready(BubbleModule.startBubbleArea());

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
    time: null,

    startTimer: function () {
        // TimerModule.time = new Timer();

    },

    stopTimer: function () {

    },


};

var BubbleModule = {
    //holds the animation frame id AKA the only way to stop the animation
    animationFrame: null,
    //pauses the animation when true - used to pause when overlays are flashed
    paused: false,
    //width of the bubble area
    areaWidth: null,
    //height of the bubble area
    areaHeight: null,
    //canvas 2d content
    context: null,
    //array of Circle objects aka bubbles
    bubbleArray: [],
    //default starting number of bubbles
    defaultBubbleCount: 2,
    //total number of bubbles
    currBubbleCount: null,
    //radius for bubbles
    radius: 45,
    //ref indexes currently used
    usedRefs: [],
    //correct ref index,
    correctIndex: null,
    //directional x and y - speed of all bubbles during the game - so they're all the same speed
    dx: 1,
    dy: 1,

    fpsInt: 0.25,
    now: null,
    then: null,
    elapsed: null,

    //randomize the direction the bubble will move (both x and y)
    setGameBubbleSpeed: function () {
        BubbleModule.dx = parseInt((Math.random() - 1.5) * 2);
        BubbleModule.dy = parseInt((Math.random() - 1.5) * 2);
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
        BubbleModule.animationFrame = null;
        BubbleModule.bubbleArray = [];
        BubbleModule.usedRefs = [];
        BubbleModule.correctIndex = null;
        BubbleModule.paused = false;
        BubbleModule.context.clearRect(0, 0, BubbleModule.areaWidth, BubbleModule.areaHeight);
    },

    //renders the bubbles
    startBubbleArea: function() {
        BubbleModule.currBubbleCount = BubbleModule.defaultBubbleCount;

        GameWindowModule.currentQuest++;
        console.log('cur quest: ' + GameWindowModule.currentQuest);

        //get what's there
        BubbleModule.context= bubbleArea.getContext('2d');

        //reset the bubbleArray length to zero for safety
        BubbleModule.bubbleArray.length = 0;

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

        // console.log(points);
        console.log(BubbleModule.defaultBubbleCount);

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
                // console.log(coords);
                x = coords.x;
                y = coords.y;


                var ref = BubbleModule.getRandomVerseIndex();

                //create the Circle with the randomized variables
                BubbleModule.bubbleArray.push(new Circle(x, y, BubbleModule.dx, BubbleModule.dy, BubbleModule.radius, ref));
            }
        }

        console.log(BubbleModule.bubbleArray);

        //set the verse text at the bottom of the screen
        $('#correctVerse').text(allVerses[BubbleModule.correctIndex]);

        BubbleModule.then = Date.now();
        BubbleModule.startTime = BubbleModule.then;

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
        // if (! BubbleModule.paused) {
            //recursively call the animation
            BubbleModule.animationFrame = requestAnimationFrame(BubbleModule.animate);

            BubbleModule.now = Date.now();
            BubbleModule.elapsed = BubbleModule.now - BubbleModule.then;

            if (BubbleModule.elapsed > BubbleModule.fpsInt) {
                BubbleModule.then = BubbleModule.now - (BubbleModule.elapsed % BubbleModule.fpsInt);

                //erase the bubbles drawn
                BubbleModule.context.clearRect(0, 0, BubbleModule.areaWidth, BubbleModule.areaHeight);

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

        if (BubbleModule.correctIndex == null) {
            BubbleModule.correctIndex = verseIndex;
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
                // console.log('bubble ' + index + ' was clicked');
                BubbleModule.bubbleClicked(index);

            }
        }
    },

    //@todo implement what happens to the bubble after it's clicked
    bubbleClicked: function(clickedBubbleIndex) {
        var clickedBubble = BubbleModule.bubbleArray[clickedBubbleIndex];

        //remove the bubble from the array
        BubbleModule.bubbleArray.splice(clickedBubbleIndex, 1);
        //update the number of bubbles to account for the one being removed
        BubbleModule.currBubbleCount--;

        if (clickedBubble.verseIndex === BubbleModule.correctIndex) {
            BubbleModule.correctBubbleClicked();
        }
        else {
            BubbleModule.wrongBubbleClicked(clickedBubble.verseIndex);
        }
    },

    wrongBubbleClicked: function (wrongVerseIndex) {
        // alert('wrong bubble');
        //@todo show wrong window
        $('#wrongVerse').text(allVerses[wrongVerseIndex]);
        BubbleModule.flashWindow($('#wrongWindow'), $('#gameWindow'));

    },

    correctBubbleClicked: function () {
        // alert('correct bubble yay');
        //@todo show correct window
        BubbleModule.flashWindow($('#correctWindow'), $('#gameWindow'));

        //@todo load next set of bubbles if number of questions haven't been done
        if (GameWindowModule.currentQuest < StartWindowModule.gameNumQuestions) {
            BubbleModule.restartBubbleArea();
        }
        else {
            BubbleModule.stopAnimation();
            // BubbleModule.resetBubbleArea();
            alert('game completed');
            //@todo show score window
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

        BubbleModule.context.fillText(allRefs[this.verseIndex], this.x, this.y);
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

//@todo these
var WrongWindowModule = {

};

var ScoreWindowModule = {

};
