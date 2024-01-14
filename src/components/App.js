import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import StartScreen from "./StartScreen";
import Error from "./Error";
import Question from "./Question";
import BtnNext from "./BtnNext";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Footer from "./Footer";
import Timer from "./Timer";

import useLocalStorageState from "../hooks/useLoacaleStorageState";

import { useEffect, useReducer } from "react"
const SECONDS_PER_QUESTION = 30;

const initialState = {
  questions:[],
  // error, ready, loading, active, finished
  status:"loading",
  index:0,
  answer:null,
  points:0,
  highscore:0,
  secondsRemaning:null,
}


function reducer(state, action){
  switch(action.type){
    case "dataRecieved":
      return {...state, questions: action.payload, status:"ready"}
    case "dataFailed":
      return {...state, status:"error" } 
    case "active":
       return {...state, status: "active", secondsRemaning: state.questions.length * SECONDS_PER_QUESTION}
    case "newAnswer":
       const question = state.questions.at(state.index)
       return {...state, answer:action.payload, points: action.payload === question.correctOption ? state.points + question.points : state.points}
    case "nextAnswer":
      return {...state, index: state.index + 1, answer:null}
    case "finished":
      return {...state, status: "finished", highscore: state.points > state.highscore ? state.points : state.highscore}
    case "restart":
      return {...initialState, questions:state.questions, status:"ready"};
    case "tick":
      return {...state, secondsRemaning: state.secondsRemaning - 1, status: state.secondsRemaning > 0 ? state.status : "finished"}
    default:
      throw new Error("Action unknown")
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {status, questions, index, answer, points, highscore, secondsRemaning} = state;
  const [infoPrevScore, setPrevScore] = useLocalStorageState("", "PreviousScore");
  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce((acc, val) => acc + val.points, 0)
  const percentage = (points / maxPossiblePoints) * 100;

  useEffect(function(){
    (async function(){
      try{
        const res = await fetch(`https://my-json-server.typicode.com/SpizhovyiMaxDev/react-quiz-json-server/questions`);
        const data = await res.json();
        dispatch({type:"dataRecieved", payload:data});
      } catch(err){
        dispatch({type:"dataFailed"});
      }
    })()
  }, [])

  return (
    <div className="app">
        <Header /> 

        <Main>  
           {status === "loading" && <Loader /> } 
           {status === "ready" && <StartScreen maxPossiblePoints={maxPossiblePoints} infoPrevScore = {infoPrevScore} setPrevScore = {setPrevScore} dispatch = {dispatch} numQuestions={numQuestions}/>}
           {status === "active" && 
            <>
              <Progress answer={answer} maxPossiblePoints = {maxPossiblePoints} numQuestions = {numQuestions} index = {index} points = {points}/>
              <Question answer = {answer} question = {questions[index]} dispatch = {dispatch} /> 
              <Footer>
                <Timer dispatch = {dispatch} secondsRemaning = {secondsRemaning} /> 
                <BtnNext dispatch = {dispatch} answer = {answer} index = {index} numQuestions = {numQuestions} /> 
              </Footer>
            </>
          }
          {status === "finished" && <FinishScreen setPrevScore = {setPrevScore} dispatch = {dispatch} points = {points} maxPossiblePoints={maxPossiblePoints} highscore = {highscore} percentage={percentage}/>}
          {status === "error" && <Error />}
        </Main>
    </div>
  );
}

export default App;
