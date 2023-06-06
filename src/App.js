import { Route, Routes } from "react-router-dom";
import Home from "./page/Home/Home";
import Question from "./page/Question";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/question" element={<Question />} />
    </Routes>
  );
}

export default App;
