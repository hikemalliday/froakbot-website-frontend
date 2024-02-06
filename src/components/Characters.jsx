import React, { useEffect } from "react";
import { getCharacters } from "../fetches.js";
import { setActiveViewState } from "../helper.js";

export const Characters = ({ propObject, charactersFetchObject }) => {
  useEffect(() => {
    setActiveViewState("characters", propObject);

    const fetchData = async () => {
      try {
        charactersFetchObject?.setGetCharactersFetch(
          getCharacters({
            personName: "",
            guild: "",
            charClass: "",
          })
        );
      } catch (err) {
        console.error(`ERROR: Characters.fetchData: ${err}`);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="view-content">Characters View</div>
    </>
  );
};

export default Characters;
