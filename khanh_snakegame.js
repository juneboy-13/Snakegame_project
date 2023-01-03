
class snake{
    constructor(x,y,size){
        this.x = x
        this.y = y
        this.size = size
        this.tail = [{x:this.x, y:this.y}]
        this.rotateX = 0
        this.rotateY = 1

    }

    move(){
        var newRect;
        if(this.rotateX == 1){
            newRect = {
                x:this.tail[this.tail.length - 1].x + this.size,
                y:this.tail[this.tail.length - 1].y
            }
        } else if(this.rotateX == -1){
            newRect = {
                x:this.tail[this.tail.length - 1].x - this.size,
                y:this.tail[this.tail.length - 1].y
            }
        } else if(this.rotateY == 1){
            newRect = {
                x:this.tail[this.tail.length - 1].x,
                y:this.tail[this.tail.length - 1].y + this.size
            }
        } else if(this.rotateY == -1){
            newRect = {
                x:this.tail[this.tail.length - 1].x,
                y:this.tail[this.tail.length - 1].y - this.size
            }
        }

        this.tail.shift()
        this.tail.push(newRect)
    }
}


class Apple{
    constructor(){
        console.log("apple")
        console.log(snake.size)
        var isTouching;
        while(true){
            isTouching = false;
            this.x = Math.floor(Math.random() * canvas.width / snake.size) * snake.size
            this.y = Math.floor(Math.random() * canvas.height / snake.size) * snake.size
            for(var i = 0; i<snake.tail.length;i++){
                if(this.x == snake.tail[i].x && this.y == snake.tail[i].y){
                    isTouching = true
                }
            }
            console.log(this.x,this.y)
            this.size = snake.size
            this.color = "pink"
            if(!isTouching){
                break;
            }
        }   
    }
}

var canvas = document.getElementById("canvas")

var snake = new Snake(20,20,20);

var apple = new Apple();

var canvasContext = canvas.getContext('2d');

window.onload = ()=>{
    gameLoop();
}

function gameLoop(){
    setInterval(show, 1000/10) //here 15 is our fps value
}

function show(){
    update();
    draw();
}


function update(){
    canvasContext.clearRect(0,0, canvas.width, canvas.height)
    console.log("update")
    snake.move()
    eatApple()
    checkHitWall();

}

function checkHitWall(){
    var headtail = snake.tail[snake.tail.length -1]
    if(headtail.x == - snake.size) {
        headtail.x = canvas.width - snake.size
    } else if(headtail.x == canvas.width) {
        headtail.x = 0
    } else if(headtail.y == - snake.size) {
        headtail.y = canvas.height - snake.size
    } else if(headtail.y == canvas.height) {
        headtail.y = 0
    }
}



function eatApple(){
    if(snake.tail[snake.tail.length -1].x == apple.x && snake.tail[snake.tail.length -1].y == apple.y){
            snake.tail[snake.tail.length] = {x:apple.x,y: apple.y}
            apple = new Apple();
        }
}

function draw(){
    createRect(0,0,canvas.width, canvas.height, "black")
    createRect(0,0,canvas.width, canvas.height)
    for(var i = 0; i<snake.tail.length;i++){
        createRect(snake.tail[i].x + 2.5, snake.tail[i].y + 2.5,
           snake.size - 5, snake.size- 5,'yellow')
    }

    canvasContext.font = "20px Arial"
    canvasContext.fillStyle = "#00FF42"
    canvasContext.fillText("Diem so: "+ (snake.tail.length -1),canvas.width -120, 18 );
    createRect(apple.x, apple.y, apple.size, apple.size, apple.color)
}

function createRect(x,y,width,height,color){
    canvasContext.fillStyle = color
    canvasContext.fillRect(x,y,width,height)
}

window.addEventListener("keydown",(event)=>{
    setTimeout(()=>{
        if(event.keyCode == 37 && snake.rotateX != 1){
            snake.rotateX = -1
            snake.rotateY = 0;
        } else if(event.keyCode == 38 && snake.rotateY != 1){
            snake.rotateX = 0
            snake.rotateY = -1;
        } else if(event.keyCode == 39 && snake.rotateX != -1){
            snake.rotateX = 1
            snake.rotateY = 0;
        } else if(event.keyCode == 40 && snake.rotateY != -1){
            snake.rotateX = 0
            snake.rotateY = 1;
        }
    }, 1)
})