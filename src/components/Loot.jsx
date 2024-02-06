import React, { useEffect } from "react";
import { getLoot } from "../fetches.js";
import { setActiveViewState } from "../helper.js";
export const Loot = ({ propObject, lootFetchObject }) => {
  useEffect(() => {
    setActiveViewState("loot", propObject);

    const fetchData = async () => {
      try {
        lootFetchObject?.setGetLootFetch(getLoot({ personName: "" }));
      } catch (err) {
        console.error(`ERROR: Characters.fetchData: ${err}`);
      }
    };
    fetchData();
  }, []);
  return <div>Loot View</div>;
};

export default Loot;
