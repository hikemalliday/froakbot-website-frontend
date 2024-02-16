import { url } from "../config.js";
import axios from "axios";

function titleCase(str) {
  return str.toLowerCase().replace(/\b\w/g, function (char) {
    return char.toUpperCase();
  });
}

export async function getRaids(pageNum, maxRaidId) {
  const queryParams = new URLSearchParams(window.location.search);
  let personName = queryParams.get("personName") || "";
  if (personName) personName = titleCase(personName);
  const fullUrl = `${url}get_raids`;

  try {
    const results = await axios.get(fullUrl, {
      params: { personName, pageNum, maxRaidId: maxRaidId.current },
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
