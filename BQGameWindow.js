
$( function() {
   console.log('loaded');

   $('body').ready(BubbleModule.render());

});

var BubbleModule = {
    areaWidth: null,
    areaHeight: null,
    context: null,
    radius: 30,
    x: 40,
    y: 10,
    dx: 5,
    dy: 5,

    render: function() {
        // var ctx = (a canvas context);
        $('#bubbleArea').css('width', $('#bubbleBoundary').width());
        $('#bubbleArea').css('height', $('#bubbleBoundary').height());

        BubbleModule.areaWidth = ($('#bubbleArea').width());
        BubbleModule.areaHeight = ($('#bubbleArea').height());

        console.log(BubbleModule.areaHeight);
        console.log(BubbleModule.areaWidth);



        //get what's there
        BubbleModule.context= bubbleArea.getContext('2d');
        //move the bubble every x ms
        setInterval(BubbleModule.draw, 100);
    },

    draw: function() {


        //clear the specific pixels in the rectangle AKA get rid of the old bubble prior to moving it
        BubbleModule.context.clearRect(0, 0, BubbleModule.areaWidth, BubbleModule.areaHeight);
        // begin a path AKA create the bubble object
        BubbleModule.context.beginPath();
        //set the bubble color
        BubbleModule.context.fillStyle="blue";
        //Draws a circle with radius at the coordinates x,y on the canvas
        //arguments for reference: x, y, radius, start angle, end angle)
        BubbleModule.context.arc(BubbleModule.x, BubbleModule.y, BubbleModule.radius, 0, Math.PI*2, true);
        //create the path from the begin start to the end
        BubbleModule.context.closePath();
        // fill the bubble color
        BubbleModule.context.fill();

        //so the bubble doesn't exit on the x axis
        if (BubbleModule.x < 0 || BubbleModule.x > BubbleModule.areaWidth) {
            BubbleModule.dx = -BubbleModule.dx;
        }

        //so the bubble doesn't exit on the y axis
        if (BubbleModule.y  < 0 || BubbleModule.y > BubbleModule.areaHeight) {
            BubbleModule.dy = -BubbleModule.dy;
        }

        BubbleModule.x += BubbleModule.dx;
        BubbleModule.y += BubbleModule.dy;

    }

};