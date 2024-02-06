import React, { useEffect, useState } from "react";
import ReactDom from "react-dom";
import { getCharacters } from "../../fetches.js";

export const CharactersFiltersModal = ({
  isOpen,
  setIsOpen,
  charactersFetchObject,
}) => {
  if (!isOpen) return null;

  const [personValue, setPersonValue] = useState("");
  const [guildValue, setGuildValue] = useState("");
  const [classValue, setClassValue] = useState("");

  useEffect(() => {
    setTimeout(() => {
      const modalElement = document.querySelector(".modal-main");
      if (modalElement) modalElement.classList.add("show");
    }, 10);
  }, []);

  const closeModal = (state) => {
    const modalElement = document.querySelector(".modal-main.show");
    if (modalElement) modalElement.classList.remove("show");
    setIsOpen(!state);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const filters = {
      personName: personValue,
      guild: guildValue,
      charClass: classValue,
    };
    charactersFetchObject?.setGetCharactersFetch(getCharacters(filters));
    closeModal(isOpen);
  };

  return ReactDom.createPortal(
    <>
      <div className="modal-background" onClick={() => closeModal(isOpen)} />
      <div className="modal-main">
        <div className="modal-title">
          <div>Characters Filters</div>
        </div>
        <form onSubmit={handleFormSubmit}>
          <div className="modal-inputs-container">
            <div className="modal-input-field">
              <div>Person:</div>
              <div>
                <input onChange={(e) => setPersonValue(e.target.value)} />
              </div>
            </div>
            <div className="modal-input-field">
              <div>Guild:</div>
              <div>
                <input onChange={(e) => setGuildValue(e.target.value)} />
              </div>
            </div>
            <div className="modal-input-field">
              <div>Class:</div>
              <div>
                <input onChange={(e) => setClassValue(e.target.value)} />
              </div>
            </div>
            <button type="submit">Search</button>
          </div>
        </form>
      </div>
    </>,
    document.getElementById("modal")
  );
};

export default CharactersFiltersModal;
