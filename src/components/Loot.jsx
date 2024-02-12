import React, { useEffect } from "react";
import { setActiveViewState } from "../helper.js";
import LootResultCard from "./cards/LootResultCard.jsx";

export const Loot = ({ setActiveView, lootFetchObject }) => {
  useEffect(() => {
    setActiveViewState("loot", setActiveView);
    lootFetchObject.fetchLoot();
  }, []);
  return (
    <>
      <div className="view-content">
        {lootFetchObject.getLootFetch ? (
          lootFetchObject.getLootFetch.map((item, index) => (
            <LootResultCard key={index} item={item} />
          ))
        ) : (
          <div>Results not found.</div>
        )}
      </div>
    </>
  );
};

export default Loot;
