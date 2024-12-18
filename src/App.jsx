import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./components/HomePage";
import MontyHall from "./components/monty-hall/MontyHall";
import SleepingBeauty from "./components/sleeping-beauty/SleepingBeauty";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/monty-hall" element={<MontyHall />} />
        <Route path="/sleeping-beauty" element={<SleepingBeauty />} />
      </Routes>
    </Router>
  );
};

export default App;
