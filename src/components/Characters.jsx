import { reduceArray } from "../helper.js";
import CharactersResultCard from "./cards/CharactersResultCard.jsx";

export const Characters = ({ charactersFetchObject }) => {
  // useEffect(() => {
  //   lootFetchObject.fetchLoot();
  // }, []);

  if (charactersFetchObject.isErrorCharacters)
    return (
      <p className="center">
        Error: {charactersFetchObject.isErrorCharacters.message}
      </p>
    );
  let content = reduceArray(charactersFetchObject.resultsCharacters);
  console.log(charactersFetchObject.resultsCharacters);
  // We now have the content split into pairs. From here we can begin pagination

  return (
    <div className="view-content">
      {content.map((twoCards, i) => (
        <div
          key={i}
          className="two-cards"
          ref={
            i === content.length - 1
              ? charactersFetchObject.lastMessageRefCharacters
              : null
          }
        >
          {twoCards.map((card, index) => (
            <CharactersResultCard key={index} character={card} />
          ))}
        </div>
      ))}
      {content.length === 0 && <div>Results not found.</div>}
    </div>
  );
};

export default Characters;
