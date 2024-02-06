import React, { useEffect } from "react";
import { getRaids } from "../fetches.js";
import { setActiveViewState } from "../helper.js";
export const Raids = ({ propObject, raidsFetchObject }) => {
  useEffect(() => {
    setActiveViewState("raids", propObject);

    const fetchData = async () => {
      try {
        raidsFetchObject?.setGetRaidsFetch(getRaids({ personName: "" }));
      } catch (err) {
        console.error(`ERROR: Raids.fetchData: ${err}`);
      }
    };
    fetchData();
  }, []);
  return <div>Raids View</div>;
};

export default Raids;
