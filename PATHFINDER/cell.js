
class Cell{
  constructor(loc){
    this.loc = new MyVector(loc.x, loc.y);
    this.occupied = false;
    this.color = 'pink';
    this.occupied = false;
    this.neighbors = [];
  }

  render(){
    pf.context.strokeStyle = 'white';
    pf.context.strokeRect(this.loc.x, this.loc.y, pf.w, pf.w);
    pf.context.fillStyle = this.color;
    pf.context.fillRect(this.loc.x, this.loc.y, pf.w, pf.w);
  }

  addNeighbors(PF, g){
    var column = (this.loc.x) / PF.w;
    var row = (this.loc.y) / PF.w;
    //checking and setting neighbors at n, e, s, w
    if(row > 0){
      var north = g[column][row - 1];
      this.neighbors.push(north);
    }
    if(column < PF.cols - 1){
      var east = g[column + 1][row];
      this.neighbors.push(east);
    }
    if(row < PF.rows - 1){
      var south = g[column][row + 1];
      this.neighbors.push(south);
    }
    if(column > 0){
      var west = g[column - 1][row];
      this.neighbors.push(column);
    }

  }
}
