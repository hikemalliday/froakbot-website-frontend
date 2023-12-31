import axios from "axios";
import config from "../config.js";

export async function getMessagesPage(pageNum = 1, date = null) {
  const results = await axios.get(config["backendUrl"], {
    params: {
      pageNum,
      date,
    },
  });
  console.log("Results, fetch_calls.getMessagesPage: ", results);
  if (results) return results.data;
}
