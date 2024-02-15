import { url } from "../config.js";
import axios from "axios";
import { useState, useEffect } from "react";

function titleCase(str) {
  return str.toLowerCase().replace(/\b\w/g, function (char) {
    return char.toUpperCase();
  });
}

export async function getRaids() {
  const queryParams = new URLSearchParams(window.location.search);

  let personName = queryParams.get("personName") || "";
  let pageNum = queryParams.get("pageNum") || 1;
  if (personName) personName = titleCase(personName);
  const fullUrl = `${url}get_raids`;

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

export const useGetRaids = (pageNum = 1) => {
  const [resultsRaids, setResultsRaids] = useState([]);
  const [isLoadingRaids, setIsLoadingRaids] = useState(false);
  const [isErrorRaids, setIsErrorRaids] = useState(false);
  const [errorRaids, setErrorRaids] = useState({});
  const [hasNextPageRaids, setHasNextPageRaids] = useState(false);

  useEffect(() => {
    console.log("hooks.useGetLoot.useEffect call");
    setIsLoadingRaids(true);
    setIsErrorRaids(false);
    setErrorRaids({});

    const controller = new AbortController();
    const { signal } = controller;

    getRaids(pageNum, { signal })
      .then((data) => {
        setResultsRaids((prev) => [...prev, ...data]);
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
  }, [pageNum]);

  return {
    isLoadingRaids,
    isErrorRaids,
    errorRaids,
    resultsRaids,
    hasNextPageRaids,
  };
};
