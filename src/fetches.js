import axios from "axios";
import { url } from "./config";

export async function getRaids() {
  const queryParams = new URLSearchParams(window.location.search);

  let personName = queryParams.get("personName") || "";
  if (personName) personName = titleCase(personName);
  const fullUrl = `${url}get_raids`;

  try {
    const results = await axios.get(fullUrl, { params: { personName } });

    if (results && results.status === 200) {
      return results.data;
    } else {
      console.log(
        `ERROR: fetches.getRaids: Received status code ${results.status}`,
      );
    }
  } catch (err) {
    console.log(`ERROR: fetches.getRaids: ${err}`);
  }
}

export async function getCharacters() {
  const queryParams = new URLSearchParams(window.location.search);

  let personName = queryParams.get("personName") || "";
  if (personName) personName = titleCase(personName);

  let guild = queryParams.get("guild") || "";
  if (guild) guild = titleCase(guild);

  let charClass = queryParams.get("charClass") || "";
  if (charClass) charClass = titleCase(charClass);

  const queryString = new URLSearchParams({
    personName,
    guild,
    charClass,
  }).toString();

  console.log("getCharacters.queryString:");
  console.log(queryString);
  const fullUrl = `${url}get_characters`;

  try {
    const results = await axios.get(fullUrl, {
      params: { personName, guild, charClass },
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
