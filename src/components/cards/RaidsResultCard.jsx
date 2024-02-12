import React from "react";

export const RaidResultCard = ({ raid }) => {
  return (
    <>
      <div className="query-result-card-container">
        <div className="query-result-card-header">
          <h4 data-testid="raid-name">{raid.raidName}</h4>
        </div>
        <div className="query-result-card-data">
          <div data-testid="raid-id">Raid ID: {raid.raidId}</div>
          <div data-testid="raid-date">Raid Date: {raid.raidDate}</div>
          <div
            data-testid="raid-usernames-header"
            className="raid-usernames-header"
          >
            Usernames:
          </div>
          {raid.usernames.map((username, index) => (
            <div datatest-id={` ${username}`} key={index}>
              {username}
            </div>
          ))}
          {raid.loot.length ? (
            <div className="raid-loot-header">Loot:</div>
          ) : null}
          {raid.loot
            ? raid.loot.map((item, index) => (
                <div key={index} className="raid-loot-container">
                  <div
                    key={index}
                  >{`${item.itemName}: ${item.personName}`}</div>
                </div>
              ))
            : null}
        </div>
      </div>
    </>
  );
};

export default RaidResultCard;
