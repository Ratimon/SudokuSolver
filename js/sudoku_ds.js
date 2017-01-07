;(function(global, $) {
  // hidden within the scope of the IIFE and never directly accessible

// ###########################
//Data definition
// ###########################

// Pos is Natural[0, 80]
// interp.
// the position of a square on the board, for a given p, then
//    - the row    is (quotient p 9)    - the column is (remainder p 9)
//

// board is (listof Val|false)   that is 81 elements long
// interp.
// Visually a board is a 9x9 array of squares, where each square
// has a row and column number (r, c).  But we represent it as a
// single flat list, in which the rows are layed out one after
// another in a linear fashion. (See interp. of Pos below for how
// we convert back and forth between (r, c) and position in a board.)

   // Examples
   // var BD1 = [     2,     7,     4, false,     9,     1, false, false,     5,
   //                 1, false, false,     5, false, false, false,     9, false,
   //                 6, false, false, false, false,     3,     2,     8, false,
   //             false, false,     1,     9, false, false, false, false,     8,
   //             false, false,     5,     1, false, false,     6, false, false,
   //                 7, false, false, false,     8, false, false, false,     3,
   //                 4, false,     2, false, false, false, false, false,     9,
   //             false, false, false, false, false, false, false,     7, false,
   //                 8, false, false,     3,     4,     9, false, false, false];//easy
   //
   // var BS1 = [     2,     7,     4,     8,     9,     1,     3,     6,     5,
   //                 1,     3,     8,     5,     2,     6,     4,     9,     7,
   //                 6,     5,     9,     4,     7,     3,     2,     8,     1,
   //                 3,     2,     1,     9,     6,     4,     7,     5,     8,
   //                 9,     8,     5,     1,     3,     7,     6,     4,     2,
   //                 7,     4,     6,     2,     8,     5,     9,     1,     3,
   //                 4,     6,     2,     7,     5,     8,     1,     3,     9,
   //                 5,     9,     3,     6,     1,     2,     8,     7,     4,
   //                 8,     1,     7,     3,     4,     9,     5,     2,     6];//solution to BD1
   //
   // var BD2 = [     5, false, false, false, false,     4, false,     7, false,
   //             false,     1, false, false,     5, false,     6, false, false,
   //             false, false,     4,     9, false, false, false, false, false,
   //             false,     9, false, false, false,     7,     5, false, false,
   //                 1,     8, false,     2, false, false, false, false, false,
   //             false, false, false, false, false,     6, false, false, false,
   //             false, false,     3, false, false, false, false, false,     8,
   //             false,     6, false, false,     8, false, false, false,     9,
   //             false, false,     8, false,     7, false, false,     3,     1];//hard
   //
   // var BS2 = [     5,     3,     9,     1,     6,     4,     8,     7,     2,
   //                 8,     1,     2,     7,     5,     3,     6,     9,     4,
   //                 6,     7,     4,     9,     2,     8,     3,     1,     5,
   //                 2,     9,     6,     4,     1,     7,     5,     8,     3,
   //                 1,     8,     7,     2,     3,     5,     9,     4,     6,
   //                 3,     4,     5,     8,     9,     6,     1,     2,     7,
   //                 9,     2,     3,     5,     4,     1,     7,     6,     8,
   //                 7,     6,     1,     3,     8,     2,     4,     5,     9,
   //                 4,     5,     8,     6,     7,     9,     2,     3,     1];//solution to BD2
   //
   // var BD3 =  [     1,     2,     3,     4,     5,     6,     7,     8, false,
   //              false, false, false, false, false, false, false, false,     2,
   //              false, false, false, false, false, false, false, false,     3,
   //              false, false, false, false, false, false, false, false,     4,
   //              false, false, false, false, false, false, false, false,     5,
   //              false, false, false, false, false, false, false, false,     6,
   //              false, false, false, false, false, false, false, false,     7,
   //              false, false, false, false, false, false, false, false,     8,
   //              false, false, false, false, false, false, false, false,     9];//no solution

 // 'new' an object
 var SBroad = function(id) {
     return new SBroad.init(id);
 }


// //row is object of array
// //interp. positions of all the columns
//    var row       = {
//     R1 :  [ 0, 1, 2, 3, 4, 5, 6, 7, 8],
//     R2 :  [ 9,10,11,12,13,14,15,16,17],
//     R3 :  [18,19,20,21,22,23,24,25,26],
//     R4 :  [27,28,29,30,31,32,33,34,35],
//     R5 :  [36,37,38,39,40,41,42,43,44],
//     R6 :  [45,46,47,48,49,50,51,52,53],
//     R7 :  [54,55,56,57,58,59,60,61,62],
//     R8 :  [63,64,65,66,67,68,69,70,71],
//     R9 :  [72,73,74,75,76,77,78,79,80]
//    };
//
//      //col is object of array
//      //interp. positions of all the columns
//    var col       = {
//      C1 :  [ 0, 9,18,27,36,45,54,63,72],
//      C2 :  [ 1,10,19,28,37,46,55,64,73],
//      C3 :  [ 2,11,20,29,38,47,56,65,74],
//      C4 :  [ 3,12,21,30,39,48,57,66,75],
//      C5 :  [ 4,13,22,31,40,49,58,67,76],
//      C6 :  [ 5,14,23,32,41,50,59,68,77],
//      C7 :  [ 6,15,24,33,42,51,60,69,78],
//      C8 :  [ 7,16,25,34,43,52,61,70,79],
//      C9 :  [ 8,17,26,35,44,53,62,71,80]
//    };
//
//     //box is object of array
//     //interp. positions of all the box
//    var box      = {
//      B1 :  [ 0, 1, 2, 9,10,11,18,19,20],
//      B2 :  [ 3, 4, 5,12,13,14,21,22,23],
//      B3 :  [ 6, 7, 8,15,16,17,24,25,26],
//      B4 :  [27,28,29,36,37,38,45,46,47],
//      B5 :  [30,31,32,39,40,41,48,49,50],
//      B6 :  [33,34,35,42,43,44,51,52,53],
//      B7 :  [54,55,56,63,64,65,72,73,74],
//      B8 :  [57,58,59,66,67,68,75,76,77],
//      B9 :  [60,61,62,69,70,71,78,79,80]
//    };
//



// ###########################
//methods definitions
// ###########################

   // prototype holds methods (to save memory space)
   SBroad.prototype = {
        // board -> Board(object)
        // interp reset all squares to false value
        resetboard : function (bd) {
          for (var i = 0; i < bd.length; i++) {
            bd[i] = false
          } return this
        },

        //  Pos, Val -> Broad(object)
        //interp. update new Board.currentbd with val at given position
          fillsquare : function(pos, val) {
          this.currentbd.splice(pos, 1, val)
          return this
        },

        //  Arr -> Broad(object)
        //interp. update new Board.currentbd with given arr
          fillallsquare : function(arr) {
          // debugger;
          for (var i = 0; i < arr.length; i++) {
            this.fillsquare(i, arr[i])
          } return this
        },

        //  Pos -> Broad(object)
        //interp. update new Board.currentbd with false at given position
          removesquare : function (pos) {
          return this.fillsquare(pos, false);
        },

        // (mutual recursion)
        //board(array) -> board or false
        //Arrayofboard -> board or false
        //interp. Backtracking serch function
        //        produce a solution for board , or false if board is unsolvable
        // Assump. the board is valid
         solve : function () {
          var board = this.currentbd
          return this.solveBd(board)
        },

         solveBd : function (bd) {
          // debugger;
          if (this.issolve(bd)) {
            return bd;
          } else {
            return this.solveArrbd(this.nextbd(bd))
          }
        },

         solveArrbd : function (arrb) {
          // debugger
            if ((arrb.length === 0)||(arrb === false)) {
              return false;
            } else {
              var store = this.solveBd(arrb[0]);
              if (store !== false) {
                return store;
              } else {
                return this.solveArrbd(arrb.slice(1, arrb.length))
              }
            }
          },

        //board(array) -> boolean
        //interp. produce true if board is solve
        //Assum: board is valid , so it is solved if it is full
         issolve: function (bd) {
          // debugger
          for (var i = 0; i < bd.length; i++) {
            if (typeof bd[i] === 'boolean') {
              return false;
            }
          } return true;
        },

        //board(array) -> Arrayofboard
        //interp.produce Array of valid next Board from given board
        //funds first empty square, fill it with Natural[0,9] , keep only valid board
         nextbd : function (bd) {
          // debugger
          return this.keeponlyvalid(this.fillwithvals(bd, this.findblank(bd)))
        },

        //board(array) -> pos
        //interp.produce the position of the first blank square
        //Assum: the board has at least one blank square
         findblank : function (bd) {
          // debugger
          for (var i = 0; i < bd.length; i++) {
            if (bd[i] === false) {
              return i;
            }
          }
        },

        //board(array) pos -> Arrayofboard
        //interp.  interp. fill it with Natural[0,9]
        fillwithvals : function (bd, pos) {
          // debugger
          var arr = [];
          for (var i = 0; i < this.allvals.length; i++) {
            var store = bd.slice(0)
            store.splice(pos, 1 , this.allvals[i])
            arr.push(store);
          }
          return arr;
        },

        //Arrayofboard -> Arrayofboard
        //interp.produce Array containing only valid board
        keeponlyvalid : function (arrb) {
          // debugger
          var arr = [];
          for (var i = 0; i < arrb.length; i++) {
            if (this.isvalid(arrb[i])){
              arr.push(arrb[i])
            }
          } if (arr.length === 0) {
            return false;
          } else {
            return arr;
          }
        },

        //board -> boolean (helper)
        //interp.produce Array containing only valid board
        isvalid : function (bd) {
          // debugger
          if (this.isrowvalid(bd) && this.iscolvalid(bd) && this.isboxvalid(bd)) {
            return true;
          } else {
            return false;
          }
        },

        //  (invoke)    -> boolean (helper)
        //interp. return true if there are no duplicate values in rows
        isrowvalid : function  (bd) {
          // debugger
          return this.eachvalid( bd, this.row)
        },

        //  (invoke)    -> boolean (helper)
        //interp. return true if there are no duplicate values in cols
        iscolvalid : function (bd) {
          // debugger
          return this.eachvalid( bd, this.col)
        },

        //  (invoke)    -> boolean (helper)
        //interp. return true if there are no duplicate values in boxs
        isboxvalid : function (bd) {
          // debugger
          return this.eachvalid( bd, this.box)
        },

        //  board, rows||cols|| boxs    -> boolean (helper)
        //interp. return true if there is no duplicate values in  a horizontal , vertical, or diagonal
        eachvalid : function ( bd, casevalid) {
          //  debugger;
            //creat array of number
            for (key in casevalid) {
              var arr = [];
              for (var j = 0; j < casevalid[key].length; j++) {
                if (bd[casevalid[key][j]] !== false) {
                  arr.push(bd[casevalid[key][j]]);
                }
              }//check if there is duplicate in the array
              for (var i = 0; i < arr.length; i++) {
                for (var j = i; j < arr.length; j++) {
                  if (i != j && arr[i] === arr[j]) {
                    return false
                  }
                }
              }
            } return true;
          }
        }



// the actual object is created here, allowing us to 'new' an object without calling 'new'
    SBroad.init = function(id) {



        this.id            = id;

        // Val is Natural[1, 9]
        this.allvals       = [1, 2, 3, 4, 5, 6, 7, 8, 9];


        this.currentbd   = [ false, false, false, false, false, false, false, false, false,
                             false, false, false, false, false, false, false, false, false,
                             false, false, false, false, false, false, false, false, false,
                             false, false, false, false, false, false, false, false, false,
                             false, false, false, false, false, false, false, false, false,
                             false, false, false, false, false, false, false, false, false,
                             false, false, false, false, false, false, false, false, false,
                             false, false, false, false, false, false, false, false, false,
                             false, false, false, false, false, false, false, false, false];

       //row is object of array
       //interp. positions of all the columns
        this.row         = {
           R1 :  [ 0, 1, 2, 3, 4, 5, 6, 7, 8],
           R2 :  [ 9,10,11,12,13,14,15,16,17],
           R3 :  [18,19,20,21,22,23,24,25,26],
           R4 :  [27,28,29,30,31,32,33,34,35],
           R5 :  [36,37,38,39,40,41,42,43,44],
           R6 :  [45,46,47,48,49,50,51,52,53],
           R7 :  [54,55,56,57,58,59,60,61,62],
           R8 :  [63,64,65,66,67,68,69,70,71],
           R9 :  [72,73,74,75,76,77,78,79,80]
          };

            //col is object of array
            //interp. positions of all the columns
          this.col         = {
            C1 :  [ 0, 9,18,27,36,45,54,63,72],
            C2 :  [ 1,10,19,28,37,46,55,64,73],
            C3 :  [ 2,11,20,29,38,47,56,65,74],
            C4 :  [ 3,12,21,30,39,48,57,66,75],
            C5 :  [ 4,13,22,31,40,49,58,67,76],
            C6 :  [ 5,14,23,32,41,50,59,68,77],
            C7 :  [ 6,15,24,33,42,51,60,69,78],
            C8 :  [ 7,16,25,34,43,52,61,70,79],
            C9 :  [ 8,17,26,35,44,53,62,71,80]
          };

           //box is object of array
           //interp. positions of all the box
          this.box       = {
            B1 :  [ 0, 1, 2, 9,10,11,18,19,20],
            B2 :  [ 3, 4, 5,12,13,14,21,22,23],
            B3 :  [ 6, 7, 8,15,16,17,24,25,26],
            B4 :  [27,28,29,36,37,38,45,46,47],
            B5 :  [30,31,32,39,40,41,48,49,50],
            B6 :  [33,34,35,42,43,44,51,52,53],
            B7 :  [54,55,56,63,64,65,72,73,74],
            B8 :  [57,58,59,66,67,68,75,76,77],
            B9 :  [60,61,62,69,70,71,78,79,80]
          };
        // ###########################
        //Functions definitions
        // ###########################
    }

    // trick from jQuery, so we don't have to use the 'new' keyword
    SBroad.init.prototype = SBroad.prototype;

    // attach our Broad to the global object, and provide a shortcut '$G'
    global.SBroad = global.$B = SBroad;


}(window, jQuery));

//Helpers for easily readable in console

Array.prototype.chunk = function ( n ) {

    if ( !this.length ) {
        return [];
    }
    return this.slice( 0, n ) + '\n' + this.slice(n).chunk(n) ;
};

var displaylist = function(arr) {
  // debugger
  store=''
  for (var i = 0; i < arr.length; i++) {
    store += (arr[i].chunk(9)+'\n'+'____'+'\n');
  }
  return store
}

// var currentbd   = [ false, false, false, false, false, false, false, false, false,
//                      false, false, false, false, false, false, false, false, false,
//                      false, false, false, false, false, false, false, false, false,
//                      false, false, false, false, false, false, false, false, false,
//                      false, false, false, false, false, false, false, false, false,
//                      false, false, false, false, false, false, false, false, false,
//                      false, false, false, false, false, false, false, false, false,
//                      false, false, false, false, false, false, false, false, false,
//                      false, false, false, false, false, false, false, false, false];


var BD0  = [ false, false, false, false, false, false, false, false, false,
             false, false, false, false, false, false, false, false, false,
             false, false, false, false, false, false, false, false, false,
             false, false, false, false, false, false, false, false, false,
             false, false, false, false, false, false, false, false, false,
             false, false, false, false, false, false, false, false, false,
             false, false, false, false, false, false, false, false, false,
             false, false, false, false, false, false, false, false, false,
             false, false, false, false, false, false, false, false, false];

var BD1 = [     2,     7,     4, false,     9,     1, false, false,     5,
                1, false, false,     5, false, false, false,     9, false,
                6, false, false, false, false,     3,     2,     8, false,
            false, false,     1,     9, false, false, false, false,     8,
            false, false,     5,     1, false, false,     6, false, false,
                7, false, false, false,     8, false, false, false,     3,
                4, false,     2, false, false, false, false, false,     9,
            false, false, false, false, false, false, false,     7, false,
                8, false, false,     3,     4,     9, false, false, false];//easy

var BS1 = [     2,     7,     4,     8,     9,     1,     3,     6,     5,
                1,     3,     8,     5,     2,     6,     4,     9,     7,
                6,     5,     9,     4,     7,     3,     2,     8,     1,
                3,     2,     1,     9,     6,     4,     7,     5,     8,
                9,     8,     5,     1,     3,     7,     6,     4,     2,
                7,     4,     6,     2,     8,     5,     9,     1,     3,
                4,     6,     2,     7,     5,     8,     1,     3,     9,
                5,     9,     3,     6,     1,     2,     8,     7,     4,
                8,     1,     7,     3,     4,     9,     5,     2,     6];//solution to BD1

var BD2 = [     5, false, false, false, false,     4, false,     7, false,
            false,     1, false, false,     5, false,     6, false, false,
            false, false,     4,     9, false, false, false, false, false,
            false,     9, false, false, false,     7,     5, false, false,
                1,     8, false,     2, false, false, false, false, false,
            false, false, false, false, false,     6, false, false, false,
            false, false,     3, false, false, false, false, false,     8,
            false,     6, false, false,     8, false, false, false,     9,
            false, false,     8, false,     7, false, false,     3,     1];//hard

var BS2 = [     5,     3,     9,     1,     6,     4,     8,     7,     2,
                8,     1,     2,     7,     5,     3,     6,     9,     4,
                6,     7,     4,     9,     2,     8,     3,     1,     5,
                2,     9,     6,     4,     1,     7,     5,     8,     3,
                1,     8,     7,     2,     3,     5,     9,     4,     6,
                3,     4,     5,     8,     9,     6,     1,     2,     7,
                9,     2,     3,     5,     4,     1,     7,     6,     8,
                7,     6,     1,     3,     8,     2,     4,     5,     9,
                4,     5,     8,     6,     7,     9,     2,     3,     1];//solution to BD2

var BD3 =  [     1,     2,     3,     4,     5,     6,     7,     8, false,
             false, false, false, false, false, false, false, false,     2,
             false, false, false, false, false, false, false, false,     3,
             false, false, false, false, false, false, false, false,     4,
             false, false, false, false, false, false, false, false,     5,
             false, false, false, false, false, false, false, false,     6,
             false, false, false, false, false, false, false, false,     7,
             false, false, false, false, false, false, false, false,     8,
             false, false, false, false, false, false, false, false,     9];//no solution


var b1 = $B('test')
// console.log("Test for resetboard()"+'\n'+'___________')
// resetboard(current)
// console.log(current.chunk(9))
//##########################################

// console.log("Test for fillsquare()"+'\n'+'___________')
// console.log('__1__'+'\n'+BD1.chunk(9)+'\n'+fillsquare(0,1).chunk(9)+'\n' +" should equal to "+ '\n'+[1].concat(BD1.slice(1, BD0.length)).chunk(9))
//##########################################

// console.log("Test for fillallsquare()"+'\n'+'___________')
// console.log('__1__'+'\n'+BD1.chunk(9)+'\n'+b1.fillallsquare(BD1).currentbd.chunk(9)+'\n' +" should equal to "+ '\n'+BD1.chunk(9))
// ##########################################


// console.log("Test for removesquare()"+'\n'+'___________')
// console.log('__1__'+'\n'+BD1.chunk(9)+'\n'+b1.removesquare(0).chunk(9)+'\n' +" should equal to "+ '\n'+[false].concat(BD1.slice(1, BD0.length)).chunk(9))
//##########################################

// console.log("Test for Question()"+'\n'+'___________')
// var current = BD1;
// console.log('__1__'+'\n'+BD1.chunk(9)+'\n'+b1.current.chunk(9)+'\n' +" should equal to "+ '\n'+BD1.chunk(9));
//##########################################

b1.currentbd = BD1
console.log("Test for Board.solve()"+'\n'+'___________');
console.log('__1__'+'\n'+BD1.chunk(9)+'\n'+b1.solve().chunk(9)+'\n' +" should equal to "+'\n' +BS1.chunk(9)+'\n'+'__1__');
// ##########################################

// console.log("Test for issolve(current)"+'\n'+'___________');
// console.log('1 '+current.chunk(9)+'\n'+b1.issolve(current)+'\n' +" should equal to "+ '\n'+false+'\n'+'__1__');
//##########################################

// console.log("Test for nextbd()"+'\n'+'___________');
// console.log('__1__'+'\n'+[1].concat(BD0.slice(1, BD0.length)).chunk(9)+'\n'+displaylist(b1.nextbd([1].concat(BD0.slice(1, BD1.length))))+'\n' +" should equal to "+'\n' +   [1].concat(1,BD0.slice(2, BD0.length)).chunk(9)+'  ' +
//                                                                                                                                                                          [1].concat(2,BD0.slice(2, BD0.length)).chunk(9)+'  ' +
//                                                                                                                                                                          [1].concat(3,BD0.slice(2, BD0.length)).chunk(9)+'  ' +
//                                                                                                                                                                          [1].concat(4,BD0.slice(2, BD0.length)).chunk(9)+'  ' +
//                                                                                                                                                                          [1].concat(5,BD0.slice(2, BD0.length)).chunk(9)+'  ' +
//                                                                                                                                                                          [1].concat(6,BD0.slice(2, BD0.length)).chunk(9)+'  ' +
//                                                                                                                                                                          [1].concat(7,BD0.slice(2, BD0.length)).chunk(9)+'  ' +
//                                                                                                                                                                          [1].concat(8,BD0.slice(2, BD0.length)).chunk(9)+'  ' +
//                                                                                                                                                                          [1].concat(9,BD0.slice(2, BD0.length)).chunk(9)+'\n'+'__1__')
//##########################################

// console.log("Test for findblank()"+'\n'+'___________');
// console.log('__1__'+'\n'+BD2.chunk(9)+'\n'+b1.findblank(BD2)+'\n' +" should equal to "+ '\n'+1+'\n'+'__1__');
// console.log("Test for fillwithvals()"+'\n'+'___________');
// console.log('__1__'+'\n'+BD0.chunk(9)+'and '+0+'\n'+displaylist(b1.fillwithvals(BD0,0))+'\n' +" should equal to "+ '\n'+[1].concat(BD0.slice(1, BD0.length)).chunk(9)+'  ' +
//                                                                                                                      [2].concat(BD0.slice(1, BD0.length)).chunk(9)+'  ' +
//                                                                                                                      [3].concat(BD0.slice(1, BD0.length)).chunk(9)+'  ' +
//                                                                                                                      [4].concat(BD0.slice(1, BD0.length)).chunk(9)+'  ' +
//                                                                                                                      [5].concat(BD0.slice(1, BD0.length)).chunk(9)+'  ' +
//                                                                                                                      [6].concat(BD0.slice(1, BD0.length)).chunk(9)+'  ' +
//                                                                                                                      [7].concat(BD0.slice(1, BD0.length)).chunk(9)+'  ' +
//                                                                                                                      [8].concat(BD0.slice(1, BD0.length)).chunk(9)+'  ' +
//                                                                                                                      [9].concat(BD0.slice(1, BD0.length)).chunk(9)+'\n'+'__1__')
//##########################################

//
// console.log("Test for keeponlyvalid()"+'\n'+'___________');
// console.log('__1__'+'\n'+[[1].concat(1,BD0.slice(2, BD0.length)).chunk(9)]+'\n'+'__1__');
// console.log(b1.keeponlyvalid([[1].concat(1,BD0.slice(2, BD0.length))])+'\n' +" should equal to "+ '\n'+[]);
//##########################################

//
// console.log("Test for isvalid()"+'\n'+'___________');
// console.log('1 '+BD1.chunk(9)+'\n'+b1.isvalid(BD1)+'\n' +" should equal to "+ '\n'+true);
//##########################################

// console.log("Test for isrowvalid()"+'\n'+'___________');
// console.log('1 '+BD1.chunk(9)+'\n'+b1.isrowvalid(BD1)+'\n' +" should equal to "+ '\n'+true);
//##########################################

// console.log("Test for iscolvalid()"+'\n'+'___________');
// console.log('1 '+BD1.chunk(9)+'\n'+b1.iscolvalid(BD1)+'\n' +" should equal to "+ '\n'+true);
//##########################################

// console.log("Test for isboxvalid()"+'\n'+'___________');
// console.log('1 '+BD1.chunk(9)+'\n'+b1.isboxvalid(BD1)+'\n' +" should equal to "+ '\n'+true);
//##########################################

// console.log("Test for eachvalid())"+'\n'+'___________');
// console.log('1 '+BD1.chunk(9)+'\n'+b1.eachvalid(BD1, row)+'\n' +" should equal to "+ '\n'+true);
//##########################################
