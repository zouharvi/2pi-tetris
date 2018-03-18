Block = function(scheme, x, y) {
 this.scheme = scheme;
 this.type = ++typeToAssign;
 
 for(var i = 0; i < scheme.length; i++) {
  for(var j = 0; j < scheme[i].length; j++) {
   if(scheme[i][j] == 1)
    grid[i+y][j+x].type = this.type;
  }
 }
}

var blockSchemes = [
 [[1, 0, 0],
  [1, 1, 1],
  [0, 0, 0]],
 [[0, 0, 0],
  [1, 1, 1],
  [1, 0, 0]],

 [[0, 1, 0],
  [1, 1, 1],
  [0, 0, 0]],
 [[1, 1, 1],
  [0, 1, 0],
  [0, 0, 0]],

 [[1, 0, 0],
  [1, 0, 0],
  [1, 0, 0]],

 [[0, 0, 0],
  [1, 0, 1],
  [1, 1, 1]],

 [[0, 1, 1],
  [0, 0, 1],
  [0, 0, 0]],
 [[0, 1, 0],
  [0, 1, 1],
  [0, 0, 0]],

 [[1, 1, 1],
  [0, 1, 0],
  [0, 1, 0]],
  
 [[1, 1, 0],
  [1, 1, 0],
  [0, 0, 0]]
];
