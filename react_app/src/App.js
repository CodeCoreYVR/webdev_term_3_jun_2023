import { Component } from 'react';
import './App.css';
import CurrentDateTime from './components/CurrentDateTime';
// import QuestionShowPage from './components/QuestionShowPage';
// import QuestionIndexPage from './components/QuestionIndexPage';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      clocksCount: [1, 2] // array for something
    }
  }
  render(){
    return(
      <div>
        {
          this.state.clocksCount.map((c, i) => {
            return (<CurrentDateTime key={i} shouldShowTime={true}/>)
          })
        }
      </div>
    )
  }
}

export default App;
