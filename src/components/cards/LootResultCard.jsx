import React from "react";

export const LootResultCard = ({ item }) => {
  const itemIcon = `data:image/png;base64,${item.iconPng}`;
  return (
    <>
      <div className="query-result-card-container">
        <div className="query-result-card-header">
          <h4>{item.itemName}</h4>
        </div>
        <img className="item-icon" src={itemIcon} />
        <div className="query-result-card-data">
          <div>Person: {item.personName}</div>
          <div>Raid Name: {item.raidName}</div>
          <div>Raid ID: {item.raidId}</div>
        </div>
      </div>
    </>
  );
};

export default LootResultCard;
