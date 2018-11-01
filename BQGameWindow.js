
$( function() {
   console.log('loaded');

   $('#bubbleArea').attr('width', $('#bubbleBoundary').width());
   $('#bubbleArea').attr('height', $('#bubbleBoundary').height());

   BubbleModule.areaWidth = ($('#bubbleArea').width());
   BubbleModule.areaHeight = ($('#bubbleArea').height());

   console.log(BubbleModule.areaHeight);
   console.log(BubbleModule.areaWidth);

   $('body').ready(BubbleModule.render());

});

var BubbleModule = {
    areaWidth: null,
    areaHeight: null,
    context: null,
    dx: 5,
    dy: 5,
    radius: 20,
    b1_x: 30,
    b1_y: 30,
    b2_x: 90,
    b2_y: 80,
    b3_x: 30,
    b3_y: 30,

    render: function() {

        //get what's there
        BubbleModule.context= bubbleArea.getContext('2d');

        // BubbleModule.context.rect(0,0,500,500);

        //move the bubble every x ms
        setInterval(BubbleModule.drawB1, 10);
        setInterval(BubbleModule.drawB2, 10);
    },

    drawB1: function() {

        //clear the specific pixels in the rectangle AKA get rid of the old bubble prior to moving it
        BubbleModule.context.clearRect(BubbleModule.b1_x - BubbleModule.radius*2, BubbleModule.b1_y - BubbleModule.radius*2, BubbleModule.b1_x + BubbleModule.radius*2, BubbleModule.b1_y + BubbleModule.radius*2);
        // begin a path AKA create the bubble object
        BubbleModule.context.beginPath();
        //set the bubble color
        BubbleModule.context.fillStyle="blue";
        //Draws a circle with radius at the coordinates x,y on the canvas
        //arguments for reference: x, y, radius, start angle, end angle)
        BubbleModule.context.arc(BubbleModule.b1_x, BubbleModule.b1_y, BubbleModule.radius, 0, Math.PI*2, true);
        //create the path from the begin start to the end
        BubbleModule.context.closePath();
        // fill the bubble color
        BubbleModule.context.fill();

        //so the bubble doesn't exit on the x axis
        if (BubbleModule.b1_x < BubbleModule.radius || BubbleModule.b1_x > (BubbleModule.areaWidth - BubbleModule.radius)) {
            BubbleModule.dx = -BubbleModule.dx;
        }

        //so the bubble doesn't exit on the y axis
        if (BubbleModule.b1_y  < BubbleModule.radius || BubbleModule.b1_y > (BubbleModule.areaHeight - BubbleModule.radius)) {
            BubbleModule.dy = -BubbleModule.dy;
        }

        BubbleModule.b1_x += BubbleModule.dx;
        BubbleModule.b1_y += BubbleModule.dy;

    },

    drawB2: function() {

        //clear the specific pixels in the rectangle AKA get rid of the old bubble prior to moving it
        BubbleModule.context.clearRect(BubbleModule.b2_x - BubbleModule.radius*2, BubbleModule.b2_y - BubbleModule.radius*2, BubbleModule.b2_x + BubbleModule.radius*2, BubbleModule.b2_y + BubbleModule.radius*2);
        // begin a path AKA create the bubble object
        BubbleModule.context.beginPath();
        //set the bubble color
        BubbleModule.context.fillStyle="red";
        //Draws a circle with radius at the coordinates x,y on the canvas
        //arguments for reference: x, y, radius, start angle, end angle)
        BubbleModule.context.arc(BubbleModule.b2_x, BubbleModule.b2_y, BubbleModule.radius, 0, Math.PI*2, true);
        //create the path from the begin start to the end
        BubbleModule.context.closePath();
        // fill the bubble color
        BubbleModule.context.fill();

        //so the bubble doesn't exit on the x axis
        if (BubbleModule.b2_x < BubbleModule.radius || BubbleModule.b2_x > (BubbleModule.areaWidth - BubbleModule.radius)) {
            BubbleModule.dx = -BubbleModule.dx;
        }

        //so the bubble doesn't exit on the y axis
        if (BubbleModule.b2_y  < BubbleModule.radius || BubbleModule.b2_y > (BubbleModule.areaHeight - BubbleModule.radius)) {
            BubbleModule.dy = -BubbleModule.dy;
        }

        BubbleModule.b2_x += BubbleModule.dx;
        BubbleModule.b2_y += BubbleModule.dy;

    }

};