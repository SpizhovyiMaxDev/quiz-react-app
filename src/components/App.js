import { useQuiz } from "../contexts/QuizContext";

import AppContainer from "./AppContainer";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import StartScreen from "./StartScreen";
import Error from "./Error";
import Question from "./Question";
import BtnNext from "./BtnNext";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Footer from "./Footer";
import Timer from "./Timer";


function App() {
  const { status } = useQuiz();
  return (
          <AppContainer>
              <Header /> 
                  <Main>  
                    {status === "loading" && <Loader /> } 
                    {status === "ready" && <StartScreen />}
                    {status === "active" && 
                      <>
                        <Progress />
                        <Question /> 
                        <Footer>
                          <Timer /> 
                          <BtnNext /> 
                        </Footer>
                      </>
                    }
                    {status === "finished" && <FinishScreen />}
                    {status === "error" && <Error />}
                  </Main>
          </AppContainer>
  );
}

export default App;
