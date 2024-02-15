import { url } from "../config.js";
import axios from "axios";
import { useState, useEffect } from "react";

function titleCase(str) {
  return str.toLowerCase().replace(/\b\w/g, function (char) {
    return char.toUpperCase();
  });
}

export async function getLoot() {
  const queryParams = new URLSearchParams(window.location.search);

  let personName = queryParams.get("personName") || "";
  let pageNum = queryParams.get("pageNum") || 1;
  if (personName) personName = titleCase(personName);
  const fullUrl = `${url}get_loot`;

  try {
    const results = await axios.get(fullUrl, {
      params: { personName, pageNum },
    });

    if (results && results.status === 200) {
      return results.data;
    } else {
      console.log(
        `ERROR: fetches.getLoot: Received status code ${results.status}`,
      );
    }
  } catch (err) {
    console.log(`ERROR: fetches.getLoot: ${err}`);
  }
}

export const useGetLoot = (pageNum = 1) => {
  const [resultsLoot, setResultsLoot] = useState([]);
  const [isLoadingLoot, setIsLoadingLoot] = useState(false);
  const [isErrorLoot, setIsErrorLoot] = useState(false);
  const [errorLoot, setErrorLoot] = useState({});
  const [hasNextPageLoot, setHasNextPageLoot] = useState(false);

  useEffect(() => {
    console.log("hooks.useGetLoot.useEffect call");
    setIsLoadingLoot(true);
    setIsErrorLoot(false);
    setErrorLoot({});

    const controller = new AbortController();
    const { signal } = controller;

    getLoot(pageNum, { signal })
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
  }, [pageNum]);

  return {
    isLoadingLoot,
    isErrorLoot,
    errorLoot,
    resultsLoot,
    hasNextPageLoot,
  };
};
