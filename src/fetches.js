import axios from "axios";
import { url } from "./config";

export async function getCharacters(
  filters = { personName: "", guild: "", charClass: "" }
) {
  const fullUrl = `${url}get_characters`;

  try {
    console.log(filters);
    const results = await axios.post(fullUrl, filters);
    console.log(`fetches.getCharacters_test.results.data: ${results.data}`);
    if (results && results.status === 200) {
      console.log(results.data);
      return results.data;
    } else {
      console.log(
        `ERROR: fetches.getCharacters: Received status code ${results.status}`
      );
    }
  } catch (err) {
    console.log(`ERROR: fetches.getCharacters: ${err}`);
  }
}

export async function getRaids(filters = { personName: "" }) {
  const fullUrl = `${url}get_raids`;
  try {
    console.log(filters);
    const results = await axios.post(fullUrl, filters);
    console.log(`fetches.getRaids.results.data: ${results.data}`);
    if (results && results.status === 200) {
      console.log(results.data);
      return results.data;
    } else {
      console.log(
        `ERROR: fetches.getRaids: Received status code ${results.status}`
      );
    }
  } catch (err) {
    console.log(`ERROR: fetches.getRaids: ${err}`);
  }
}

export async function getLoot(filters = { personName: "" }) {
  const fullUrl = `${url}get_loot`;
  try {
    console.log(filters);
    const results = await axios.post(fullUrl, filters);
    console.log(`fetches.getLoot.data: ${results.data}`);
    if (results && results.status === 200) {
      console.log(results.data);
      return results.data;
    } else {
      console.log(
        `ERROR: fetches.getLoot: Received status code ${results.status}`
      );
    }
  } catch (err) {
    console.log(`ERROR: fetches.getLoot: ${err}`);
  }
}
