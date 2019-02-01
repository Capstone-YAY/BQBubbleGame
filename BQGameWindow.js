//BQGameWindow.js

function renderGameWindow() {
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
}


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
    bubbleCount: 10,
    //radius for bubbles
    radius: 45,

    usedCoords: [],
    firstLoad: true,
    quads: null,
    grids: null,
    grid_size: 5,

    //renders the bubbles
    render: function() {
        //get what's there
        BubbleModule.context= bubbleArea.getContext('2d');

        //reset the bubbleArray length to zero for safety
        BubbleModule.bubbleArray.length = 0;

        //total number of tries to get a full set of valid coordinates - helps prevent forever loops
        var maxAttempts = BubbleModule.bubbleCount*10;

        //holds the possible points for the bubbles
        var points = [];

        while((points.length <= BubbleModule.bubbleCount) && maxAttempts > 0) {
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

        console.log(points);

        //create each bubble using the Circle object
        for (let i = 0; i < BubbleModule.bubbleCount; i++) {
            //get the coordinates from the points array and assign it to x and y for the bubble
            coords= points[i];
            x = coords.x;
            y = coords.y;

            //randomize the direction the bubble will move (both x and y)
            var dx = parseInt( (Math.random() - 2) * 2);
            var dy = parseInt( (Math.random() - 2) * 2);


            //create the Circle with the randomized variables
            BubbleModule.bubbleArray.push(new Circle(x, y, dx, dy, BubbleModule.radius));
        }

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

        //@todo get text for bubble
        BubbleModule.context.fillText('text', this.x, this.y);
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
