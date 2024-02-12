import React, { useEffect } from "react";
import CharactersHomepageCard from "./cards/CharactersHomepageCard.jsx";
import LootHomepageCard from "./cards/LootHomepageCard.jsx";
import RaidsHomepageCard from "./cards/RaidsHomepageCard.jsx";
import { setActiveViewState } from "../helper.js";

export const Home = ({ setActiveView, fetchAll }) => {
  useEffect(() => {
    setActiveViewState("home", setActiveView);
  }, []);
  return (
    <>
      <div>
        <p></p>
      </div>
      <CharactersHomepageCard />
      <LootHomepageCard />
      <RaidsHomepageCard />
    </>
  );
};

export default Home;
