import { reduceArray } from "../helper.js";
import LootResultCard from "./cards/LootResultCard.jsx";

export const Loot = ({ lootFetchObject }) => {
  // useEffect(() => {
  //   lootFetchObject.fetchLoot();
  // }, []);

  if (lootFetchObject.isErrorLoot)
    return (
      <p className="center">Error: {lootFetchObject.isErrorLoot.message}</p>
    );
  let content = reduceArray(lootFetchObject.resultsLoot);
  console.log(lootFetchObject.resultsLoot);
  // We now have the content split into pairs. From here we can begin pagination

  return (
    <div className="view-content">
      {content.map((twoCards, i) => (
        <div
          key={i}
          className="two-cards"
          ref={
            i === content.length - 1 ? lootFetchObject.lastPostRefLoot : null
          }
        >
          {twoCards.map((card, index) => (
            <LootResultCard key={index} item={card} />
          ))}
        </div>
      ))}
      {content.length === 0 && <div>Results not found.</div>}
    </div>
  );
};

export default Loot;
