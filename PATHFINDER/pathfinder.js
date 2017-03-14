'use strict'

// wait for the window to load and then call back setup()
window.addEventListener('load', setup, false);

var count = 0;
var cellId = 0;
var pf;   // the global path finder object
const TWO_PI = 6.28318530718;
const FRAME_RATE=30;

function setup() {
  pf = new PathFinder();
  window.setTimeout(draw, 100);    // wait 100ms for resources to load then start draw loop
}

function draw() {   // the animation loop
  pf.run();
  pf.render();
  window.setTimeout(draw, 1000/FRAME_RATE);  // come back here every interval
}


class PathFinder{

  constructor(){
    this.isRunning = true;
    this.mouseX = 0;
    this.mouseY = 0;
    this.w = 100;
    this.done = false;
    // get and validate canvas and context
    this.canvas = document.getElementById('canvas');
    if (!this.canvas || !this.canvas.getContext)
    throw "No valid canvas found!";
    this.context = this.canvas.getContext("2d");
    if(!this.context)
    throw "No valid context found!";

    this.grid = [];
    this.line = [];
    this.empty = [];
    this.root = null;
    this.empty.push(this.root);
    this.current;

    this.cols = Math.floor(this.canvas.width / this.w);
    this.rows = Math.floor(this.canvas.height / this.w);
    // init class methods
    this.init();

  }

  init(){
    this.loadGrid();

    //  add listeners
    this.canvas.addEventListener('mousedown',function(evt){
      pf.mouseX = evt.offsetX;
      pf.mouseY = evt.offsetY;
      let row = Math.floor(pf.mouseY/pf.w);
      let col = Math.floor(pf.mouseX/pf.w);
      if(pf.grid[col][row].color === "pink"){
        pf.grid[col][row].color = "black";
        pf.grid[col][row].occupied = true; //  ++++++++++++++++++++++++++++ Error
      } else if(pf.grid[col][row].color === "black"){
        pf.grid[col][row].color = "pink";
        pf.grid[col][row].occupied = false;   //  ++++++++++++++++++++++++++++ Error
      }


    }, false );

    this.canvas.addEventListener('mousemove',function(evt){
      pf.mouseX = evt.offsetX;
      pf.mouseY = evt.offsetY;
    }, false );


    //loop that starts at goal

    // this.goal = this.grid[this.rows - 1][this.cols - 1];
    //   var k = 0;
    //   for(var i = this.rows - 1; i >= 0; i--){
    //     k = this.rows - 1 - i;
    //     for(var j = this.cols - 1; i >= 0; i--){
    //       if(!this.grid[i][j].occupied){
    //     this.grid[i][j].stepsToGoal = k;
    //     k++;
    //   }
    //   }
    // }
    // console.log(pf.grid);

    // this.goal = this.grid[this.rows - 1][this.cols - 1];
    // this.
    // this.grid[this]
  }

  run(){
    //goal start algorithm
    //label each grid space with number depending on how many steps it is from the goal
    this.start = this.grid[0][0];
    if(this.line.length > 0 || this.line.includes(start)){
      for(let i = 0; i < this.line.length; i++){
        this.current = this.line[0];
        //go through neighbors
        for(let j = 0; j < this.current.length; j++){
          let node = this.current.neighbors[j];
          if(node && !node.occupied && !node.hasParent){
            node.parent = this.current;
            node.hasParent = true;
            //adds one each time through loop for each step
            node.dist = this.current.dist + 1;
            this.line.push(node);
          }
        }
        this.removeElement(this.line, this.current);
      }
    }
    else{
      console.log("reached end");
    }
  }

  render(){
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for(let i = 0; i < this.cols; i++){
      for(let j = 0; j < this.rows; j++){
        this.grid[i][j].render();
      }
    }
    for(let i = 0; i < this.line.length; i++){
      this.line[i].render();
    }
  }

  loadGrid(){

    for(let i = 0; i < this.cols; i++){
      this.grid[i] = [];
      for(let j = 0; j < this.rows; j++){
        this.grid[i][j] = new Cell(new MyVector((i*this.w), (j*this.w)));
        if(Math.floor(Math.random()*100) < 18) this.grid[i][j].occupied = true;
        this.grid[i][j].id = ++cellId;
      }
    }
    //filling the neighbors array for each space on grid
    for(let i = 0; i < this.cols; i++){
      for(let j = 0; j < this.rows; j++){
        this.grid[i][j].addNeighbors(this, this.grid);
      }
    }

    this.root = this.grid[this.cols-1][this.rows-1];
    this.root.dist = 0;
    this.root.hasParent = true;
    this.root.isEmpty = false;
    this.line.push(this.root);
    this.current = this.root;
  }

  removeElement(arr, elt){
    for(let i = arr.length - 1; i >= 0; i--){
      if(arr[i] === elt){
        arr.slice(i, 1);
      }
    }
  }

}
