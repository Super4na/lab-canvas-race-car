console.log(`JS is connected!`)
const canvas = document.getElementById("canvas");
const context = canvas.getContext(`2d`);
let interval;

const game = {
    frame :0,
    obstacles: [],
    start: ()=>{
        interval =setInterval(()=> {
            updateCanvas();
        },10);
    },

    clear: ()=> {
        context.clearRect(0,0,canvas.clientWidth,canvas.clientHeight);
    },

    stop: ()=>{clearInterval(interval)},

    score: ()=> {
        const points = Math.floor(game.frame /5);
        context.font ="20px Arial";
        context.fillstyle = "black";
        context.fillText(`Score: ${points}`, 400, 650);
    },
};




class Car {
    constructor(x,y) {
this.x =x;
this.y =y;


        const img = new Image();
        img.src = `/images/car.png`;
        
        img.onload = () => {
            this.image =img;
            this.draw();
        };
    }

    draw() {
        context.drawImage(this.image, this.x, this.y, 50, 80)
    }
    moveRight() {
        this.x +=3;
    }

    moveLeft() {
        this.x -=3;
    }

    
    
    left() {
        return this.x;

    }

    right(){
        return this.x + this.width;
    }

    top() {
        return this.y;
    }
    bottom() {
        return this.y+this.height;
    }

    crashWidth(component) {
        return !(
            this.bottom() < component.top() || 
            this.top() >component.bottom() || 
            this.right() < component.left() || 
            this.left() > component.right()    
        );
    }
    
}

class Obstacle {
    constructor(x,y, width, height) {
        this.x =x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = "red";
        
       
    }
    draw1() {
        context.fillstyle = this.color ;
        context.fillRect(this.x,this.y,this.width,this.height);
    }

    down() {
    this.y +=1;
    }

    left() {
        return this.x;

    }

    right(){
        return this.x + this.width;
    }

    top() {
        return this.y;
    }
    bottom() {
        return this.y+this.height;
    }

}



const car = new Car(225,600-80);




document.addEventListener(`keydown`, (e) => {
    switch(e.key) {
        case "ArrowLeft":
                car.moveLeft();
                break;
        case "ArrowRight":
                car.moveRight()
                break;
    }
    context.clearRect(0,0,canvas.clientWidth, canvas.clientHeight);
    car.draw();
});

function drawObstacles() {

    game.obstacles.forEach((obstacle)=>{
        obstacle.y += 1;
        obstacle.draw1();
    });

game.frame++;

if(game.frame%120 === 0) {

    const minWidth = 10;
    const maxWidth = 390;
    const randomWidth = Math.floor(
        Math.random()*(maxWidth-minWidth+1) + minWidth);
    
    const minGap = 60;
    const maxGap = 100;
    const randomGap = Math.floor(
            Math.random()*(maxGap-minGap+1)+minGap);

    const obstacleLeft = new Obstacle(
            0,
            0,
            randomWidth,
            10,
            
        );
    game.obstacles.push(obstacleLeft)

        const obstacleRight = new Obstacle(
            randomGap+randomWidth,
            0,
            randomGap,
            10,
            
        );

        game.obstacles.push(obstacleRight)
        console.log(game.obstacles)
}

}

function updateCanvas() {
    game.clear();
    car.draw();
    car.moveRight();
    car.moveLeft();
    drawObstacles();
    checkGameOver();
    game.score();
};

function checkGameOver() {
    const crashed = game.obstacles.some((obstacle)=>{
        return car.crashWidth(obstacle) === true;
    });

    if (crashed) {
        game.stop();
        alert(`Game Over!`)
    }
};

const startButton = document.getElementById("start-button");
startButton.addEventListener("click", ()=> {
    game.start();
});
