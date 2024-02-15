import { useState, useRef, useCallback } from "react";
import { Route, Routes, useSearchParams } from "react-router-dom";
import { useGetLoot } from "./fetches/fetchLoot.js";
import { useGetRaids } from "./fetches/fetchRaids.js";
import { useGetCharacters } from "./fetches/fetchCharacters.js";
import Header from "./components/Header";
import Home from "./components/Home";
import Characters from "./components/Characters";
import Loot from "./components/Loot";
import Raids from "./components/Raids";

function App() {
  // These will need to be pass to the views
  const [pageNumLoot, setPageNumLoot] = useState(1);
  const [pageNumRaids, setPageNumRaids] = useState(1);
  const [pageNumCharacters, setPageNumCharacters] = useState(1);

  const {
    isLoadingLoot,
    isErrorLoot,
    errorLoot,
    resultsLoot,
    hasNextPageLoot,
  } = useGetLoot(pageNumLoot);

  const {
    isLoadingRaids,
    isErrorRaids,
    errorRaids,
    resultsRaids,
    hasNextPageRaids,
  } = useGetRaids(pageNumRaids);

  const {
    isLoadingCharacters,
    isErrorCharacters,
    errorCharacters,
    resultsCharacters,
    hasNextPageCharacters,
  } = useGetCharacters(pageNumCharacters);

  const intObserverLoot = useRef();
  const intObserverRaids = useRef();
  const intObserverCharacters = useRef();

  const lastMessageRefLoot = useCallback(
    (message) => {
      if (isLoadingLoot) return;
      if (intObserverLoot.current) intObserverLoot.current.disconnect();
      intObserverLoot.current = new IntersectionObserver((messages) => {
        if (messages[0].isIntersecting && hasNextPageLoot) {
          setPageNumLoot((prev) => prev + 1);
        }
      });
      if (message) intObserverLoot.current.observe(message);
    },
    [isLoadingLoot, hasNextPageLoot],
  );

  const lastMessageRefRaids = useCallback(
    (message) => {
      if (isLoadingRaids) return;
      if (intObserverRaids.current) intObserverLoot.current.disconnect();
      intObserverRaids.current = new IntersectionObserver((messages) => {
        if (messages[0].isIntersecting && hasNextPageRaids) {
          setPageNumRaids((prev) => prev + 1);
        }
      });
      if (message) intObserverRaids.current.observe(message);
    },
    [isLoadingRaids, hasNextPageRaids],
  );

  const lastMessageRefCharacters = useCallback(
    (message) => {
      if (isLoadingCharacters) return;
      if (intObserverCharacters.current)
        intObserverCharacters.current.disconnect();
      intObserverCharacters.current = new IntersectionObserver((messages) => {
        if (messages[0].isIntersecting && hasNextPageCharacters) {
          setPageNumCharacters((prev) => prev + 1);
        }
      });
      if (message) intObserverCharacters.current.observe(message);
    },
    [isLoadingCharacters, hasNextPageCharacters],
  );

  const [raidsFiltersParams, setRaidsFilterParams] = useSearchParams({
    personName: "",
  });
  const [lootFiltersParams, setLootFiltersParams] = useSearchParams({
    personName: "",
    pageNum: 1,
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

  // const [getCharactersFetch, setGetCharactersFetch] = useState(null);
  // const [getRaidsFetch, setGetRaidsFetch] = useState(null);

  // const fetchCharacters = async () => {
  //   try {
  //     const data = await getCharacters();
  //     setGetCharactersFetch(data);
  //   } catch (err) {
  //     console.error(`ERROR: App.fetchCharacters: ${err}`);
  //   }
  // };
  //
  // const fetchRaids = async () => {
  //   try {
  //     const data = await getRaids();
  //     setGetRaidsFetch(data);
  //   } catch (err) {
  //     console.error(`ERROR: App.fetchRaids: ${err}`);
  //   }
  // };

  // const fetchLoot = async () => {
  //   try {
  //     const data = await getLoot();
  //     setGetLootFetch(data);
  //   } catch (err) {
  //     console.error(`ERROR: App.fetchLoot: ${err}`);
  //   }
  // };

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
    isLoadingLoot,
    isErrorLoot,
    errorLoot,
    resultsLoot,
    hasNextPageLoot,
    lastMessageRefLoot,
  };

  const charactersFetchObject = {
    isLoadingCharacters,
    isErrorCharacters,
    errorCharacters,
    resultsCharacters,
    hasNextPageCharacters,
    lastMessageRefCharacters,
  };

  const raidsFetchObject = {
    isLoadingRaids,
    isErrorRaids,
    errorRaids,
    resultsRaids,
    hasNextPageRaids,
    lastMessageRefRaids,
  };

  const entireFetchObject = {
    lootFetchObject,
    charactersFetchObject,
    raidsFetchObject,
  };

  return (
    <>
      <Header modalObject={modalObject} entireFetchObject={entireFetchObject} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/characters"
          element={<Characters charactersFetchObject={charactersFetchObject} />}
        />
        <Route
          path="/loot"
          element={<Loot lootFetchObject={lootFetchObject} />}
        />
        <Route
          path="/raids"
          element={<Raids raidsFetchObject={raidsFetchObject} />}
        />
      </Routes>
    </>
  );
}

export default App;
