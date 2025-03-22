const { MongoClient } = require("mongodb");
const { sendResponse } = require("./utils");

const client = new MongoClient(process.env.MONGODB_URI);
const dbName = "aws_test";

const handler = async () => {
  try {
    await client.connect();
    const db = client.db(dbName);
    const results = await db
      .collection("users")
      // find() returns all documents. Equivalent to `Select *` in SQL.
      .find({})
      // Returns all the documents in an array
      .toArray();
    console.log(JSON.stringify(results));
    return sendResponse(200, results);
  } catch (e) {
    console.error(e);
    return sendResponse(500, e);
  }
};

module.exports = { handler };