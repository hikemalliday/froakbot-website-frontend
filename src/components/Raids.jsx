import { reduceArray } from "../helper.js";
import RaidsResultCard from "./cards/RaidsResultCard.jsx";

export const Raids = ({ raidsFetchObject }) => {
  // useEffect(() => {
  //   lootFetchObject.fetchLoot();
  // }, []);

  if (raidsFetchObject.isErrorRaids)
    return (
      <p className="center">Error: {raidsFetchObject.isErrorRaids.message}</p>
    );
  let content = raidsFetchObject.resultsRaids;
  console.log("content");
  console.log(content);
  // We now have the content split into pairs. From here we can begin pagination

  return (
    <div className="view-content">
      {content.map((card, index) => (
        <RaidsResultCard
          key={index}
          raid={card}
          ref={index === content.length - 1 ? raidsFetchObject : null}
        />
      ))}

      {content.length === 0 && <div>Results not found.</div>}
    </div>
  );
};

export default Raids;
