
// MVP
// DONE: User can view randomized problem equation
// DONE: User can click number buttons to enter answer
// DONE: User can click submit button to submit answer
// DONE: User can click clear button to clear answer box
// DONE: User can view correct answer after submit
// DONE: User has time to view result before next problem is displayed
// EXTRA FEATURES
// DONE: User can receive equations that use +,-,*,/ operators (possible results must be integers)
// TODO: User can flip sign of entry
// TODO: User can skip questions that are too difficult without answering
// TODO: User can see score for the game session
// TODO: User can use keyboard inputs instead of on-screen buttons
// TODO: User gets audo feedback for correct/incorrect answers
// TODO: Animated UI elements

let App = React.createClass({
  getInitialState() {
    return {
      nums: [],
      equation: 'the equation',
      answer: 0,
      buttons: '',
      entry: '',
      message: ''
    }
  },

  generateProblem() {
    let { nums, equation, answer } = this.state;
    let operators = ['+','-','x','÷'];
    let randEquation = '';
    let randAnswer = 0;
    let randNums = [];
    for(var i = 0; i < 2; i++){
      randNums.push(Math.floor(Math.random() * 1000));
    }

    this.setState({
      nums: randNums
    })

    switch (operators[Math.floor(Math.random()*operators.length)]) {
      case '+': {
        randEquation = `${randNums[0]} + ${randNums[1]}`
        randAnswer = randNums[0] + randNums[1]
        break;
      }
      case '-': {
        randEquation = `${randNums[0]} - ${randNums[1]}`
        randAnswer = randNums[0] - randNums[1]
        break;
      }
      case 'x': {
        randEquation = `${randNums[0]} x ${randNums[1]}`
        randAnswer = randNums[0] * randNums[1]
        break;
      }
      case '÷': {
        randEquation = `${randNums[0]} ÷ ${randNums[1]}`
        randAnswer = Math.floor(randNums[0] / randNums[1])
        break;
      }
    }

    this.setState({
      equation: randEquation,
      answer: randAnswer
    })
  },

  createButtons () {
    let { buttons } = this.state;


    let buttonGen = Array(10).fill().map((num, i) => {
      let elButton = <button key={i} value={i} onClick={this.enterNum} className='numBtn btn btn-primary'>{i}</button>
      return elButton
    });

    this.setState({
      buttons: buttonGen
    })
  },

  enterNum (e) {
    let { buttons, entry } = this.state;

    this.setState({
      entry: entry + e.target.value
    })
  },

  reset () {
    this.clearField()
    this.generateProblem()
  },

  submitEntry () {
    let { entry, answer, message } = this.state;

    if (entry == answer) {
      this.setState({
        message: 'CORRECT!'
      })
    } else {
      this.setState({
        message: 'The correct answer is ' + answer
      })
    }

    setTimeout(() => {this.reset()}, 2500)
  },

  clearField () {
    let { entry, message } = this.state;

    this.setState({
      entry: '',
      message: ''
    })
  },

  componentWillMount() {
    this.createButtons()
    this.generateProblem()
  },

  render() {

    let { buttons, equation, nums, answer, entry, message } = this.state;

    return (
      <div className='container'>
        <h1 className='text-center'>Math Game</h1>

        <div className='equation text-center'>
          <p>Instruction: Enter answer, round decimals to lowest integer.</p>
          <div className='answer'><h4>{message}</h4></div>
          <h3>
            {equation} =
          </h3>
          <input className='input' type='text' ref='entry' value={entry} disabled/>
        </div>

        <div className='keypad text-center'>
          {buttons}
        </div>
        <div className='row text-center'>
          <button className="clear btn btn-danger" onClick={this.clearField}>clear</button>
          <button className='submit btn btn-success' onClick={this.submitEntry}>submit</button>
        </div>
      </div>

    );
  }
});

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
