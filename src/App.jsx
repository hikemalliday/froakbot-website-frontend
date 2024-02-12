import Header from "./components/Header";
import { useState } from "react";
import { Route, Routes, useSearchParams } from "react-router-dom";
import Home from "./components/Home";
import Characters from "./components/Characters";
import Loot from "./components/Loot";
import Raids from "./components/Raids";
import React from "react";
import { getCharacters, getRaids, getLoot } from "./fetches";

function App() {
  const [raidsFiltersParams, setRaidsFilterParams] = useSearchParams({
    personName: "",
  });

  const [lootFiltersParams, setLootFiltersParams] = useSearchParams({
    personName: "",
  });

  const [charactersFiltersParams, setCharactersFilterParams] = useSearchParams({
    personName: "",
    guild: "",
    charClass: "",
  });

  const [isOpenRaidFiltersModal, setIsOpenRaidFiltersModal] = useState(false);
  const [isOpenLootFiltersModal, setIsOpenLootFiltersModal] = useState(false);
  const [isOpenCharactersFiltersModal, setIsOpenCharactersFiltersModal] =
    useState(false);
  const [activeView, setActiveView] = useState("home");
  const [getLootFetch, setGetLootFetch] = useState(null);
  const [getCharactersFetch, setGetCharactersFetch] = useState(null);
  const [getRaidsFetch, setGetRaidsFetch] = useState(null);

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

  const modalObject = {
    raidsFiltersParams,
    lootFiltersParams,
    charactersFiltersParams,
    setRaidsFilterParams,
    setLootFiltersParams,
    setCharactersFilterParams,
    isOpenRaidFiltersModal,
    setIsOpenRaidFiltersModal,
    isOpenLootFiltersModal,
    setIsOpenLootFiltersModal,
    isOpenCharactersFiltersModal,
    setIsOpenCharactersFiltersModal,
  };

  const lootFetchObject = {
    fetchLoot,
    getLootFetch,
    setGetLootFetch,
    lootFiltersParams,
  };

  const charactersFetchObject = {
    fetchCharacters,
    getCharactersFetch,
    setGetCharactersFetch,
    charactersFiltersParams,
  };

  const raidsFetchObject = {
    fetchRaids,
    getRaidsFetch,
    setGetRaidsFetch,
    raidsFiltersParams,
  };

  const entireFetchObject = {
    lootFetchObject,
    charactersFetchObject,
    raidsFetchObject,
  };

  return (
    <>
      <Header
        modalObject={modalObject}
        entireFetchObject={entireFetchObject}
        activeView={activeView}
      />
      <Routes>
        <Route path="/" element={<Home setActiveView={setActiveView} />} />
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
