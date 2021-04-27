import CreateQuiz from './components/CreateQuiz/CreateQuiz';
import QuizPage from './components/QuizPage/QuizPage';
import Login from './components/Login/Login';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <>
      <Router>
        <Route exact path="/" component={CreateQuiz} />
        <Route path="/quiz/:quizId" component={QuizPage} />
        <Route path="/login" component={Login} />
      </Router>
    </>
  );
}

export default App;
