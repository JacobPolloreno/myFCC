/*jshint esnext:true*/

(function() {

  // DOM Elements
  let $board = document.getElementById('board');
  let $choice = [];
  let $columns = $board.getElementsByClassName('boardCol');
  let $rows = $board.getElementsByClassName('boardRow');
  let $status = document.getElementById('status');

  class Game {
    constructor(playerPiece, opponentPiece) {
      this._board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
      ];
      this._playerPiece = playerPiece || '';
      this._opponentPiece = opponentPiece || '';
    }

    set board(newBoard) {
      this._board = newBoard;
    }

    get board() {
      return this._board;
    }

    set playerPiece(newPiece) {
      this._playerPiece = newPiece;
    }

    get playerPiece() {
      return this._playerPiece;
    }

    set opponentPiece(newPiece) {
      this._opponentPiece = newPiece;
    }

    get opponentPiece() {
      return this._opponentPiece;
    }

    getAvailableMoves() {
      const possibleMoves = []; // array of possible moves
      this._board.forEach((row, rowIndex) => {
        row.forEach((item, colIndex) => {
          if (item === '') possibleMoves.push([rowIndex, colIndex]);
        });
      });
      return possibleMoves;
    }

    makeMove(x, y, player) {

      // Check if move is valid
      if (this._board[x][y] !== '')
        return false;

      // Set element on board
      this._board[x][y] = player;
      return true;
    }

    isOver() {
      return this.getAvailableMoves().length === 0;
    }

    playerIsWinner(player) {
      const $board = this._board;

      // check rows and columns
      for (let i = 0; i < 3; i++) {
        if (checkRow(i) || checkColumn(i))
          return true;
      }

      // check diagonals
      const topLeftBottomRight = [
        $board[0][0],
        $board[1][1],
        $board[2][2],
      ]; // top left to bottom right
      const topRightBottomLeft = [
        $board[0][2],
        $board[1][1],
        $board[2][0],
      ]; // top right to bottom left

      return topLeftBottomRight.every(function(el) {
        return el === player;
      }) || topRightBottomLeft.every(function(el) {
        return el === player;
      });

      function checkRow(row) {
        return $board[row].every(function(el) {
          return el === player;
        });
      }

      function checkColumn(col) {
        const tempCol = [
          $board[0][col],
          $board[1][col],
          $board[2][col],
        ];

        return tempCol.every(function(el) {
          return el === player;
        });

      }
    }

    getPossibleGameState(move, player) {
      const possibleGame = new Game(this._playerPiece, this._opponentPiece);
      const clonedBoard = arrayClone(this._board);
      possibleGame.board = clonedBoard;
      possibleGame.makeMove(move[0], move[1], player);

      return possibleGame;

      function arrayClone(arr) {
        if (Array.isArray(arr)) {
          const copy = arr.slice(0);
          for (let i = 0; i < copy.length; i++) {
            copy[i] = arrayClone(copy[i]);
          }

          return copy;
        } else if (typeof arr === 'object') {
          throw 'Cannot clone array containing an object!';
        } else {
          return arr;
        }

      }

    }

    static getEnemy(player) {
      return player === 'X' ? 'O' : 'X';
    }

    checkBoard() {
      // Check if there's a winner
      // if yes or tie, change status and remove grid bindings
      if (this.playerIsWinner(this._playerPiece)) {
        $status.innerHTML = `Winner is: ${this._playerPiece}`;
        $status.className += ' alert-success';
      } else if (this.playerIsWinner(this._opponentPiece)) {
        $status.innerHTML = `Winner is: ${this._opponentPiece}`;
        $status.className += ' alert-danger';
      } else if (this.isOver()) {
        $status.innerHTML = 'Tied game.';
        $status.className += ' alert-info';
      } else
        return true; // this not over

      // this over remove bindings to prevent further board input
      for (let col = 0; col < $columns.length; col++) {
        $columns[col].removeEventListener('click', function() {
          if (this._playerPiece !== '') {
            const coords = this.id.match(/^col_(\d{1})_(\d{1})/).slice(1); // grab the clicked cell
            if (this.makeMove(+coords[0], +coords[1], this._playerPiece)) { // make move
              document.getElementById(this.id).innerHTML = this._playerPiece; // update board
              if (this.checkBoard()) { // check if last move resulted in win
                this.minimax(2, this, this._opponentPiece); // get opponent choice
                this.makeMove($choice[0], $choice[1], this._opponentPiece); // make move
                document.getElementById('col_' + $choice[0] + '_' + $choice[1]).innerHTML = this._opponentPiece;
                this.checkBoard(); // check if last move resulted in win
              }
            }
          }
        });
      }

      return false; // Game over
    }

    score(board, playerPiece, opponentPiece) {
      let points = 0;

      const scoreRow = (row1, col1, row2, col2, row3, col3) => {
        let score = 0;

        // First cell
        if (board[row1][col1] === playerPiece)
          score = 1;
        else if (board[row1][col1] === opponentPiece)
          score = -1;

        // Second Cell
        if (board[row2][col2] === playerPiece) {
          if (score === 1) // cell is player's
            score = 10;
          else if (score === -1) // cell is opponent's
            return 0;
          else // cell is empty
            score = 1;
        } else if (board[row2][col2] === opponentPiece) {
          if (score === -1) // cell is opponent's
            score = -10;
          else if (score === 1) // cell is player's
            return 0;
          else // cell is empty
            score = -1;
        }

        // Third Cell
        if (board[row3][col3] === playerPiece) {
          if (score > 0) // 1st cell and/or 2nd cell are player's
            score *= 10;
          else if (score < 0) // 1st cell and/or 2nd cell are opponent's
            return 0;
          else // 1st cell and/or 2nd cell are empty opponent 's
            score = 1;
        } else if (board[row3][col3] === opponentPiece) {
          if (score < 0) // 1st cell and/or 2nd cell are opponent's
            score *= 10;
          else if (score > 1) // 1st cell and/or 2nd cell are player's
            return 0;
          else // 1st cell and/or 2nd cell are empty
            score = 1;
        }

        return score;
      };

      points += scoreRow(0, 0, 0, 1, 0, 2); // row 0
      points += scoreRow(1, 0, 1, 1, 1, 2); // row 1
      points += scoreRow(2, 0, 2, 1, 2, 2); // row 2
      points += scoreRow(0, 0, 1, 0, 2, 0); // col 0
      points += scoreRow(0, 1, 1, 1, 2, 1); // col 1
      points += scoreRow(0, 2, 1, 2, 2, 2); // col 2
      points += scoreRow(0, 0, 1, 1, 2, 2); // diagonal
      points += scoreRow(0, 2, 1, 1, 2, 0); // alternate diagonal

      return points;
    }

    minimax(level, game, player) {
      if (game.isOver() || level === 0)
        return game.score(game.board, game.playerPiece, game.opponentPiece);

      const scores = []; // an array of scores
      const moves = []; // an array of moves

      // populate the scores array, recursing when needed
      game.getAvailableMoves().forEach(function(move) {
        const possibleGame = game.getPossibleGameState(move, player); // Test move;
        scores.push(game.minimax(level - 1, possibleGame, Game.getEnemy(player))); // min or max
        moves.push(move);
      });

      // min or max calculate
      // maximize when it's the player's turn and minimize on AI's turn
      if (player === this._playerPiece) {
        const maxScoreIndex = scores.indexOf(Math.max(...scores));
        $choice = moves[maxScoreIndex]; // store best move in choice variable for later
        return scores[maxScoreIndex];
      } else {
        const minScoreIndex = scores.indexOf(Math.min(...scores));
        $choice = moves[minScoreIndex]; // store best move in choice variable for later
        return scores[minScoreIndex];
      }

    }
  }

  function renderBoard() {

    // initiliaze container square
    $board.style.height = (document.documentElement.clientWidth / 3) + 'px';
    $board.style.width = $board.style.height;
    $board.style.position = 'absolute';
    $board.style.top = (document.documentElement.clientHeight - $board.offsetHeight) / 2 + 'px';
    $board.style.left = (document.documentElement.clientWidth - $board.offsetWidth) / 2 + 'px';

    const rowHeight = (document.documentElement.clientWidth / 9) + 'px';

    for (let row = 0; row < $rows.length; row++) {
      $rows[row].style.height = rowHeight;
    }

    for (let col = 0; col < $columns.length; col++) {
      $columns[col].style.color = '#fff';
      $columns[col].style.height = rowHeight;
      $columns[col].style.lineHeight = rowHeight;
      $columns[col].style.fontSize = rowHeight;
    }
  }

  renderBoard(); //initiliaze board

  // Assign event handlers for window resize
  window.addEventListener('resize', renderBoard);

  //initiliaze game
  const game = new Game();

  // Show modal to ask user which side to choose
  // only closes when side is chosen
  const $modal = new Modal(document.getElementById('setupModal'), {
    backdrop: 'static',
    show: true,
    keyboard: false,
  });

  $modal.open();

  for (let col = 0; col < $columns.length; col++) {
    $columns[col].addEventListener('click', function() {
      if (game.playerPiece !== '') {
        const coords = this.id.match(/^col_(\d{1})_(\d{1})/).slice(1); // grab the clicked cell
        if (game.makeMove(+coords[0], +coords[1], game.playerPiece)) { // make move
          document.getElementById(this.id).innerHTML = game.playerPiece; // update board
          if (game.checkBoard()) { // check if last move resulted in win
            game.minimax(2, game, game.opponentPiece); // get opponent choice
            game.makeMove($choice[0], $choice[1], game.opponentPiece); // make move
            document.getElementById('col_' + $choice[0] + '_' + $choice[1]).innerHTML = game.opponentPiece;
            game.checkBoard(); // check if last move resulted in win
          }
        }
      }
    });
  }

  document.getElementById('choiceX').addEventListener('click', function() {
    game.playerPiece = 'X';
    game.opponentPiece = 'O';
    $modal.close();
  });

  document.getElementById('choiceO').addEventListener('click', function() {
    game.playerPiece = 'O';
    game.opponentPiece = 'X';
    $modal.close();

    // Opponent goes first, random corner assignment
    const corners = [
      [0, 0],
      [0, 2],
      [2, 0],
      [2, 2],
    ];
    const randomCorner = corners[Math.floor(Math.random() * corners.length)];
    game.makeMove(randomCorner[0], randomCorner[1], game.opponentPiece);
    document.getElementById('col_' + randomCorner[0] + '_' + randomCorner[1]).innerHTML = game.opponentPiece;
  });

  document.getElementById('retry').addEventListener('click', function() {
    location.href = location.href;
  });

})();