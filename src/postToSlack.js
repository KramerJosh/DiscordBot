const slackURL = process.env.SLACK_URL;

const handler = async (event) => {
  try {
    console.log("Received SNS Event:", JSON.stringify(event, null, 2));

    // Extract the actual message from SNS
    const snsMessage = event.Records?.[0]?.Sns?.Message || "No message received";

    // Ensure message is plain text (SNS might send a JSON string)
    let messageText;
    try {
      const parsedMessage = JSON.parse(snsMessage); // Attempt to parse if it's JSON
      messageText = parsedMessage.text || parsedMessage.message || JSON.stringify(parsedMessage);
    } catch (e) {
      messageText = snsMessage; // Use raw text if parsing fails
    }

    const response = await fetch(slackURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: messageText }), // Send plain text message
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
