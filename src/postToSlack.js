const slackURL = process.env.SLACK_URL;

const handler = async (event) => {
  try {
    const response = await fetch(slackURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: "TEST" }), 
    });

    if (!response.ok) {
      throw new Error(`Slack API responded with ${response.status}: ${await response.text()}`);
    }

    console.log("Message posted to Slack successfully!");
  } catch (e) {
    console.error("Error posting to Slack:", e);
  }
};

module.exports = { handler };
