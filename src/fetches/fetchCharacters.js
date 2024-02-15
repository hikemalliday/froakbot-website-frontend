import { url } from "../config.js";
import axios from "axios";
import { useState, useEffect } from "react";

function titleCase(str) {
  return str.toLowerCase().replace(/\b\w/g, function (char) {
    return char.toUpperCase();
  });
}

export async function getCharacters() {
  const queryParams = new URLSearchParams(window.location.search);

  let personName = queryParams.get("personName") || "";
  if (personName) personName = titleCase(personName);

  let guild = queryParams.get("guild") || "";
  if (guild) guild = titleCase(guild);

  let charClass = queryParams.get("charClass") || "";
  if (charClass) charClass = titleCase(charClass);

  const fullUrl = `${url}get_characters`;

  try {
    const results = await axios.get(fullUrl, {
      params: { personName, guild, charClass },
    });

    if (results && results.status === 200) {
      return results.data;
    } else {
      console.log(
        `ERROR: fetches.getCharacters: Received status code ${results.status}`,
      );
    }
  } catch (err) {
    console.log(`ERROR: fetches.getCharacters: ${err}`);
  }
}

export const useGetCharacters = (pageNum = 1) => {
  const [resultsCharacters, setResultsCharacters] = useState([]);
  const [isLoadingCharacters, setIsLoadingCharacters] = useState(false);
  const [isErrorCharacters, setIsErrorCharacters] = useState(false);
  const [errorCharacters, setErrorCharacters] = useState({});
  const [hasNextPageCharacters, setHasNextPageCharacters] = useState(false);

  useEffect(() => {
    console.log("hooks.useGetCharacters.useEffect call");
    setIsLoadingCharacters(true);
    setIsErrorCharacters(false);
    setErrorCharacters({});

    const controller = new AbortController();
    const { signal } = controller;

    getCharacters(pageNum, { signal })
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
  }, [pageNum]);

  return {
    isLoadingCharacters,
    isErrorCharacters,
    errorCharacters,
    resultsCharacters,
    hasNextPageCharacters,
  };
};
