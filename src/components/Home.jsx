import React, { useEffect } from "react";
import CharactersHomepageCard from "./cards/CharactersHomepageCard.jsx";
import LootHomepageCard from "./cards/LootHomepageCard.jsx";
import RaidsHomepageCard from "./cards/RaidsHomepageCard.jsx";
import { setActiveViewState } from "../helper.js";

export const Home = ({ propObject }) => {
  useEffect(() => {
    setActiveViewState("home", propObject);
  }, []);
  return (
    <>
      <div>
        <p></p>
      </div>
      <CharactersHomepageCard propObject={propObject} />
      <LootHomepageCard propObject={propObject} />
      <RaidsHomepageCard propObject={propObject} />
    </>
  );
};

export default Home;
