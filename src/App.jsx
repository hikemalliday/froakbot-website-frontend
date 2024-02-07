import Header from "./components/Header";
import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Characters from "./components/Characters";
import Loot from "./components/Loot";
import Raids from "./components/Raids";
import { getCharacters, getRaids, getLoot } from "./fetches";
import "./App.css";

function App() {
  const [isOpenRaidFiltersModal, setIsOpenRaidFiltersModal] = useState(false);
  const [isOpenLootFiltersModal, setIsOpenLootFiltersModal] = useState(false);
  const [isOpenCharactersFiltersModal, setIsOpenCharactersFiltersModal] =
    useState(false);
  const [activeView, setActiveView] = useState("home");
  const [getLootFetch, setGetLootFetch] = useState(null);
  const [getCharactersFetch, setGetCharactersFetch] = useState(null);
  const [getRaidsFetch, setGetRaidsFetch] = useState(null);

  const modalObject = {
    isOpenRaidFiltersModal,
    setIsOpenRaidFiltersModal,
    isOpenLootFiltersModal,
    setIsOpenLootFiltersModal,
    isOpenCharactersFiltersModal,
    setIsOpenCharactersFiltersModal,
  };

  const lootFetchObject = { getLootFetch, setGetLootFetch };
  const charactersFetchObject = { getCharactersFetch, setGetCharactersFetch };
  const raidsFetchObject = { getRaidsFetch, setGetRaidsFetch };

  const entireFetchObject = {
    lootFetchObject,
    charactersFetchObject,
    raidsFetchObject,
  };

  const fetchCharacters = async () => {
    try {
      const data = await getCharacters();
      setGetCharactersFetch(data);
    } catch (err) {
      console.error(`ERROR: App.fetchCharacters: ${err}`);
    }
  };

  const fetchRaids = async () => {
    try {
      const data = await getRaids();
      setGetRaidsFetch(data);
    } catch (err) {
      console.error(`ERROR: App.fetchRaids: ${err}`);
    }
  };

  const fetchLoot = async () => {
    try {
      const data = await getLoot();
      setGetLootFetch(data);
    } catch (err) {
      console.error(`ERROR: App.fetchLoot: ${err}`);
    }
  };

  const fetchAll = async () => {
    fetchCharacters();
    fetchRaids();
    fetchLoot();
  };

  useEffect(() => {
    fetchCharacters();
    fetchRaids();
    fetchLoot();
  }, []);

  return (
    <>
      <Header
        modalObject={modalObject}
        entireFetchObject={entireFetchObject}
        activeView={activeView}
      />
      <Routes>
        <Route
          path="/"
          element={<Home setActiveView={setActiveView} fetchAll={fetchAll} />}
        />
        <Route
          path="/characters"
          element={
            <Characters
              setActiveView={setActiveView}
              charactersFetchObject={charactersFetchObject}
            />
          }
        />
        <Route
          path="/loot"
          element={
            <Loot
              setActiveView={setActiveView}
              lootFetchObject={lootFetchObject}
            />
          }
        />
        <Route
          path="/raids"
          element={
            <Raids
              setActiveView={setActiveView}
              raidsFetchObject={raidsFetchObject}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
