
let mousex = undefined;
let mousey = undefined;

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
    bubbleArray: [],
    bubbleCount: 6,
    radius: 30,

    render: function() {
        //get what's there
        BubbleModule.context= bubbleArea.getContext('2d');

        BubbleModule.bubbleArray.length = 0;

        for (let i = 0; i < BubbleModule.bubbleCount; i++) {
            var x = Math.random() * (BubbleModule.areaWidth - BubbleModule.radius  * 2) + BubbleModule.radius;
            var y = Math.random() * (BubbleModule.areaHeight - BubbleModule.radius  * 2) + BubbleModule.radius;
            const dx = (Math.random() - 1.5) * 2;
            const dy = (Math.random() - 1.5) * 2;

            $.each(BubbleModule.bubbleArray, function (index, bubble) {
                while (bubble['x'] == x) {
                    var x = Math.random() * (BubbleModule.areaWidth - BubbleModule.radius * 2) + BubbleModule.radius;
                }
                while (bubble['y'] == y) {
                    var y = Math.random() * (BubbleModule.areaHeight - BubbleModule.radius  * 2) + BubbleModule.radius;
                }
            });

            BubbleModule.bubbleArray.push(new Circle(x, y, dx, dy, BubbleModule.radius))
        }

        BubbleModule.animate();
    },

    animate: function() {
        requestAnimationFrame(BubbleModule.animate);

        BubbleModule.context.clearRect(0, 0, BubbleModule.areaWidth, BubbleModule.areaHeight);

        // window.addEventListener('click', (e) => {
        //     mousex = e.pageX - $('#bubbleArea').position().left;
        //     mousey = e.pageY - $('#bubbleArea').position().top;
            // alert( (mousex) + ' , ' + (mousey));

        // });

        for (let i = 0; i < BubbleModule.bubbleArray.length; i++) {
            BubbleModule.bubbleArray[i].update();


            // $('#bubbleArea').click(function(e){
            //     var x = e.clientX, y = e.clientY;
            //     if(Math.pow(x-50,2)+Math.pow(y-50,2) < Math.pow(50,2))
            //         console.log(BubbleModule.bubbleArray[i]);
            // })
        }

        // BubbleModule.testCollision();
    },

    testCollision: function() {

    }


};

const Circle = function(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.color = 'blue';

    this.draw = function() {
        BubbleModule.context.beginPath();
        BubbleModule.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        BubbleModule.context.strokeStyle = this.color;
        BubbleModule.context.stroke();
        BubbleModule.context.fillStyle = this.color;
        BubbleModule.context.fill();

    };

    this.update = function() {
        //
        // let distanceFromMouse = this.radius*2;
        // let maxRadius = 50;
        //
        // if (mousex - this.x < distanceFromMouse && mousex - this.x > -distanceFromMouse && mousey - this.y < distanceFromMouse && mousey - this.y > -distanceFromMouse) {
        //     // console.log(distanceFromMouse);
        //     // console.log(mousex-this.x);
        //     // console.log(this.x);
        //
        //     if (this.radius < maxRadius) {
        //         console.log('a');
        //         this.radius += 10
        //
        //     }
        //     else {
        //         if (this.radius > this.minRadius) {
        //             console.log('b');
        //             this.radius -= 10
        //         }
        //     }
        // }
        // else {
        //         // console.log(distanceFromMouse);
        //         // console.log(mousex-this.x);
        //         // console.log(this.x);
        //
        // }

        // window.addEventListener('click', function (e) {
        //     let mousex = e.x;
        //     let xMax = BubbleModule.bubbleArray[i].x + BubbleModule.radius;
        //     let xMin = BubbleModule.bubbleArray[i].x - BubbleModule.radius;
        //     let mousey = e.y;
        //
        //     // console.log(mousex);
        //     // console.log(BubbleModule.bubbleArray[i].x);
        //
        //     if ((mousex >= xMin) && (mousex <= xMax))
        //         console.log('bub');
        //
        // });


        var col = false;

        var thisX = parseInt(this.x);
        var thisY = parseInt(this.y);

        $.each(BubbleModule.bubbleArray, function(index, bubble) {
            var x = parseInt(bubble['x']);
            var y = parseInt(bubble['y']);
            if ( (thisX !== x ) && ( thisY !== y ) ) {
                if (Math.sqrt( (thisX-x) * (thisX-x) + (thisY-y) * (thisY-y) ) < (BubbleModule.radius*2) ) {
                    col = true;
                    // if ( (Math.abs(thisX - x) < (BubbleModule.radius*2) ) && ( Math.abs(thisY - y) < (BubbleModule.radius*2) ) ) {
                    console.log('col');

                    this.dx *= (-1);
                    this.dy *= (-1);

                    //to keep within window
                    if (this.x + this.radius > BubbleModule.areaWidth || this.x - this.radius < 0) {
                        this.x -= this.dx;
                    }

                    if ( this.y + this.radius > BubbleModule.areaHeight || this.y - this.radius < 0) {
                        this.y -= this.dy;
                    }

                    this.x += this.dx;
                    this.y += this.dy;
                    //to keep within window




                }
            }
        });


        if (col == false) {
            if (this.x + this.radius > BubbleModule.areaWidth || this.x - this.radius < 0) {
                this.dx = -this.dx
            }

            if (this.y + this.radius > BubbleModule.areaHeight || this.y - this.radius < 0) {
                this.dy = -this.dy
            }

            this.x += this.dx;
            this.y += this.dy;

        }






        this.draw()
    }
};
