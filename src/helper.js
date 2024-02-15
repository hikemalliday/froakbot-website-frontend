// Add helper functions here?
// export function setActiveViewState(view, setActiveView) {
//   const headerButtonIdsArray = [
//     "raids-header-button",
//     "loot-header-button",
//     "characters-header-button",
//   ];
//   setActiveView(view);
//
//   for (let id in headerButtonIdsArray) {
//     let arrayElement = headerButtonIdsArray[id];
//     let concat = `${view}-header-button`;
//
//     if (concat === arrayElement) {
//       const headerLink = document.getElementById(arrayElement);
//       if (headerLink) headerLink.classList.add("active-view");
//     } else {
//       const headerLink = document.getElementById(arrayElement);
//       if (headerLink) headerLink.classList.remove("active-view");
//     }
//   }
// }

export function openModal(modalName, modalObject) {
  console.log(`modalName: ${modalName}`);
  if (modalName === "raids") {
    console.log("raids test");
    modalObject?.setIsOpenRaidFilters(true);
  } else if (modalName === "loot") {
    console.log("loot test");
    modalObject?.setIsOpenLootFilters(true);
  } else if (modalName === "characters") {
    console.log("characters test");
    modalObject?.setIsOpenCharactersFilters(true);
  }
}

export function reduceArray(array) {
  const reducedArray = array.reduce((acc, element, index) => {
    if (index % 2 === 0) {
      acc.push([]);
    }
    acc[acc.length - 1].push(element);
    return acc;
  }, []);
  return reducedArray;
}
