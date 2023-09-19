//This function takes as arguments 
//  - an integer "size", representing the maximum value possible
//  - a integer "step", representing the step between two possible values 
//The step has to be a multiple of the size
//and generate a random integer between 0 and "size".
function randomN(size, step){
    return Math.floor(Math.random()*size/step)*step;
}
// This class creat rectangles with topLeftXPos, topLeftYPos, width and length as parameters
class Cible {
    constructor(xStep, yStep, maxWidth, maxHeight){
        this.topLeftXPos = randomN(maxWidth,xStep);
        this.topLeftYPos = 0;
        this.width = xStep;
        this.height = yStep;
    }

    touched(projectile){
        // return !((otherRectangle.topLeftYPos > (this.topLeftYPos+this.length))||
        // ((otherRectangle.topLeftYPos + otherRectangle.length) < (this.topLeftYPos)) ||
        // (otherRectangle.topLeftXPos > (this.topLeftXPos+this.width))||
        // ((otherRectangle.topLeftXPos + otherRectangle.width) < (this.topLeftXPos)))
    }
}

class Projectile {
    constructor(xPosCanon, xStep, yStep, maxHeight){
        this.radius = Math.min(xStep,yStep)/2;
        this.xCenter = xPosCanon + xStep/2;
        this.yCenter = maxHeight - 1.5*yStep;
    }
}

let cible = new Cible(100, 50, 900, 480);
console.log(cible);

let projectile = new Projectile(400,100,60,480);
console.log(projectile);

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

function drawCible(cible){
        ctx.fillStyle = "blue";
        ctx.fillRect(cible.topLeftXPos,cible.topLeftYPos,cible.width,cible.height);    
};

function drawProjectile(projectile){
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(projectile.xCenter, projectile.yCenter, projectile.radius, 0, Math.PI*2);
    ctx.fill();
    ctx.closePath();
}

drawCible(cible);
drawProjectile(projectile);