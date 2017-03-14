
class MyVector{

  constructor(x, y){
    this.x = x;
    this.y = y;
  }

  dist(vec){
    let dx = this.x - vec.x;
    let dy = this.y - vec.y;
    return Math.sqrt(dx*dx+dy*dy);
  }

}
