function BtnNext({ answer, dispatch, index, numQuestions }){    
    if(answer === null)return;
    let name = "";

    (function (){
        if(index < numQuestions - 1)  
           name = "nextAnswer"
        if(index === numQuestions - 1)
           name = "finished"
    })()

    return (
        <button onClick={() => dispatch({type:name})} className = "btn btn-ui"> {name === "finished" ? "Finish" : "Next"} </button>
    )
}

export default BtnNext;