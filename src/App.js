import { Route, Routes } from "react-router-dom";
import Congratulation from "./page/Congratulation/Congratulation";
import Home from "./page/Home/Home";
import Question from "./page/Question/Question";
import ReplayQuestion from "./page/Question/ReplayQuestion";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/question" element={<Question />} />
      <Route path="/congratulation" element={<Congratulation />} />
      <Route path="/replayQuestion" element={<ReplayQuestion />} />
    </Routes>
  );
}

export default App;
