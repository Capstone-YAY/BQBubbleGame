//BQGameWindow.js

$( function() {
   console.log('loaded');

   //set the bubble area's width and height equivalent to that of the page
   $('#bubbleArea').attr('width', $('#bubbleBoundary').width());
   $('#bubbleArea').attr('height', $('#bubbleBoundary').height());

    //set the height and width variables so we know how large the bubble area is
   BubbleModule.areaWidth = ($('#bubbleArea').width());
   BubbleModule.areaHeight = ($('#bubbleArea').height());

   //once the body is loaded render the bubbles
   $('body').ready(BubbleModule.render());


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


});


var BubbleModule = {
    //width of the bubble area
    areaWidth: null,
    //height of the bubble area
    areaHeight: null,
    //canvas 2d content
    context: null,
    //array of Circle objects aka bubbles
    bubbleArray: [],
    //total number of bubbles
    bubbleCount: 20,
    //radius for bubbles
    radius: 30,
    quadXCount: null,
    quadYCount: null,
    availCoords: [],

    //renders the bubbles
    render: function() {
        //get what's there
        BubbleModule.context= bubbleArea.getContext('2d');

        //reset the bubbleArray length to zero for safety
        BubbleModule.bubbleArray.length = 0;

        console.log(BubbleModule.areaWidth);


        //create each bubble using the Circle object
        for (let i = 0; i < BubbleModule.bubbleCount; i++) {
            //randomize the x and y being sure they're within the available area and that no part of the bubble will be outside it
            var x = BubbleModule.getNewX();
            var y = BubbleModule.getNewY();

            BubbleModule.getNewCoords();


            //randomize the direction the bubble will move (both x and y)
            var dx = parseInt( (Math.random() - 4) * 2);
            var dy = parseInt( (Math.random() - 4) * 2);

            // console.log(x + ", " + y);
            // console.log(dx + ' - ' + dy);

            //create the Circle with the randomized variables
            BubbleModule.bubbleArray.push(new Circle(x, y, dx, dy, BubbleModule.radius))
        }



        //start the page animation
        BubbleModule.animate();
    },

    getNewCoords: function () {
        BubbleModule.quadXCount = parseInt(Math.ceil(BubbleModule.areaWidth/BubbleModule.radius)) - 5;
        BubbleModule.quadYCount = parseInt(Math.ceil(BubbleModule.areaHeight/BubbleModule.radius)) - 5;

        console.log(BubbleModule.quadXCount);
        console.log(BubbleModule.quadYCount);

        var quads = null;

        if (BubbleModule.quadXCount >= BubbleModule.quadYCount) {
            //@todo create an array of quads with min and max for both x and y
            quads = BubbleModule.quadYCount;
        }
        else {
            quads = BubbleModule.quadXCount;
        }

        //@todo fill in array with possible spawn locations
        for (var i = 0; i < quads; i++) {
            //@todo find x coord within quadX[1]
            //Math.floor(Math.random()*(max-min+1)+min)

            // var x =


            //@todo find y coord within quadY[1]
            // var y = 0;

            // BubbleModule.availCoords.push({
            //     x: x,
            //     y: y
            // })
        }

        // var incX = parseInt(Math.ceil(BubbleModule.areaWidth/BubbleModule.bubbleCount)) + 2;
        // var last = BubbleModule.radius + 1;
        // for (var i = 0; i < BubbleModule.bubbleCount; i++) {
        //     BubbleModule.xOptions.push(last);
        //     if (last + incX + BubbleModule.radius >= BubbleModule.areaWidth) {
        //         @todo move back to starting x with next available y
        //
        //     }
        //     else {
        //         last = last + incX;
        //     }

        // }

    },

    getNewX: function () {
        var x = Math.random() * (BubbleModule.areaWidth - BubbleModule.radius * 2) + BubbleModule.radius;


        return parseInt(x);
    },

    getNewY: function () {
        var y = Math.random() * (BubbleModule.areaHeight - BubbleModule.radius  * 2) + BubbleModule.radius;

        return parseInt(y);
    },

    //start the page animation
    animate: function() {
        //recursively call the animation
        requestAnimationFrame(BubbleModule.animate);

        //erase the bubbles drawn
        BubbleModule.context.clearRect(0, 0, BubbleModule.areaWidth, BubbleModule.areaHeight);

        //redraw each bubble using the update function
        for (let i = 0; i < BubbleModule.bubbleArray.length; i++) {
            BubbleModule.bubbleArray[i].update();

        }

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
        console.log(BubbleModule.bubbleArray[clickedBubbleIndex]);

        //remove the bubble from the array
        BubbleModule.bubbleArray.splice(clickedBubbleIndex, 1);
        //update the number of bubbles to account for the one being removed
        BubbleModule.bubbleCount--;

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
    }




};

const Circle = function(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;

    //direction of movement for x
    this.dx = dx;
    //direction of movement for y
    this.dy = dy;
    //bubble radius passed to function (should always be BubbleModule.radius)
    this.radius = radius;
    //bubble fill color
    this.color = 'blue';

    //draw the bubble on the canvas
    this.draw = function() {
        BubbleModule.context.beginPath();
        BubbleModule.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        BubbleModule.context.strokeStyle = this.color;
        BubbleModule.context.stroke();
        BubbleModule.context.fillStyle = this.color;
        BubbleModule.context.fill();
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
