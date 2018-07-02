import React from 'react';
import ReactDOM from 'react-dom';
import Board from './Board.js';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null)
        }
      ],
      stepNumber: 0,
      xIsNext: true,
      start: false,
      cont: 0,
      name1: '',
      name2: ''
    };

    this.changeGame = this.changeGame.bind(this);
    this.handleChange1 = this.handleChange1.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);

    setInterval(() => {
      this.setState({
        cont: this.state.cont + 1
      });
    }, 1000);
  }
  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i] || this.state.cont > 3) {
      return;
    } else {
      this.setState({ cont: 0 });
    }
    squares[i] = this.state.xIsNext
      ? this.state.name1.substring(0, 1).toUpperCase()
      : this.state.name2.substring(0, 1).toUpperCase();
    this.setState({
      history: history.concat([
        {
          squares: squares
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0
    });
  }
  changeGame() {
    if (!this.state.name1 || !this.state.name2) {
      alert('digite o nome dos jogadores');
    } else {
      alert(`${this.state.name1} começará jogando
              você terá apenas três segundos para concluir sua jogada!!!`);
      this.setState({ start: true });
      this.setState({ cont: 0 });
    }
  }
  handleChange1(e) {
    this.setState({ name1: e.target.value });
  }
  handleChange2(e) {
    this.setState({ name2: e.target.value });
  }
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ? 'Go to move #' + move : 'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = `${
        !this.state.xIsNext ? this.state.name1 : this.state.name2
      } ganhou`;
    } else {
      status = `próximo: ${
        this.state.xIsNext ? this.state.name1 : this.state.name2
      }
         ${this.state.cont}`;
      if (this.state.cont > 3) {
        status = `${
          !this.state.xIsNext ? this.state.name1 : this.state.name2
        } ganhou`;
      }
    }
    if (this.state.start == true) {
      return (
        <div className="game">
          <div className="game-board">
            <Board
              squares={current.squares}
              onClick={i => this.handleClick(i)}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <h1>jogador 1</h1>
          <input
            type="text"
            id="input1"
            value={this.state.value}
            onChange={this.handleChange1}
          />
          <h1>jogador 2</h1>
          <input
            type="text"
            id="input2"
            value={this.state.value}
            onChange={this.handleChange2}
          />
          <br />
          <br />
          <button type="submit" onClick={this.changeGame}>
            JOGAR
          </button>
        </div>
      );
    }
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
export default Game;
