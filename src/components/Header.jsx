import React from "react";
import { Link } from "react-router-dom";
import CharactersFiltersModal from "./modals/CharactersFiltersModal";
import LootFiltersModal from "./modals/LootFiltersModal";
import RaidFiltersModal from "./modals/RaidFiltersModal";

export const Header = ({ modalObject, activeView, entireFetchObject }) => {
  const openModal = (modalName) => {
    console.log(`modalName: ${modalName}`);
    if (modalName === "raids") {
      console.log("raids test");
      modalObject?.setIsOpenRaidFiltersModal(true);
    } else if (modalName === "loot") {
      console.log("loot test");
      modalObject?.setIsOpenLootFiltersModal(true);
    } else if (modalName === "characters") {
      console.log("characters test");
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
          {activeView !== "home" && (
            <>
              <div
                id="filters-header-button"
                className="header-button"
                onClick={() => openModal(activeView)}
              >
                FILTERS
              </div>
              |
            </>
          )}
          <Link to="/raids" id="raids-header-button" className="header-button">
            RAIDS
          </Link>
          |
          <Link to="/loot" id="loot-header-button" className="header-button">
            LOOT
          </Link>
          |
          <Link
            to="/characters"
            id="characters-header-button"
            className="header-button"
          >
            CHARACTERS
          </Link>
        </div>
      </div>
      {modalObject?.isOpenRaidFiltersModal && (
        <RaidFiltersModal
          isOpen={modalObject?.isOpenRaidFiltersModal}
          setIsOpen={modalObject?.setIsOpenRaidFiltersModal}
          raidsFetchObject={entireFetchObject?.raidsFetchObject}
        />
      )}
      {modalObject?.isOpenLootFiltersModal && (
        <LootFiltersModal
          isOpen={modalObject?.isOpenLootFiltersModal}
          setIsOpen={modalObject?.setIsOpenLootFiltersModal}
          lootFetchObject={entireFetchObject?.lootFetchObject}
        />
      )}
      {modalObject?.isOpenCharactersFiltersModal && (
        <CharactersFiltersModal
          isOpen={modalObject?.isOpenCharactersFiltersModal}
          setIsOpen={modalObject?.setIsOpenCharactersFiltersModal}
          charactersFetchObject={entireFetchObject?.charactersFetchObject}
        />
      )}
    </>
  );
};

export default Header;
