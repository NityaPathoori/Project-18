//Global Variables
var bananaImage, bananaGroup;
var obstacleGroup, obstacleImage;
var backdrop, backdropImage;
var ground, groundImage;
var player, playerImage;
var survivalTime = 0;


function preload(){
  backdropImage = loadImage("jungle.jpg");
  
  playerImage = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  groundImage = loadImage("ground.jpg");
  
  obstacleImage = loadImage("stone.png");
  
  bananaImage = loadImage("Banana.png");
  
}


function setup() {
  createCanvas(600,300);
  
  backdrop = createSprite(300,150,20,20);
  backdrop.addImage("backdrop", backdropImage);
  backdrop.velocityX = -4;
  backdrop.x = backdrop.width/2;
  
  ground = createSprite(300,300,5,5);
  ground.addImage("ground", groundImage);
  ground.scale = 0.2
  ground.velocityX = -4;
  ground.x = ground.width/2;
  
  player = createSprite(100,200,10,10);
  player.addAnimation("player", playerImage);
  player.scale = 0.2
  
  bananaGroup = new Group();
  obstacleGroup = new Group();
}


function draw(){
 background(255);
  
  
  player.collide(ground);
  ground.visible = false;
  
  if(keyDown("space") && player.y >= 159){
      player.velocityY = -12 ;
  }
  
  player.velocityY = player.velocityY + 0.8;
  
  switch(survivalTime) {
    case 10: player.scale = 0.12;
      break;
    case 20: player.scale = 0.14;
      break;
    case 30: player.scale = 0.16;
      break;
    case 40: player.scale = 0.18;
      break;
    default: break;
  }
    
  if(obstacleGroup.isTouching(player)) {
    player.scale = 0.2;
  }
  
  if(bananaGroup.isTouching(player)) {
    survivalTime = survivalTime+2;
    bananaGroup.destroyEach;
  }
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Survival Time: ", survivalTime, 500,50);
  
  spawnFood();
  spawnObstacle();
  
  drawSprites();
}

function spawnfood() {
  if(frameCount % 80 === 0) {
   banana = createSprite(100,250,5,5);
   banana.y = Math.round(random(120,200));
   banana.addImage("banana", bananaImage);
   banana.scale = 0.05;
   
   banana.depth = player.depth;
   player.depth = banana.depth + 1;
    
   banana.lifetime = 200;
    
   bananaGroup.add(banana);
    
  }   
} 

function spawnObstacle() {
  if(frameCount % 300 === 0) {
    obstacle.createSprite(300,400,5,5);
    obstacle.y = Math.round(random(120,200));
    obstacle.addImage("obstacle", obstacleImage);
    obstacle.scale = 0.15;
    
    obstacle.lifetime = 300;
    
    obstacleGroup.add(obstacle);
  }  
    
    
    
}