import { useEffect } from "react";
import { useQuiz } from "../contexts/QuizContext";

function Timer(){
    const { handleDispatch, secondsRemaning } = useQuiz();

    const minutes = Math.floor(secondsRemaning / 60);
    const seconds = secondsRemaning % 60;

    useEffect(function(){
        const id = setInterval(function(){
            handleDispatch("tick")
        }, 1000)

        return function (){
           clearInterval(id);
        }
    },[handleDispatch])

     return (
        <div className="timer">
          {minutes < 10 && "0"}{minutes}:{seconds < 10 && "0"}{seconds}
        </div>
     )
}

export default Timer;
