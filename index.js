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
    constructor(xStep, yStep, maxWidth){
        this.x = randomN(maxWidth,xStep); //Coordonnée en x du point supérieur gauche de la cible
        this.y = 0; //Apparait toujours sur la ligne supérieure
        this.width = xStep;   //La largeur de la cible correspond à la largeur de la cellule
        this.height = yStep;
    }
    touchedBy(projectile){
        return (this.x == (projectile.xCenter-0.5*this.width)) &&
        (((projectile.yCenter-projectile.radius)-this.y)< this.height)
    }
    touchCanon(){
        return this.y > 370;

    }
    draw(){
        ctx.fillStyle = "blue";
        ctx.fillRect(this.x,this.y,this.width,this.height); 
    }
}

class Canon {
    constructor(xPosCanon){
        this.xCenter = xPosCanon+50;
        this.yCenter = 480;
        this.radius = 50;
    }
    draw(){
        ctx.fillStyle = "green";
        ctx.beginPath();
        ctx.arc(this.xCenter, this.yCenter, this.radius, Math.PI,0);
        ctx.fill();
        ctx.closePath();
    }
}

class Projectile {
    constructor(xCenterCanon, xStep, yStep, maxHeight){
        this.radius = Math.min(xStep,yStep)/4;
        this.xCenter = xCenterCanon;
        this.yCenter = maxHeight - 0.5*yStep;
        this.go = 0 ;
    }
    draw(){
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.arc(this.xCenter, this.yCenter, this.radius, 0, Math.PI*2,false);
        ctx.fill();
        ctx.closePath();
    }
    reachBorder(){
        return this.yCenter+this.radius < 0;
    }
    reset(){
        this.yCenter = 450;
        this.go = 0;
    }
}

let cible = new Cible(100, 60, 900);
let canon = new Canon(400);
let projectileN = 0;
let projectiles = [];
for (let i=0; i<3; i++) {
    projectiles.push(new Projectile(canon.xCenter,100,60,480));
}

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
let button = document.querySelector(".btn");

document.body.addEventListener('keydown',  (event) => {
    if (event.code === "Space") {
        projectiles[projectileN].go = 1;
        projectiles[projectileN].xCenter = canon.xCenter;
        projectileN == 2 ? projectileN = 0 : projectileN++;
    }
    if ((event.code === "ArrowLeft") && (canon.xCenter > 100)) {
        canon.xCenter -= 100 ;    
    }
    if ((event.code === "ArrowRight") && (canon.xCenter < 800)){
        canon.xCenter += 100 ; 
    }
})

let loop = function() {
    
    ctx.clearRect(0,0,900,480);
    
    cible.y += 1;
   
    for (let projectile of projectiles) {
        if (projectile.go == 1) {
            projectile.yCenter -= 10;
            projectile.draw();
        } 
        if (cible.touchedBy(projectile)){
            cible = new Cible(100,50,900);
            projectile.reset();
        }
        if (projectile.reachBorder()){
            projectile.reset();
        }
    }
    
    cible.draw();
    canon.draw();

    if (cible.touchCanon()){
        button.classList.toggle("hidden");
        return;
    }
    
    requestAnimationFrame(loop);
}
 
button.addEventListener('click', (e) => {
    e.target.classList.toggle("hidden");
    cible = new Cible(100,50,900);
    requestAnimationFrame(loop)
});
