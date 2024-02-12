import React, { useEffect } from "react";
import { setActiveViewState } from "../helper.js";
import RaidsResultCard from "./cards/RaidsResultCard.jsx";

export const Raids = ({ setActiveView, raidsFetchObject }) => {
  useEffect(() => {
    setActiveViewState("raids", setActiveView);
    raidsFetchObject?.fetchRaids();
  }, []);
  return (
    <>
      <div className="view-content">
        {raidsFetchObject.getRaidsFetch ? (
          raidsFetchObject.getRaidsFetch.map((raid) => (
            <RaidsResultCard key={raid.raidId} raid={raid} />
          ))
        ) : (
          <div>Results not found.</div>
        )}
      </div>
    </>
  );
};

export default Raids;
