console.log("loaded");


;(function(global, $) {


// function clone(src,out){
// 	debugger;
// 	for(var attr in src.prototype){
// 		out.prototype[attr] = src.prototype[attr];
// 	}
// }


function Board(arr){
	// debugger;
	this.item  = $('<div class="board"></div>');
	this.solver = new $B('test')//refer to algorithms
	for (key in this.solver.box) {
		var boxe    = $('<div class="box" id="'+key+'" ></div>')
		for (var j = 0; j < this.solver.box[key].length; j++) {
			var square = $('<div class="square" id="'+this.solver.box[key][j]+'" ></div>')
			square.appendTo(boxe)
		} boxe.appendTo(this.item)
	}
	this.fillproblem(arr);
}


Board.prototype.fillproblem = function(arr) {
	this.solver.fillallsquare(arr);
	for (var i = 0; i < arr.length; i++) {
		if (arr[i] !== false) {
			this.item.find("div[id="+i+"]").text(arr[i])
		} else {
			this.item.find("div[id="+i+"]").text("")
		}
	}
};


Board.prototype.style = function(left, top, width, height){
	// this.item.css('background', clr)
	this.item.css('left',left);
	this.item.css('top',top);
	this.item.css('width',width);
	this.item.css('height',height);

	this.item.css({'display':'block', 'position':'absolute', 'background-color':'green'});
}


Board.prototype.get = function() {

	return this.item;
};


function ProblemBoardBuilder(arr){
	// debugger;
  this.item = new Board(arr)
	this.init();
}


ProblemBoardBuilder.prototype.init = function() {

};


ProblemBoardBuilder.prototype.get = function() {
	// debugger;
	return this.item;
};

// clone(Board, SolutionBoardBuilder);

function SolutionBoardBuilder(arr){
	// debugger
	this.item = new Board(arr)
	this.init();
	this.fillsolve()
}


SolutionBoardBuilder.prototype.init = function() {

};


SolutionBoardBuilder.prototype.fillsolve = function(){
	// debugger;
	var boardnow = this.item.solver.solve()
	this.item.solver.fillallsquare(boardnow)
	for (var i = 0; i < boardnow.length; i++) {
		if (boardnow !== false) {
			this.item.item.find("div[id="+i+"]").text(boardnow[i]).css('color','white')
		} else {
			alert('no solution')
		}
	}
}


SolutionBoardBuilder.prototype.get = function() {
	// debugger;
	return this.item;
};


BoardFactory = function(arr){
	// debugger
		this.types = {};
		this.create = function(type){
			return new this.types[type](arr).get();
		};

		this.register = function(type, cls){
			if(cls.prototype.init && cls.prototype.get){
					this.types[type] = cls;
			}
		}
};


var BoardGeneratorSingleton = (function(){
  var instance;

	var BD1 = [     2,     7,     4, false,     9,     1, false, false,     5,
									1, false, false,     5, false, false, false,     9, false,
									6, false, false, false, false,     3,     2,     8, false,
							false, false,     1,     9, false, false, false, false,     8,
							false, false,     5,     1, false, false,     6, false, false,
									7, false, false, false,     8, false, false, false,     3,
									4, false,     2, false, false, false, false, false,     9,
							false, false, false, false, false, false, false,     7, false,
									8, false, false,     3,     4,     9, false, false, false]

	var BD2 = [     5, false, false, false, false,     4, false,     7, false,
							false,     1, false, false,     5, false,     6, false, false,
							false, false,     4,     9, false, false, false, false, false,
							false,     9, false, false, false,     7,     5, false, false,
									1,     8, false,     2, false, false, false, false, false,
							false, false, false, false, false,     6, false, false, false,
							false, false,     3, false, false, false, false, false,     8,
							false,     6, false, false,     8, false, false, false,     9,
							false, false,     8, false,     7, false, false,     3,     1]

  function init(){
		// debugger;
    var _stage = $('.main');
    var _bf = new BoardFactory(BD2);
		// var solver = new $B('test')//refer to algorithm
    _bf.register('problem', ProblemBoardBuilder);
    _bf.register('solution', SolutionBoardBuilder);


    function create(type ,arr , left, top, width, height){
			// debugger;
      var board  = _bf.create(type);
      board.style(left, top, width, height);
      return board;
    }


    function add(board){
      _stage.append(board.get());

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
			var board = bg.create('problem', BD2, mouseEvent.pageX-25, mouseEvent.pageY-25, '300px', '300px');

			bg.add(board);

		});

    document.addEventListener("keydown", function(event) {
			if (event.which == '32') {
				var bg = BoardGeneratorSingleton.getInstance();
				var board = bg.create('solution', BD2, '500px', '100px', '300px', '300px');

				bg.add(board);
			}
    });

	});

  $(document).ready(function() {
    $(".main").draggable()
  });

}(window, jQuery));
