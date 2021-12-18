var END =0;
var PLAY =1;
var gameState = PLAY;


var gameOver,gameOverImg;
var restart,restartImg;
var TEXT,textImg;
var player,playerImg;
var virus,virusG,virusImg;
var bg,bgImg;
var score = 0,scoreB,scoreBImg
var edges;
var particles,particlesImg,particlesG;

function preload(){
playerImg = loadImage("2D Endless Runner Game Assets/Player.png")
bgImg = loadImage ("2D Endless Runner Game Assets/Background.png")
virusImg = loadImage ("2D Endless Runner Game Assets/Obstacle.png")
scoreBImg= loadImage (" 2D Endless Runner Game Assets/Wooden Panel.png")
particlesImg = loadImage ("2D Endless Runner Game Assets/Particle.png")
gameOverImg = loadImage ("gameOverImg.png")
restartImg = loadImage ("restartButtonImg.png")
textImg = loadImage ("reset logo.png")
}

function setup(){
createCanvas(1200,400)

bg = createSprite (600,200)
bg.addImage(bgImg)
bg.velocityX =- 5

scoreB = createSprite (1150,25)
scoreB.addImage (scoreBImg)
scoreB.scale = 0.1

player = createSprite (70,100)
player.addImage(playerImg);
player.scale = 0.2
player.collide = true


gameOver =createSprite(600,180);
gameOver.addImage(gameOverImg)
gameOver.scale = 0.5
gameOver.visible = false

TEXT = createSprite (600,250);
TEXT.addImage (textImg)
TEXT.scale = 0.4
TEXT.visible = false


virusG = new Group();
particlesG = new Group();

}
function draw() {
background ("grey")
//image(bgImg, 0, 0, width, height);

score = score + Math.round(getFrameRate()/50)


if(gameState===PLAY){
    
   
  
player.y =  World.mouseY
if (player.y < 40 ){
   player.y = 40
}
if(player.y > 1150 ){
  player.y = 1150
}


if(bg.x <  600  ){
  bg.x = 600;
}

if (World.frameCount % 100 == 0 ){
  spawnvirus()
}
  
  

  
  
  if(virusG.isTouching(player)){
     gameState = END;
     player.velocityY = 0;
    
  TEXT.visible = true
  gameOver.visible = true

    }
    
    
    
}else if (gameState === END) {
    
  
 
  
    bg.velocityX = 0;
    
    virusG.setVelocityEach = 0;
    

   
    textSize(20);
    fill("black");
    text("Press Up Arrow to Restart the game!", 500,200);
     if(keyDown("SPACE")) {
       reset();
   }
}




spawnParticles()
createEdgeSprites()
drawSprites ();

text ("Score || "+ score,1125,25)

}

function  spawnvirus  () {
   virus = createSprite(width,Math.round(random(50,350)));
   virus.addImage (virusImg)
   virus.scale = 0.1
   virus.velocityX = -(6 + 2*score/150);
   virus.lifetime = 200
   virus.debug = true
   virus.setCollider("circle",10,1)
   virusG.add(virus)
}

function spawnParticles (){
particles = createSprite(width,Math.round(random(10,390)));
particles.addImage(particlesImg);
particles.scale = 0.01
particles.velocityX = -6
particles.lifetime = 150


}


function reset(){
   gameState = PLAY;
  
   
   virusG.destroyEach();
    
TEXT.visible = false
gameOver.visible = false


   score = 0;
  }

