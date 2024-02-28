import { useQuiz } from "../contexts/QuizContext";

function BtnNext(){    
    const { answer, handleDispatch, index, numQuestions } = useQuiz();
    if(answer === null)return;
    let name = "";

    (function (){
        if(index < numQuestions - 1)  
           name = "nextAnswer"
        if(index === numQuestions - 1)
           name = "finished"
    })()

    return (
        <button onClick={() => handleDispatch(name)} className = "btn btn-ui"> {name === "finished" ? "Finish" : "Next"} </button>
    )
}

export default BtnNext;