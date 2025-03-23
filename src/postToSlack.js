const slackURL = process.env.SLACK_URL;

const handler = async (event) => {
  try {
    console.log("Received SNS Event:", JSON.stringify(event, null, 2));

    // event.Records is the list of posts sent to the topic
    // [0] is the index of the first item in that list
    const snsMessage = event.Records?.[0]?.Sns?.Message || "No message received";

    // Ensure message is plain text
    let messageText;
    try {
      const parsedMessage = JSON.parse(snsMessage);
      messageText = parsedMessage.text || parsedMessage.message || JSON.stringify(parsedMessage);
    } catch (e) {
      messageText = snsMessage;
    }

    // send a Post request to my slackbot URL, body will be "text": Message
    const response = await fetch(slackURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: messageText }),
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
