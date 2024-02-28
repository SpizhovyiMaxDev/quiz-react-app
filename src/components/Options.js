import { useQuiz } from "../contexts/QuizContext";

function Options(){
    const {questions, index, handleDispatch, answer} = useQuiz();
    const question = questions[index];
    return (
        <div className="options"> 
        {
            question.options.map((option, i) =>{
                const hasAnswered = answer !== null;
                return (
                    <button 
                        className = {`btn btn-option ${i === answer ? "answer" : ""} ${hasAnswered && i === question.correctOption ? "correct" : "wrong"}`} 
                        key = {option} 
                        onClick = {() => handleDispatch("newAnswer", i)}
                        disabled = {hasAnswered}
                        >
                            {option}
                    </button>
                )
            })
        }
        </div>
    )
}

export default Options;