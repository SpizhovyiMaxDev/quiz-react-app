function StartScreen({numQuestions, dispatch, infoPrevScore, setPrevScore}){
    return (
     <div className="start"> 
          <h2>Welcome to The React Quiz!</h2>
          {infoPrevScore && <p className="result">{infoPrevScore}</p>}
          <h2>{numQuestions} question to your test mastery</h2>
          <div className = "btn-container">
               {infoPrevScore && <button className="btn btn-ui" onClick = {() => setPrevScore("")}>Reset Results</button>}
               <button className = "btn btn-ui" onClick = {() => {dispatch({type:"active"})}}>Let's start</button>
          </div>
     </div>
    )
 }
 
 export default StartScreen;