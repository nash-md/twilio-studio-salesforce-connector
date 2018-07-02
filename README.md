# Twilio Studio to Salesforce Connector

This application demonstrates how to connect Salesforce with Twilio Functions, a serverless Node.js environment

### Twilio Setup

You don't have a Twilio Account yet? Sign up on https://www.twilio.com/try-twilio and create one. You need a Twilio phone number for this demo.

This application is provided as-is. Twilio does not officially support it.

## Installation

Open [Twilio Functions Configuration](https://www.twilio.com/console/runtime/functions/configure), click on the plus button and add two entries to the list

- `got` version 8.3.1
- `salesforce-jwt` version 0.1.0, 

Afterwards create a new [Function](https://www.twilio.com/console/runtime/functions/manage), click on the plus button and start with a blank template. 
 
In order to run the demo you will need to replace the following placeholders:

- `{{salesforce-user}}`

The Salesforce user name

- `{{salesforce-consumer-key}}`

The Connected App Client Id.

- `{{salesforce-instace}}`

The Salesforce instace is the database server from where you can have access to your organisation. Any environment will have a URL like https://xxxx.salesforce.com (example),

- `{{private-key}}`

Your certificate private key. Used to sign the JWT token

This application demonstrates Twilio automatic speech recognition with a voice call. With speech recognition you can detect the intent of a phone call quickly in real-time.

## Questions?

Message [mdamm@twilio.com](mailto:mdamm@twilio.com) 


# License

MIT
