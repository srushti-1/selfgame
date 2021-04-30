var bg, bgImg;
var girlImg, girl;
var invisibleGround;
var stone, stoneGrp;
var troll, trollGrp;
var sword, swordImg;
var gameState = "play";
var score = 0;
var gameOverSound;
var restart, restartImg;

function preload(){
	bgImg = loadImage("bg.jpg");
	girlImg = loadAnimation("girl-removebg-preview.png", "girl2-removebg-preview.png", "girl3-removebg-preview.png", "girl4-removebg-preview.png",);
	stoneImg = loadImage("stone.png");
	trollImg = loadImage("troll.png");
	swordImg = loadImage("sword.png");
	gameOverSound = loadSound("salamisound-3603409-sfx-power-up-30-games.mp3");
	restartImg = loadImage("start.png");

}

function setup() {
createCanvas(1450, 800);

bg = createSprite(1000, 400, 2000, 800);
bg.scale = 5;
bg.addImage(bgImg);

sword = createSprite(350, 400);
sword.addImage(swordImg);
sword.scale = 0.5;

girl = createSprite(300, 600);
girl.addAnimation("running", girlImg); 

stoneGrp = new Group();
trollGrp = new Group();

invisibleGround = createSprite(0, 750, 4000, 10);
invisibleGround.velocityX = -3;
invisibleGround.visible = false;

restart = createSprite(1300, 100);
restart.addImage(restartImg);
restart.visible = false;


}


function draw() {
  rectMode(CENTER);
  background(0);
  bg.velocityX = -12;

  if(gameState === "play"){

	restart.visible = false;
	  
	if(bg.x<690){
	  bg.x = bg.width/2;
  }

  if(keyWentDown(DOWN_ARROW)){
	  sword.x = 500;
	  sword.y = 500;
  }

  if(keyWentUp(DOWN_ARROW)){
	  sword.x = 350;
	  sword.y = 400;
  }

  if(invisibleGround.x<900){
	  invisibleGround.x = invisibleGround.width/2;
  }

  girl.collide(invisibleGround);
  spawnObstacles();
  spawnTrolls();

  if(sword.isTouching(trollGrp)){
	  trollGrp.destroyEach();
	  score = score + 1;
  }

  if(girl.isTouching(trollGrp)){
	  trollGrp.destroyEach();
	  girl.destroy();
	  sword.destroy();
	  stoneGrp.destroyEach();
	  gameState = "end";
  }


  if(keyDown(UP_ARROW)&& girl.y>=400){
	  girl.velocityY = -10;
  }

  if(girl.collide(stoneGrp)){
	stoneGrp.destroyEach();
	girl.destroy();
	gameState = "end";
  }
  

  girl.velocityY += 0.5;
   
}

if(gameState === "end"){
	gameOverSound.play();
	textSize(30);
	fill("red");
	text("GAME OVER", 600, 400);
	restart.visible = true;

	if(mousePressedOver(restart)){
		reset();
	}
	
}

drawSprites();
textSize(30);
fill("black");
text("Score=" + score, 1300, 30);

}


function spawnObstacles() {
	if(frameCount % 300 === 0) {
	  stone = createSprite(2000,700,5,5);
	  stone.addImage(stoneImg);
	  stone.scale = 0.1;
	  stone.velocityX = -12;
	  stoneGrp.add(stone);
  
 
}

  }

  function spawnTrolls(){
	  if(frameCount%500 === 0){
		  troll = createSprite(2000, 500, 5, 5);
		  troll.addImage(trollImg);
		  troll.scale = 2.0;
		  troll.velocityX = -12;
		  trollGrp.add(troll);
	  }
  }

  function reset(){
	  gameState = "play"
	  restart.visible = false;
	  stoneGrp.destroyEach(); 
	  trollGrp.destroyEach();
	  score = 0; 
  }