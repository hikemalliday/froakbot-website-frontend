import React, { useEffect } from "react";
import { setActiveViewState } from "../helper.js";
export const Loot = ({ setActiveView, lootFetchObject }) => {
  useEffect(() => {
    setActiveViewState("loot", setActiveView);
  }, []);
  return (
    <>
      <div className="view-content">
        {lootFetchObject.getLootFetch ? (
          lootFetchObject.getLootFetch.map((item) => (
            <div key={item.itemName}>{item.itemName}</div>
          ))
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </>
  );
};

export default Loot;
