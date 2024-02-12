import React, { useEffect } from "react";
import { setActiveViewState } from "../helper.js";
import CharactersResultCard from "./cards/CharactersResultCard.jsx";

export const Characters = ({ setActiveView, charactersFetchObject }) => {
  useEffect(() => {
    setActiveViewState("characters", setActiveView);
    charactersFetchObject.fetchCharacters();
  }, []);

  return (
    <>
      <div className="view-content">
        {charactersFetchObject.getCharactersFetch ? (
          charactersFetchObject.getCharactersFetch.map((character) => (
            <CharactersResultCard
              key={character.charName}
              character={character}
            />
          ))
        ) : (
          <div>Results not found.</div>
        )}
      </div>
    </>
  );
};

export default Characters;
