import React from "react";
import { Link } from "react-router-dom";
import CharactersFiltersModal from "./modals/CharactersFiltersModal";
import LootFiltersModal from "./modals/LootFiltersModal";
import RaidFiltersModal from "./modals/RaidFiltersModal";

export const Header = ({ propObject, entireFetchObject }) => {
  const openModal = (modalName) => {
    console.log(`modalName: ${modalName}`);
    if (modalName === "raids") {
      console.log("raids test");
      propObject?.setIsOpenRaidFilters(true);
    } else if (modalName === "loot") {
      console.log("loot test");
      propObject?.setIsOpenLootFilters(true);
    } else if (modalName === "characters") {
      console.log("characters test");
      propObject?.setIsOpenCharactersFilters(true);
    }
  };

  return (
    <>
      <div className="header-main-container">
        <Link to="/" className="logo">
          FROAKBOT
        </Link>
        <div className="header-buttons-container">
          {propObject?.activeView !== "home" && (
            <>
              <div
                id="filters-header-button"
                className="header-button"
                onClick={() => openModal(propObject?.activeView)}
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
      {propObject?.isOpenRaidFilters && (
        <RaidFiltersModal
          isOpen={propObject?.isOpenRaidFilters}
          setIsOpen={propObject?.setIsOpenRaidFilters}
          raidsFetchObject={entireFetchObject?.raidsFetchObject}
        />
      )}
      {propObject?.isOpenLootFilters && (
        <LootFiltersModal
          isOpen={propObject?.isOpenLootFilters}
          setIsOpen={propObject?.setIsOpenLootFilters}
          lootFetchObject={entireFetchObject?.lootFetchObject}
        />
      )}
      {propObject?.isOpenCharactersFilters && (
        <CharactersFiltersModal
          isOpen={propObject?.isOpenCharactersFilters}
          setIsOpen={propObject?.setIsOpenCharactersFilters}
          charactersFetchObject={entireFetchObject?.charactersFetchObject}
        />
      )}
    </>
  );
};

export default Header;
