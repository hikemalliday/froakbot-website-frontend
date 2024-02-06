import React, { useEffect, useState } from "react";
import { setActiveViewState } from "../helper.js";
import QueryCharactersResult from "./cards/QueryCharactersResult.jsx";

export const Characters = ({ setActiveView, charactersFetchObject }) => {
  useEffect(() => {
    setActiveViewState("characters", setActiveView);
  }, []);

  return (
    <>
      <div className="view-content">
        {charactersFetchObject.getCharactersFetch ? (
          charactersFetchObject.getCharactersFetch.map((character) => (
            <div key={character.charName}>{character.charName}</div>
          ))
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </>
  );
};

export default Characters;
