// Add helper functions here?
export function setActiveViewState(view, propObject) {
  const headerButtonIdsArray = [
    "raids-header-button",
    "loot-header-button",
    "characters-header-button",
  ];
  propObject?.setActiveView(view);

  for (let id in headerButtonIdsArray) {
    let arrayElement = headerButtonIdsArray[id];
    let concat = `${view}-header-button`;

    if (concat === arrayElement) {
      const headerLink = document.getElementById(arrayElement);
      if (headerLink) headerLink.classList.add("active-view");
    } else {
      const headerLink = document.getElementById(arrayElement);
      if (headerLink) headerLink.classList.remove("active-view");
    }
  }
}

export function openModal(modalName, propObject) {
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
}
