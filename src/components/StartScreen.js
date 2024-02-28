import { useQuiz } from "../contexts/QuizContext";

function StartScreen(){
     const {numQuestions, infoPrevScore, setPrevScore, handleDispatch} = useQuiz();
    return (
     <div className="start"> 
          <h2>Welcome to The React Quiz!</h2>
          {infoPrevScore && <p className="result">{infoPrevScore}</p>}
          <h2>{numQuestions} question to your test mastery</h2>
          <div className="btn-container gap-05"> 
           <button className = "btn btn-level" onClick = {() => handleDispatch("setQuestions","beginner")}>Beginner</button>
           <button className = "btn btn-level" onClick={() => handleDispatch("setQuestions", "intermidiate")}>Intermidiate</button>
           <button className = "btn btn-level" onClick = {() => handleDispatch("setQuestions", "advanced")}>Advanced</button>
           <button className = "btn btn-level" onClick = {() => handleDispatch("setQuestions", "senior")}>Full Quiz</button>
          </div>
          <div className = "btn-container gap-4">
               {infoPrevScore && <button className="btn btn-ui" onClick = {() => setPrevScore("")}>Reset Results</button>}
               <button className = "btn btn-ui" onClick = {() => {handleDispatch("active")}}>Let's start</button>
          </div>
     </div>
    )
 }
 
 export default StartScreen;