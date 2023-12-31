import { useState, useRef, useMemo, useEffect } from "react";
import froak from "./assets/froak-undead.png";
import Header from "./components/Header";
import Cards from "./components/Cards";

const App = () => {
  return (
    <>
      <Header />
      <Cards />
    </>
  );
};

export default App;
