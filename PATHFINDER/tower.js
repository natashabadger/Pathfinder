'use strict'

class Tower{

  constructor(loc, id, img){
    this.game = game;
    this.angle = 0;
    this.context = game.context;
    this.canvas = document.getElementById('canvas');
    this.context = this.canvas.getContext('2d');
    this.level = game.levels[game.currentLevel - 1];
    this.loc = loc;
    this.id = id;
    this.img = img;
    this.coolDown = 500;
    this.currTime;
    this.lastTime;
    this.fireBullet = false;
    this.init();
  }
  init(){
    this.currTime = Date.now();
    this.lastTime = this.currTime;
  }
  run(){
    this.render();
    this.update();
  }

  render(){

    this.context.save();

    this.context.translate(this.loc.x, this.loc.y);
    this.context.rotate(this.angle + (TWO_PI/4));
    this.context.drawImage(this.img, -25, -20);
    this.context.restore();
  }

  update(){
    let mouseX = game.mouseX;
    let mouseY = game.mouseY;
    this.currTime = Date.now();
    if(this.currTime - this.lastTime > this.coolDown) {
      this.fireBullet = true;
      this.lastTime = this.currTime;
    }


    let dx = mouseX - this.loc.x;
    let dy = mouseY - this.loc.y;
    let mouseVector = new GameVector(mouseX, mouseY);
    this.angle = Math.atan2(dy, dx);
    // if mouse gets  close to this, fire bullet
    let distToMouse = this.loc.dist(mouseVector);
    if(distToMouse < 200 && !game.placingTower && this.fireBullet ){
      this.level.createBullet(this.id, this.loc, this.angle);
      this.fireBullet = false;
    }
  }

}
