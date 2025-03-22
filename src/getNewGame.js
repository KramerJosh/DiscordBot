const { default: axios } = require("axios");
const { sendResponse } = require("./utils");

const url = "https://sudoku-api.vercel.app/api/dosuku";

const handler = async () => {
  try {
    const response = await axios.get(url);
    const data = await response.data;
    return sendResponse(200, data);
  } catch (e) {
    console.error(e);
    return sendResponse(500, e);
  }
};

module.exports = { handler };