# Twilio Studio to Salesforce Connector

This application demonstrates how to connect Salesforce with Twilio Functions, a serverless Node.js environment

### Twilio Setup

You don't have a Twilio Account yet? Sign up on https://www.twilio.com/try-twilio and create one. You need a Twilio phone number for this demo.

This application is provided as-is. Twilio does not officially support it.

## Installation

Open [Twilio Functions Configuration](https://www.twilio.com/console/runtime/functions/configure), click on the plus button and add two entries to the list

- `got` version 8.3.1
- `form-data` version 2.3.2, 
- `jsonwebtoken` version 8.3.0, 

Afterwards create a new [Function](https://www.twilio.com/console/runtime/functions/manage), click on the plus button and start with a blank template. 
 
In order to run the demo you will need to replace the following placeholders:

- `{{salesforce-user}}`

The Salesforce user name to impersonate.

- `{{salesforce-consumer-key}}`

The Salesforce Connected App Client Id.

- `{{private-key}}`

Your certificate private key. Used to sign the JWT token.

## Questions?

Message [mdamm@twilio.com](mailto:mdamm@twilio.com) 

# License

MIT
