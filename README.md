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

## TODO 
    
    Create new SNS topic
    Clean up routes a little in serverless.yaml
    