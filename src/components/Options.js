function Options({question, dispatch, answer}){
    return (
        <div className="options"> 
        {
            question.options.map((option, i) =>{
                const hasAnswered = answer !== null;
                return (
                    <button 
                    className = {`btn btn-option ${i === answer ? "answer" : ""} ${hasAnswered && i === question.correctOption ? "correct" : "wrong"}`} 
                    key = {option} 
                    onClick = {() => dispatch({type:"newAnswer", payload:i})}
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