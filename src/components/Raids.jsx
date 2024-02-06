import React, { useEffect } from "react";
import { setActiveViewState } from "../helper.js";
export const Raids = ({ setActiveView, raidsFetchObject }) => {
  useEffect(() => {
    setActiveViewState("raids", setActiveView);
  }, []);
  return (
    <>
      <div className="view-content">
        {raidsFetchObject.getRaidsFetch ? (
          raidsFetchObject.getRaidsFetch.map((raid) => (
            <div key={raid.raidId}>{raid.raidName}</div>
          ))
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </>
  );
};

export default Raids;
