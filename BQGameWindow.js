
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
    bubbleCount: 2,
    radius: 30,

    render: function() {
        //get what's there
        BubbleModule.context= bubbleArea.getContext('2d');

        BubbleModule.bubbleArray.length = 0;
        for (let i = 0; i < BubbleModule.bubbleCount; i++) {
            const x = Math.random() * (BubbleModule.areaWidth - BubbleModule.radius  * 2) + BubbleModule.radius;
            const y = Math.random() * (BubbleModule.areaHeight - BubbleModule.radius  * 2) + BubbleModule.radius;
            const dx = (Math.random() - 0.5) * 2;
            const dy = (Math.random() - 0.5) * 2;

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

            $('#bubbleArea').click(function(e){
                var x = e.clientX, y = e.clientY;
                if(Math.pow(x-50,2)+Math.pow(y-50,2) < Math.pow(50,2))
                    console.log(BubbleModule.bubbleArray[i]);
            })
        }

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
        BubbleModule.context.fill()
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


        if (this.x + this.radius > BubbleModule.areaWidth || this.x - this.radius < 0) {
            this.dx = -this.dx
        }

        if (this.y + this.radius > BubbleModule.areaHeight || this.y - this.radius < 0) {
            this.dy = -this.dy
        }

        this.x += this.dx;
        this.y += this.dy;

        this.draw()
    }
};
