import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./components/HomePage";
import MontyHall from "./components/monty-hall/MontyHall";
import SleepingBeauty from "./components/sleeping-beauty/SleepingBeauty";
import Bertrand from "./components/bertrand/Bertrand";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/monty-hall" element={<MontyHall />} />
        <Route path="/sleeping-beauty" element={<SleepingBeauty />} />
        <Route path="/bertrand" element={<Bertrand />} />
      </Routes>
    </Router>
  );
};

export default App;
