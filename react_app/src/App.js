import './App.css';
import QuestionShowPage from './components/QuestionShowPage';
import QuestionIndexPage from './components/QuestionIndexPage';

function App() {
  return (
    <div className="container">
      <QuestionIndexPage/>
      <QuestionShowPage/>
    </div>
  );
}

export default App;
