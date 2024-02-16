import { useCallback, useEffect, useRef, useState } from "react";
import { reduceArray } from "../helper.js";
import { getCharacters } from "../fetches/fetchCharacters.js";
import { useSearchParams } from "react-router-dom";
import CharactersResultCard from "./cards/CharactersResultCard.jsx";
import CharactersFiltersModal from "./modals/CharactersFiltersModal.jsx";

export const Characters = () => {
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);
  const [charactersFiltersParams, setCharactersFiltersParams] = useSearchParams(
    {
      personName: "",
      guild: "",
      charClass: "",
    },
  );

  const [pageNumCharacters, setPageNumCharacters] = useState(1);
  const intObserverCharacters = useRef();
  const [resultsCharacters, setResultsCharacters] = useState([]);
  const [isLoadingCharacters, setIsLoadingCharacters] = useState(false);
  const [isErrorCharacters, setIsErrorCharacters] = useState(false);
  const [errorCharacters, setErrorCharacters] = useState({});
  const [hasNextPageCharacters, setHasNextPageCharacters] = useState(false);

  const getCharactersModalFetch = async () => {
    try {
      setPageNumCharacters(1);
      await setResultsCharacters(await getCharacters(pageNumCharacters));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setIsLoadingCharacters(true);
    setIsErrorCharacters(false);
    setErrorCharacters({});

    const controller = new AbortController();
    const { signal } = controller;

    getCharacters(pageNumCharacters, { signal })
      .then((data) => {
        setResultsCharacters((prev) => [...prev, ...data]);
        // 0 = false. Therefore, if data.length is a single element, it is the final page
        setHasNextPageCharacters(Boolean(data.length));
        setIsLoadingCharacters(false);
      })
      .catch((error) => {
        setIsLoadingCharacters(false);
        if (signal.aborted) return;
        setIsErrorCharacters(true);
        setErrorCharacters({ message: error.message });
      });

    return () => controller.abort();
  }, [pageNumCharacters]);

  const lastMessageRefCharacters = useCallback(
    (message) => {
      if (isLoadingCharacters) return;
      if (intObserverCharacters.current)
        intObserverCharacters.current.disconnect();
      intObserverCharacters.current = new IntersectionObserver((messages) => {
        if (messages[0].isIntersecting && hasNextPageCharacters) {
          setPageNumCharacters((prev) => prev + 1);
        }
      });
      if (message) intObserverCharacters.current.observe(message);
    },
    [isLoadingCharacters, hasNextPageCharacters],
  );

  if (isErrorCharacters)
    return <p className="center">Error: {errorCharacters.message}</p>;
  let content = reduceArray(resultsCharacters);

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
            ref={i === content.length - 1 ? lastMessageRefCharacters : null}
          >
            {twoCards.map((card, index) => (
              <CharactersResultCard key={index} character={card} />
            ))}
          </div>
        ))}
        {content.length === 0 && <div>Results not found.</div>}
      </div>
      {isFiltersModalOpen && (
        <CharactersFiltersModal
          isOpen={isFiltersModalOpen}
          setIsOpen={setIsFiltersModalOpen}
          setCharactersFiltersParams={setCharactersFiltersParams}
          charactersFiltersParams={charactersFiltersParams}
          getCharactersModalFetch={getCharactersModalFetch}
        />
      )}
    </>
  );
};

export default Characters;
