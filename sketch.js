var fimDeJogo, fimimg, reinicioimg, restart, restartimg;
var megamen, megamen_correndo; 
var solo, soloimg;
var soloinvisivel;
var pontuacao = 0;
var tempoSomFim0 = 60;
var Obs_1, Obs_2, Obs_3, Obs_4, Obs_5;
var soloVx0 = -7;
var delGrav = 0.5;

var JOGAR = 1;
var ENCERRAR = 0;
var estado = JOGAR;

function preload() {
  megamen_correndo = loadAnimation("1.png","4.png",);
  soloimg = loadImage("ground2.png");
  Obs_1 = loadImage("obstacle1.png");
  Obs_2 = loadImage("obstacle2.png");
  Obs_3 = loadImage("obstacle3.png");
  Obs_4 = loadImage("obstacle4.png");
  Obs_5 = loadImage("obstacle5.png");

  fimimg = loadImage("GameOver.png");
  restartimg = loadImage("restart.png");

}

function setup() {
  createCanvas(windowWidth, windowHeight);

  grupoObstaculos = createGroup();

  fimDeJogo = createSprite(width/600*300, height/200*100);
  fimDeJogo.addImage(fimimg);
  fimDeJogo.scale = 0.5;
  fimDeJogo.visible = false;

  restart = createSprite(width/600*300, height/200*110);
  restart.addImage(restartimg);
  restart.scale = 0.5;
  restart.visible = false;

  megamen = createSprite(width/600*50, height/200*160, width/600*20, height/200*50);
  megamen.addAnimation("runing",megamen_correndo);
  megamen.scale = 0.4;

  megamen.setCollider("circle", 0, 0, 40);

  
  solo = createSprite(100,600,200,300);
  solo.addImage(soloimg);
  solo.velocityX = soloVx0;
  soloimg.scale = 0.1;
  soloinvisivel = createSprite(100,520, width/600*400, height/200*5);

  Obs_4.scale = 0.3;

}

function draw() {
  background("white");

  
  if (estado === JOGAR) {
    geraObstaculos();
    
  
    pontuacao = pontuacao + Math.round(frameRate()/60) ;    

    solo.velocityX = soloVx0 - (3 * pontuacao)/500;
    tempoSomFim = tempoSomFim0;
  } else {
    solo.velocityX = 0;
  
    grupoObstaculos.setVelocityXEach(0);    
    grupoObstaculos.setLifetimeEach(-1);

    fimDeJogo.visible = true;
    restart.visible = true;
    tempoSomFim = tempoSomFim - Math.round(frameRate()/60);
  }
  if (grupoObstaculos.isTouching(megamen)) {
    
    estado = ENCERRAR;
   

  }

  if((touches.length > 0 || mousePressedOver(restart)) && estado === ENCERRAR){
   
    reset();
    touches = [];
  }

  if (pontuacao > 0 && pontuacao % 500 === 0) {
    solo.velocityX = solo.velocityX - 1;
    delGrav = delGrav + 0.05;
  }
  


  if ((touches.length > 0 || keyDown("space")) && megamen.y >= 160) {
    megamen.velocityY = -10;
    touches = [];
  }

  megamen.velocityY = megamen.velocityY + delGrav;

 
  megamen.collide(soloinvisivel);
  soloinvisivel.visible = false;


  if (solo.x < solo.width/3) {
    solo.x = solo.width/2;
  }
  

  drawSprites();
  text("Pontuação: " + pontuacao + " seg", width/600*450, height/200*20);
}

function reset(){
  
  pontuacao = 0;
  
  fimDeJogo.visible = false;
  restart.visible = false;
  
  grupoNuvens.destroyEach();
  grupoObstaculos.destroyEach();
  
  trex.changeAnimation("runing");
  
  estado = JOGAR;
  solo.velocityX = soloVx0;
  
  
  
}

function geraObstaculos() {
  if (frameCount % 60 === 0) {
    var obstaculo = createSprite( height/600*601,550, width/600*10, height/200*40);
    obstaculo.velocityX = solo.velocityX;

    var tipoObstaculo = Math.round(random(1, 6));

    switch (tipoObstaculo) {
      case 1:
        obstaculo.addImage(Obs_1);
        break;
      case 2:
        obstaculo.addImage(Obs_2);
        break;
      case 3:
        obstaculo.addImage(Obs_3);
        break;
      case 4:
        obstaculo.addImage(Obs_4);
        break;
      case 5:
        obstaculo.addImage(Obs_5);
        break;
    }

    obstaculo.scale = 0.3;
    obstaculo.lifetime = Math.abs(width / obstaculo.velocityX);
    grupoObstaculos.add(obstaculo);
    
    
  }
  
  
}
