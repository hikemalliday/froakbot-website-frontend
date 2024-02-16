import { url } from "../config.js";
import axios from "axios";

function titleCase(str) {
  return str.toLowerCase().replace(/\b\w/g, function (char) {
    return char.toUpperCase();
  });
}

export async function getCharacters(pageNum) {
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
      params: { personName, guild, charClass, pageNum },
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
