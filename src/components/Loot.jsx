import { reduceArray } from "../helper.js";
import { useCallback, useEffect, useRef, useState } from "react";
import { getLoot } from "../fetches/fetchLoot.js";
import { useSearchParams } from "react-router-dom";
import LootResultCard from "./cards/LootResultCard.jsx";
import LootFiltersModal from "./modals/LootFiltersModal.jsx";

export const Loot = () => {
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);
  const [pageNumLoot, setPageNumLoot] = useState(1);
  const [lootFiltersParams, setLootFiltersParams] = useSearchParams({
    personName: "",
  });
  const intObserverLoot = useRef();
  const [resultsLoot, setResultsLoot] = useState([]);
  const [isLoadingLoot, setIsLoadingLoot] = useState(false);
  const [isErrorLoot, setIsErrorLoot] = useState(false);
  const [errorLoot, setErrorLoot] = useState({});
  const [hasNextPageLoot, setHasNextPageLoot] = useState(false);

  // This function is another way to call a fetch
  // It is necessary so that we can fetch based on modal filters, rather than
  // solely rely upon the intersection observer fetchcall / initial page render call
  const getLootModalFetch = async () => {
    try {
      setPageNumLoot(1);
      await setResultsLoot(await getLoot(pageNumLoot));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setIsLoadingLoot(true);
    setIsErrorLoot(false);
    setErrorLoot({});

    const controller = new AbortController();
    const { signal } = controller;

    getLoot(pageNumLoot, { signal })
      .then((data) => {
        setResultsLoot((prev) => [...prev, ...data]);
        // 0 = false. Therefore, if data.length is a single element, it is the final page
        setHasNextPageLoot(Boolean(data.length));
        setIsLoadingLoot(false);
      })
      .catch((error) => {
        setIsLoadingLoot(false);
        if (signal.aborted) return;
        setIsErrorLoot(true);
        setErrorLoot({ message: error.message });
      });

    return () => controller.abort();
  }, [pageNumLoot]);

  const lastMessageRefLoot = useCallback(
    (message) => {
      if (isLoadingLoot) return;
      if (intObserverLoot.current) intObserverLoot.current.disconnect();
      intObserverLoot.current = new IntersectionObserver((messages) => {
        if (messages[0].isIntersecting && hasNextPageLoot) {
          console.log("We are near the last post!");
          setPageNumLoot((prev) => prev + 1);
        }
      });
      if (message) intObserverLoot.current.observe(message);
    },
    [isLoadingLoot, hasNextPageLoot],
  );

  if (isErrorLoot) return <p className="center">Error: {errorLoot.message}</p>;
  let content = reduceArray(resultsLoot);

  return (
    <>
      <div className="sub-header">
        <div
          className="sub-header-button"
          onClick={() => setIsFiltersModalOpen(true)}
        >
          FILTERS
        </div>
      </div>
      <div className="view-content">
        {content.map((twoCards, i) => (
          <div
            key={i}
            className="two-cards"
            ref={i === content.length - 1 ? lastMessageRefLoot : null}
          >
            {twoCards.map((card, index) => (
              <LootResultCard key={index} item={card} />
            ))}
          </div>
        ))}
        {content.length === 0 && <div>Results not found.</div>}
      </div>
      {isFiltersModalOpen && (
        <LootFiltersModal
          isOpen={isFiltersModalOpen}
          setIsOpen={setIsFiltersModalOpen}
          lootFiltersParams={lootFiltersParams}
          setLootFiltersParams={setLootFiltersParams}
          getLootModalFetch={getLootModalFetch}
        />
      )}
    </>
  );
};

export default Loot;
