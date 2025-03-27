# DiscordBot
Challenge 20

# About
This project supplies the code needed to post a message to a topic hosted in AWS SNS, and to store any messages sent to that topic in a database, as well as send that message to a slack channel.

## Technologies used

### AWS Lambdas
There are 3 lambda functions included that handle the following:
    PostToTopic allows us to send an api call to post a message to the topic we've created in AWS
        to specify the topic, change the resource and two arn variables in the serverless.yaml
        messages should be sent as a json object with the "message" as the key and the post as the value
            ex: {"message":"message text"}
    readFromTopic stores posts in a mongo Database hosted on atlas
        enter your mongoDB URI in the MONGODB_URI varaible in the .env file
        also, make sure the arn variable in the serverless.yaml file has your updated topic arn.
    postToSlack sends a slack message to the desired channel whenever the topic recieves a new message.
        enter your slack URL in the SLACK_URL field in the .env

### AWS SNS
I created a SNS topic which I can post messages to, and get messages from.  I use the lambda's described above to handle these actions.

# Installation
Prior to installation you'll want to create your own slack chanell and SNS topic.  Once you have the URLs for these, throw them in a .env file.
Clone or fork this repo to your machine and npm i to install any depencies.
Once that's done, run npm run deploy:dev to get your lambdas live, and copy the url your console sends back.

# Usage
Once you've installed and run the program, take the url you've gotten back from your console and do a POST request to it formatted like this:
    {
        "message": "CONTENT"
    }
and the content you POST should appear in slack.