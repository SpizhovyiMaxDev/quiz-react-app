import { useQuiz } from "../contexts/QuizContext";

function FinishScreen(){
    const {points, maxPossiblePoints, highscore, handleDispatch, setPrevScore, percentage, level, infoPrevScore} = useQuiz();

    let emoji;
    if (percentage === 100) emoji = "🥇";
    if (percentage >= 80 && percentage < 100) emoji = "🎉";
    if (percentage >= 50 && percentage < 80) emoji = "🙃";
    if (percentage >= 0 && percentage < 50) emoji = "🤨";
    if (percentage === 0) emoji = "🤦‍♂️";

    function saveResults(){
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
            <div className = "btn-container gap-4">     
                <button className="btn btn-ui" onClick = {saveResults}>
                    {!infoPrevScore ? "Save the Results":"Saved"}
                </button>
                <button className="btn btn-ui" onClick = {() => handleDispatch("restart")}>
                    Restart quiz
                </button>
            </div>
        </>
    )
}

export default FinishScreen;