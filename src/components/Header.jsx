import React, { useState } from "react";
import { Link } from "react-router-dom";
import CharactersFiltersModal from "./modals/CharactersFiltersModal";
import LootFiltersModal from "./modals/LootFiltersModal";
import RaidFiltersModal from "./modals/RaidFiltersModal";
import { Dropdown } from "./Dropdown/Dropdown.jsx";

export const Header = ({ modalObject, activeView, entireFetchObject }) => {
  const [visibleDropdown, setVisibleDropdown] = useState("");

  const openModal = (modalName) => {
    console.log(`modalName: ${modalName}`);
    if (modalName === "raids") {
      modalObject?.setIsOpenRaidFiltersModal(true);
    } else if (modalName === "loot") {
      modalObject?.setIsOpenLootFiltersModal(true);
    } else if (modalName === "characters") {
      modalObject?.setIsOpenCharactersFiltersModal(true);
    }
  };

  return (
    <>
      <div className="header-main-container">
        <Link to="/" className="logo">
          FROAKBOT
        </Link>
        <div className="header-buttons-container">
          <div
            onMouseOver={() => setVisibleDropdown("raids")}
            onMouseLeave={() => setVisibleDropdown("")}
          >
            <Link
              to="/raids"
              id="raids-header-button"
              className="header-button"
            >
              RAIDS
            </Link>
            {visibleDropdown === "raids" && (
              <div className="header-button" onClick={() => openModal("raids")}>
                <Dropdown to="/raids" />
              </div>
            )}
          </div>
          |
          <div
            onMouseOver={() => setVisibleDropdown("loot")}
            onMouseLeave={() => setVisibleDropdown("")}
          >
            <Link to="/loot" id="loot-header-button" className="header-button">
              LOOT
            </Link>
            {visibleDropdown === "loot" && (
              <div className="header-button" onClick={() => openModal("loot")}>
                <Dropdown to="/loot" />
              </div>
            )}
          </div>
          |
          <div
            onMouseOver={() => setVisibleDropdown("characters")}
            onMouseLeave={() => setVisibleDropdown("")}
          >
            <Link
              to="/characters"
              id="characters-header-button"
              className="header-button"
            >
              CHARACTERS
            </Link>
            {visibleDropdown === "characters" && (
              <div
                className="header-button"
                onClick={() => openModal("characters")}
              >
                <Dropdown to="/characters" />
              </div>
            )}
          </div>
        </div>
      </div>
      {modalObject?.isOpenRaidFiltersModal && (
        <RaidFiltersModal
          isOpen={modalObject?.isOpenRaidFiltersModal}
          setIsOpen={modalObject?.setIsOpenRaidFiltersModal}
          setRaidsFilterParams={modalObject?.setRaidsFilterParams}
          raidsFetchObject={entireFetchObject?.raidsFetchObject}
          raidsFiltersParams={modalObject?.raidsFiltersParams}
        />
      )}
      {modalObject?.isOpenLootFiltersModal && (
        <LootFiltersModal
          isOpen={modalObject?.isOpenLootFiltersModal}
          setIsOpen={modalObject?.setIsOpenLootFiltersModal}
          setLootFiltersParams={modalObject?.setLootFiltersParams}
          lootFetchObject={entireFetchObject?.lootFetchObject}
          lootFiltersParams={modalObject?.lootFiltersParams}
        />
      )}
      {modalObject?.isOpenCharactersFiltersModal && (
        <CharactersFiltersModal
          isOpen={modalObject?.isOpenCharactersFiltersModal}
          setIsOpen={modalObject?.setIsOpenCharactersFiltersModal}
          setCharactersFiltersParams={modalObject?.setCharactersFilterParams}
          charactersFetchObject={entireFetchObject?.charactersFetchObject}
          charactersFiltersParams={modalObject?.charactersFiltersParams}
        />
      )}
    </>
  );
};

export default Header;
