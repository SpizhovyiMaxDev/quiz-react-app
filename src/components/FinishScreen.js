function FinishScreen({points, maxPossiblePoints, highscore, dispatch, setPrevScore, percentage, level}){
    
    let emoji;
    if (percentage === 100) emoji = "🥇";
    if (percentage >= 80 && percentage < 100) emoji = "🎉";
    if (percentage >= 50 && percentage < 80) emoji = "🙃";
    if (percentage >= 0 && percentage < 50) emoji = "🤨";
    if (percentage === 0) emoji = "🤦‍♂️";

    function restartQuiz(){
        dispatch({type:"restart"})
        setPrevScore(`At the ${level} level, you got ${points} out of ${maxPossiblePoints}, or (${Math.ceil(percentage)}%) ${emoji}`);
    }

    return (
        <>
            <p className="result">
            At the <strong>{level}</strong>, you got <strong>{points}</strong> out of {maxPossiblePoints}, or ({Math.ceil(percentage)}%) {emoji} 
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