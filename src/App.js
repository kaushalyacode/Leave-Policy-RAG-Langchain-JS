import './App.css';
import {useState} from "react";
import {giveQuestion} from "./LeavePolicyManager";

function App() {
  const [question, setQuestion] = useState(undefined);
  const [answer, setAnswer] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const handleQuestionSubmit = (question) => {
    setQuestion(question);
  }

  const handleAskMe = ()=>{
    setIsLoading(true);
    const res = giveQuestion(question);
    res.then(re=>{
      setIsLoading(false);
      setAnswer(re);
    }).catch(err=>{
      setAnswer(err.message);
      setIsLoading(false);
    })
  }

  const handleClear = ()=>{
    setQuestion('');
    setAnswer('');
  }
  return (
    <div className="App">
      <nav className="navbar bg-dark">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1 p-2 text-white">Leave Policy</span>
        </div>
      </nav>
      <div className="container mt-4">
        <div className="App-header panel">
          <div className="row">
            <div className="col-12 mb-3">
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="4"
                value={question}
                disabled={isLoading}
                onChange={(event) => {
                  handleQuestionSubmit(event.target.value);
                }}
                placeholder="Type your leave policy question here..."
              ></textarea>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 mb-3">
              <button className="btn btn-primary" disabled={isLoading} onClick={() => handleAskMe()}>
                Ask Me
              </button>
              &nbsp;
              <button className="btn btn-warning" onClick={handleClear}>
                Clear
              </button>
            </div>
          </div>
          {answer && (
            <div className="mt-3 panel">
              <strong>Answer:</strong>
              <div className="spaced">{answer}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
