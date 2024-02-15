import React, { useEffect } from "react";
import CharactersHomepageCard from "./cards/CharactersHomepageCard.jsx";
import LootHomepageCard from "./cards/LootHomepageCard.jsx";
import RaidsHomepageCard from "./cards/RaidsHomepageCard.jsx";

export const Home = ({ fetchAll }) => {
  useEffect(() => {}, []);
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
