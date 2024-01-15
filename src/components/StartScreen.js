function StartScreen({numQuestions, dispatch, infoPrevScore, setPrevScore}){
    return (
     <div className="start"> 
          <h2>Welcome to The React Quiz!</h2>
          {infoPrevScore && <p className="result">{infoPrevScore}</p>}
          <h2>{numQuestions} question to your test mastery</h2>
          <div className="btn-container gap-05"> 
           <button className = "btn btn-level" onClick = {() => dispatch({type:"setQuestions", payload:"beginner"})}>Beginner</button>
           <button className = "btn btn-level" onClick={() => dispatch({type:"setQuestions", payload:"intermidiate"})}>Intermidiate</button>
           <button className = "btn btn-level" onClick = {() => dispatch({type:"setQuestions", payload:"advanced"})}>Advanced</button>
           <button className = "btn btn-level" onClick = {() => dispatch({type:"setQuestions", payload:"senior"})}>Full Quiz</button>
          </div>
          <div className = "btn-container gap-4">
               {infoPrevScore && <button className="btn btn-ui" onClick = {() => setPrevScore("")}>Reset Results</button>}
               <button className = "btn btn-ui" onClick = {() => {dispatch({type:"active"})}}>Let's start</button>
          </div>
     </div>
    )
 }
 
 export default StartScreen;