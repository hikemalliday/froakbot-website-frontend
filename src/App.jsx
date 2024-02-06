import Header from "./components/Header";
import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Characters from "./components/Characters";
import Loot from "./components/Loot";
import Raids from "./components/Raids";
import { getCharacters, getLoot, getRaids } from "./fetches.js";

import "./App.css";

function App() {
  const [isOpenRaidFilters, setIsOpenRaidFilters] = useState(false);
  const [isOpenLootFilters, setIsOpenLootFilters] = useState(false);
  const [isOpenCharactersFilters, setIsOpenCharactersFilters] = useState(false);
  const [activeView, setActiveView] = useState("home");
  const [getLootFetch, setGetLootFetch] = useState({});
  const [charactersFetch, setGetCharactersFetch] = useState({});
  const [getRaidsFetch, setGetRaidsFetch] = useState({});

  const propObject = {
    isOpenRaidFilters,
    setIsOpenRaidFilters,
    isOpenLootFilters,
    setIsOpenLootFilters,
    isOpenCharactersFilters,
    setIsOpenCharactersFilters,
    activeView,
    setActiveView,
  };

  const lootFetchObject = { getLootFetch, setGetLootFetch };
  const charactersFetchObject = { charactersFetch, setGetCharactersFetch };
  const raidsFetchObject = { getRaidsFetch, setGetRaidsFetch };

  const entireFetchObject = {
    lootFetchObject,
    charactersFetchObject,
    raidsFetchObject,
  };

  return (
    <>
      <Header propObject={propObject} entireFetchObject={entireFetchObject} />
      <Routes>
        <Route path="/" element={<Home propObject={propObject} />} />
        <Route
          path="/characters"
          element={
            <Characters
              propObject={propObject}
              charactersFetchObject={charactersFetchObject}
            />
          }
        />
        <Route
          path="/loot"
          element={
            <Loot propObject={propObject} lootFetchObject={lootFetchObject} />
          }
        />
        <Route
          path="/raids"
          element={
            <Raids
              propObject={propObject}
              raidsFetchObject={raidsFetchObject}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
