
// MVP
// DONE: User can view randomized problem equation
// TODO: User can click number buttons to enter answer
// TODO: User can click submit button to submit answer
// TODO: User can click clear button to clear answer box
// TODO: User can view correct answer if answered incorrectly
// TODO: User has time to view result before next problem is displayed
// EXTRA FEATURES
// TODO: User can receive equations that use +,-,*,/ operators (possible results must be integers)
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
      entry: ''
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

  submitEntry () {
    let { entry } = this.state;
  },

  componentWillMount() {
    this.createButtons()
    this.generateProblem()
  },

  render() {

    let { buttons, equation, nums, answer, entry } = this.state;

    return (
      <div className='container'>
        <h1 className='text-center'>Math Game</h1>

        <div className='equation text-center'>
          <h3>
            {equation} =
          </h3>
          <input className='input' type='text' ref='entry' value={entry} disabled/>
        </div>

        <div className='keypad text-center'>
          {buttons}
        </div>
        <div className='row text-center'>
          <div className='answer'></div>
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
