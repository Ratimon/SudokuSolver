console.log("loaded");

;(function(global, $) {

function ProblemBoard(){

}

ProblemBoard.prototype.create = function() {
	this.item = $('<div class="problem"></div>');
	return this;
};

function SolutionBoard(){

}

SolutionBoard.prototype.create = function() {
	this.item = $('<div class="solution"></div>');;
	return this;
};

BoardFactory = function(){
		this.types = {};
		this.create = function(type){
			return new this.types[type]().create();
		};

		this.register = function(type, cls){
			if(cls.prototype.create){
					this.types[type] = cls;
			}
		}
};

var BoardGeneratorSingleton = (function(){
  var instance;

  function init(){
    var _stage = $('.main');
    _bf = new BoardFactory();
    _bf.register('problem', ProblemBoard);
    _bf.register('solution', SolutionBoard);


    //prototype
    var allvals       = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    // //row is object of array
    // //interp. positions of all the columns
    // var row = {
    //   R1 :  [ 0, 1, 2, 3, 4, 5, 6, 7, 8],
    //   R2 :  [ 9,10,11,12,13,14,15,16,17],
    //   R3 :  [18,19,20,21,22,23,24,25,26],
    //   R4 :  [27,28,29,30,31,32,33,34,35],
    //   R5 :  [36,37,38,39,40,41,42,43,44],
    //   R6 :  [45,46,47,48,49,50,51,52,53],
    //   R7 :  [54,55,56,57,58,59,60,61,62],
    //   R8 :  [63,64,65,66,67,68,69,70,71],
    //   R9 :  [72,73,74,75,76,77,78,79,80]
    //   };
    //
    // //col is object of array
    // //interp. positions of all the columns
    // var col = {
    //   C1 :  [ 0, 9,18,27,36,45,54,63,72],
    //   C2 :  [ 1,10,19,28,37,46,55,64,73],
    //   C3 :  [ 2,11,20,29,38,47,56,65,74],
    //   C4 :  [ 3,12,21,30,39,48,57,66,75],
    //   C5 :  [ 4,13,22,31,40,49,58,67,76],
    //   C6 :  [ 5,14,23,32,41,50,59,68,77],
    //   C7 :  [ 6,15,24,33,42,51,60,69,78],
    //   C8 :  [ 7,16,25,34,43,52,61,70,79],
    //   C9 :  [ 8,17,26,35,44,53,62,71,80]
    //   };
    //
    //box is object of array
    //interp. positions of all the box
    var box = {
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

    function _boardstyle(board, left, top, width, height){
      board.css('left',left);
      board.css('top',top);
      board.css('width',width);
      board.css('height',height);

      board.css({'display':'block', 'position':'absolute', 'background-color':'green'});

    }

    function create(type, left, top, width, height){
      var board  = _bf.create(type).item;
      _boardstyle(board, left, top, width, height);
      return board;
    }



    function add(board){
      // debugger
      var cls = board.attr("class")
      _stage.append(board);

      for (key in box) {
        var boxe    = $('<div class="box" id="b0" ></div>')
        board.append(boxe);
        $('.'+cls+' '+'#b0').attr( "id", key );
        for (var j = 0; j < box[key].length; j++) {
          var square = $('<div class="square" id="s0" ></div>')
          $('.'+cls+' '+"div[id="+key+"]").append(square)
          $('.'+cls+' '+'#s0').attr( "id", box[key][j]);
        }
      }
    }

    return {
      create : create,
      add : add
    };

  }

  return {
    getInstance: function(){
      if(!instance){
        instance = init();
      }

      return instance;
    }
  }

})();





	$(document).ready(function() {

		$('.main').click(function(mouseEvent) {
			var bg = BoardGeneratorSingleton.getInstance();
			var board = bg.create('problem',mouseEvent.pageX-25, mouseEvent.pageY-25, '300px', '300px');

			bg.add(board);

		});

    $('.main').mouseleave(function() {
      var bg = BoardGeneratorSingleton.getInstance();
      var board = bg.create('solution','500px', '100px', '300px', '300px');

      bg.add(board);

    });


	});

}(window, jQuery));
