function FinishScreen({points, maxPossiblePoints, highscore, dispatch, setPrevScore, percentage}){
    
    let emoji;
    if (percentage === 100) emoji = "🥇";
    if (percentage >= 80 && percentage < 100) emoji = "🎉";
    if (percentage >= 50 && percentage < 80) emoji = "🙃";
    if (percentage >= 0 && percentage < 50) emoji = "🤨";
    if (percentage === 0) emoji = "🤦‍♂️";

    function restartQuiz(){
        dispatch({type:"restart"})
        setPrevScore(`Last time you scored ${points} out of ${maxPossiblePoints} (${Math.ceil(percentage)}%) ${emoji}`);
    }

    return (
        <>
            <p className="result">
                You scored <strong>{points}</strong> out of {maxPossiblePoints} ({Math.ceil(percentage)}%) {emoji} 
            </p>
            <p className = "highscore">
               Highscore: {highscore} points
            </p>
            <button className="btn btn-ui" onClick = {restartQuiz}>
                Restart quiz
            </button>
        </>
    )
}

export default FinishScreen;