import RaidsResultCard from "./cards/RaidsResultCard.jsx";
import { useCallback, useEffect, useRef, useState } from "react";
import { getRaids } from "../fetches/fetchRaids.js";
import { useSearchParams } from "react-router-dom";
import RaidFiltersModal from "./modals/RaidFiltersModal.jsx";

export const Raids = () => {
  const [pageNumRaids, setPageNumRaids] = useState(1);
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);
  const [raidsFiltersParams, setRaidsFilterParams] = useSearchParams({
    personName: "",
  });
  const [resultsRaids, setResultsRaids] = useState([]);
  const [isLoadingRaids, setIsLoadingRaids] = useState(false);
  const [isErrorRaids, setIsErrorRaids] = useState(false);
  const [errorRaids, setErrorRaids] = useState({});
  const [hasNextPageRaids, setHasNextPageRaids] = useState(false);
  const maxRaidId = useRef(1);

  // This function is another way to call a fetch
  // It is necessary so that we can fetch based on modal filters, rather than
  // solely rely upon the intersection observer fetchcall / initial page render call
  const getRaidsModalFetch = async () => {
    try {
      setPageNumRaids(1);
      await setResultsRaids(await getRaids(pageNumRaids, maxRaidId));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setIsLoadingRaids(true);
    setIsErrorRaids(false);
    setErrorRaids({});

    const controller = new AbortController();
    const { signal } = controller;

    getRaids(pageNumRaids, maxRaidId, { signal })
      .then((data) => {
        setResultsRaids((prev) => [...prev, ...data]);
        maxRaidId.current = data[0]["maxRaidId"];
        console.log(`maxRaidId: ${maxRaidId.current}`);
        // 0 = false. Therefore, if data.length is a single element, it is the final page
        setHasNextPageRaids(Boolean(data.length));
        setIsLoadingRaids(false);
      })
      .catch((error) => {
        setIsLoadingRaids(false);
        if (signal.aborted) return;
        setIsErrorRaids(true);
        setErrorRaids({ message: error.message });
      });
    return () => controller.abort();
  }, [pageNumRaids]);

  const intObserverRaids = useRef();
  const lastMessageRefRaids = useCallback(
    (message) => {
      if (isLoadingRaids) return;
      if (intObserverRaids.current) intObserverRaids.current.disconnect();
      intObserverRaids.current = new IntersectionObserver((messages) => {
        if (messages[0].isIntersecting && hasNextPageRaids) {
          console.log("We are near the last post!");
          // NOTE:
          // This is disabled for now (the endless scroll) until we solve how to handle the backend JOINS
          //setPageNumRaids((prev) => prev + 1);
        }
      });
      if (message) intObserverRaids.current.observe(message);
    },
    [isLoadingRaids, hasNextPageRaids],
  );

  if (isErrorRaids)
    return <p className="center">Error: {errorRaids.message}</p>;
  let content = resultsRaids;

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
        {content.map((card, index) => (
          <RaidsResultCard
            key={index}
            raid={card}
            ref={index === content.length - 1 ? lastMessageRefRaids : null}
          />
        ))}
        {content.length === 0 && <div>Results not found.</div>}
      </div>
      {isFiltersModalOpen && (
        <RaidFiltersModal
          isOpen={isFiltersModalOpen}
          setIsOpen={setIsFiltersModalOpen}
          raidsFiltersParams={raidsFiltersParams}
          setRaidsFilterParams={setRaidsFilterParams}
          getRaidsModalFetch={getRaidsModalFetch}
        />
      )}
    </>
  );
};

export default Raids;
