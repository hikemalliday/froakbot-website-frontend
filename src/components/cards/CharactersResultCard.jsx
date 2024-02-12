import React from "react";

export const CharactersResultCard = ({ character }) => {
  return (
    <>
      <div className="query-result-card-container">
        <div className="query-result-card-header">
          <h4>{character.charName}</h4>
        </div>
        <div className="query-result-card-data">
          <div>Class: {character.charClass}</div>
          <div>Level: {character.level}</div>
          <div>Guild: {character.guild}</div>
          <div>Person: {character.personName}</div>
        </div>
      </div>
    </>
  );
};

export default CharactersResultCard;
