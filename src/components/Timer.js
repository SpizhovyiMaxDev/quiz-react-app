import { useEffect } from "react";

function Timer({ dispatch, secondsRemaning }){
    const minutes = Math.floor(secondsRemaning / 60);
    const seconds = secondsRemaning % 60;

    useEffect(function(){
        const id = setInterval(function(){
            dispatch({type:"tick"})
        }, 1000)

        return function (){
           clearInterval(id);
        }
    },[dispatch])

     return (
        <div className="timer">
          {minutes < 10 && "0"}{minutes}:{seconds < 10 && "0"}{seconds}
        </div>
     )
}

export default Timer;
