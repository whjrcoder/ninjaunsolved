var score=0
var gameState="loading"
var roof;
var villan;
var token=1;
function preload(){

ninjaImg=loadAnimation("images/ninja1.png","images/ninja2.png","images/ninja3.png")
ninjaAttack=loadAnimation("images/ninjaattack.png")
bgImg=loadImage("images/forest.png")
villan1=loadImage("images/villan1.png")
villain2=loadAnimation("images/villan2.png")
ninjadie=loadImage("images/ninjadead.png")
turtledie=loadAnimation("images/turtledie.png")
coin=loadImage("images/coins.png")
killer=loadAnimation("images/killer.png")
gif_loadImg = loadImage("7pla.gif");
  gif_createImg = createImg("7pla.gif");
  introimage=loadImage("images/loadingimage.jpg")
  buttonimg=loadImage("images/playbutton.png")
  templeimg=loadImage("images/temple.png")
}





function setup() {
  createCanvas(displayWidth,displayHeight);
  console.log(displayWidth)
  console.log(displayHeight)
  

//intro=createSprite(displayWidth/2,displayHeight/2)


forest=createSprite(displayWidth/2,displayHeight/2)
forest.addImage("load",introimage)
forest.addImage("jungle",bgImg)
forest.addImage("mandir",templeimg)
    
playbutton=createSprite(displayWidth/2,displayHeight/2)

ninja= createSprite(150, displayHeight-180, 50, 50);
ninja.addAnimation("ninja1",ninjaImg);
ninja.addImage("ndie",ninjadie)
ninja.addAnimation("ninjaatt",ninjaAttack);
ninja.addAnimation("kill",killer)


ninja.setCollider("rectangle",0,0,100,150)
ninja.debug=true
inviground=createSprite(displayWidth/2,displayHeight-130,4*displayWidth,5)
inviground.visible=true

roofgroup=createGroup();
for(i=350;i<5000;i=i+800){
  roof=createSprite(i,displayHeight/2,450,10)
  roof.visible=true
  roofgroup.add(roof)
  //console.log(roof.x)
  i=i+50;
}



turtlegroup=createGroup()
coingroup=createGroup()


}

function draw() {
  background("white");
if(gameState==="loading"){
  forest.addImage("load",introimage)
  image(gif_loadImg, 50, 50);
  gif_createImg.position(450,550)
  playbutton.addImage("btt",buttonimg)
  playbutton.scale=1
  ninja.visible=false
  if(touches.length>0||mousePressedOver(playbutton)){
    gif_createImg.hide()
    playbutton.visible=false
    gameState="play"
    touches=[]
  }

}
  if(gameState==="play"){
    ninja.visible=true
   
   forest.changeImage("jungle",bgImg)

   
   forest.scale=1.3
   forest.velocityX=-(5+2*score/10)
    if(forest.x<200){
      forest.x=displayWidth/2
    }
      if(touches.length>0||keyDown("space")){
          
        ninja.velocityY=-20  
        ninja.changeAnimation("ninjaatt",ninjaAttack);   
     
      }
 
     
      if(ninja.y<displayHeight-180){
          token=0;
          
      }
      if(ninja.y>=displayHeight-180) {
          token=1;
      }
      console.log(token)
      console.log(ninja.y)
      ninja.velocityY=ninja.velocityY+1;

      for(j=0;j<turtlegroup.length;j++){
       if(token===0&&ninja.isTouching(turtlegroup[j])){

            turtlegroup[j].destroy();
            
        }
     else if(turtlegroup[j].isTouching(ninja)&&token===1&&ninja.isTouching(inviground))
        {
        gameState="end"
}
        
}

if(ninja.isTouching(inviground)){


  ninja.changeAnimation("ninja1",ninjaImg)
}


turtle()
createcoins() 
for(x=0;x<coingroup.length;x++){
 if(coingroup[x].isTouching(ninja)){

coingroup[x].destroy()
score=score+1
 }
}
 //camera.position.x=ninja.x
// camera.position.y=displayHeight/2
if(score===2){
gameState="level2"

}


  }
  if(gameState==="level2"){
   
forest.changeImage("mandir",templeimg)
forest.scale=1.6
forest.velocityX=0

camera.position.x=ninja.x+500
camera.position.y=displayHeight/2

ninja.changeAnimation("ninja1",ninjaImg);
ninja.scale=0.7
ninja.velocityX=3


ninja.collide(roofgroup)

turtle();


inviground.x=50
inviground.width=displayWidth/2+100;
//inviground.visible=true;
ninja.setCollider("rectangle",0,0,50,200)
//ninja.collide(inviground)
if(ninja.isTouching(roof)){

  ninja.changeAnimation("ninja1",ninjaImg)
}

createcoins() 
for(x=0;x<coingroup.length;x++){
  if(coingroup[x].isTouching(ninja)){
 
 coingroup[x].destroy()
 score=score+1
  }
 }
  }
if(gameState==="end"){
  ninja.changeImage("ndie",ninjadie)
forest.velocityX=0
ninja.velocityY=ninja.velocityY+2
ninja.collide(inviground)
coingroup.destroyEach()

}

ninja.collide(inviground)

drawSprites();
textSize(50)
fill("gold")
text("COINS "+score,displayWidth-300,displayHeight-700)

}

function turtle(){
 var i=Math.round(random(10,700))

  if(frameCount%i===0){
villan=createSprite(random(displayWidth-10,displayWidth-100),displayHeight-250)
villan.addImage("turtle",villan1)
villan.addAnimation("turtle2",villain2)
villan.addAnimation("tdie",turtledie)
villan.velocityX=-5
villan.scale=1.3
villan.debug=true
if(gameState==="level2"){
  villan.scale=0.43
  villan.y=displayHeight-450
  villan.changeAnimation("turtle2",villain2)
  
}
turtlegroup.add(villan)

  }
}


  

function createcoins(){
if(frameCount%Math.round(random(10,900))===0){
coins=createSprite(displayWidth-10,random(displayHeight-400,displayHeight-600))
coins.addImage("rupee",coin)
coins.velocityX=-3
coins.scale=0.1
coingroup.add(coins)

for(i=0;i<coingroup.length;i++){
coingroup[i].depth=ninja.depth
ninja.depth=ninja.depth+1
coingroup[i].lifetime=500
}
}

}

