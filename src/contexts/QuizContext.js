import { createContext, useContext, useReducer, useEffect } from "react";
import useLocalStorageState from "../hooks/useLoacaleStorageState";

const QuizContext = createContext();
const SERVER_URL="http://localhost:8000";

const initialState = {
  data:[],
  questions:[],
  // error, ready, loading, active, finished
  status:"loading",
  index:0,
  answer:null,
  points:0,
  highscore:0,
  secondsRemaning:null,
  level:"",
}
  
const levelInfo = {
  beginner:10,
  intermidiate:20,
  advanced:30,
}

const SECONDS_PER_QUESTION = 30;
  
function reducer(state, action){
    switch(action.type){
      case "dataRecieved":
        return {
          ...state, 
          data: action.payload, 
          questions: action.payload, 
          status:"ready"
        }
      case "setQuestions": 
          return {
            ...state,
            level:action.payload,
            questions: levelInfo[action.payload] ? state.data.filter(question => question.points === levelInfo[action.payload]) : [...state.data],
          } 
      case "dataFailed":
        return {
          ...state, 
          status:"error" 
        } 
      case "active":
        return {
          ...state, 
          status: "active", 
          secondsRemaning: state.questions.length * SECONDS_PER_QUESTION, 
        }
      case "newAnswer":
         const question = state.questions.at(state.index)
         return {
          ...state, 
          answer:action.payload, 
          points: action.payload === question.correctOption ? state.points + question.points : state.points
        }
      case "nextAnswer":
        return {
          ...state, 
          index: state.index + 1, 
          answer:null
        }
      case "finished":
        return {
          ...state, 
          status: "finished", 
          highscore: state.points > state.highscore ? state.points : state.highscore
        }
      case "restart":
        return {
          ...initialState, 
          data: state.data,
          questions: state.data, 
          status:"ready"
        };
      case "tick":
        return {
          ...state, 
          secondsRemaning: state.secondsRemaning - 1, 
          status: state.secondsRemaning > 0 ? state.status : "finished"
        }
      default:
        throw new Error("Action unknown")
    }
  }

function QuizProvider({children}){
    const [state, dispatch] = useReducer(reducer, initialState);
    const {status, questions, index, answer, points, highscore, secondsRemaning, level} = state;
    const [infoPrevScore, setPrevScore] = useLocalStorageState("", "PreviousScore");
    const numQuestions = questions.length;
    const maxPossiblePoints = questions.reduce((acc, val) => acc + val.points, 0)
    const percentage = (points / maxPossiblePoints) * 100;

    useEffect(function(){
      (async function(){
        try{
          const res = await fetch(`${SERVER_URL}/questions`);
          // https://my-json-server.typicode.com/
          const data = await res.json();
          dispatch({type:"dataRecieved", payload:data});
        } catch(err){
          dispatch({type:"dataFailed"});
        }
      })()
    }, [])

    function handleDispatch(type, payload = undefined){
        if(!payload) dispatch({type});
        else dispatch({type, payload});
    }

    return (
        <QuizContext.Provider value = {{
             state,
             status,
             questions,
             index,
             answer,
             points,
             highscore,
             secondsRemaning, 
             level,
             infoPrevScore,
             setPrevScore,
             numQuestions,
             maxPossiblePoints,
             percentage,
             handleDispatch
        }}> 
            {children}
        </QuizContext.Provider>
    )
}


function useQuiz(){
    const context = useContext(QuizContext);
    console.log(context)
    if(!context)
        throw new Error("💥Please make sure that you are using useQuiz hook inside of the provider !!!");

    return context;
}

export { QuizProvider, useQuiz }