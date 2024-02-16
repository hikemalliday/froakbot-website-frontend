import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Characters from "./components/Characters";
import Loot from "./components/Loot";
import Raids from "./components/Raids";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/characters" element={<Characters />} />
        <Route path="/loot" element={<Loot />} />
        <Route path="/raids" element={<Raids />} />
      </Routes>
    </>
  );
}

export default App;
