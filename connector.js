const jwt = require("salesforce-jwt-bearer-token-flow");
const got = require('got');

const user = '{{salesforce-user}}';
const clientId = '{{salesforce-consumer-key}}';
const privateKey = `-----BEGIN RSA PRIVATE KEY-----
{{private-key}}
-----END RSA PRIVATE KEY-----`;

exports.handler = function (context, event, callback) {

  jwt.getToken({
    iss: clientId,
    sub: user,
    aud: 'https://login.salesforce.com',
    privateKey: privateKey
  }, function (error, token) {

    if (error) {
      return callback(error);
    }

    const options = {
      Authorization: 'Bearer ' + token.access_token,
      'Content-Type': 'application/json'
    };

    got(`${token.instance_url}/services/data/v41.0/query/`, {
      headers: options,
      query: 'q=' + encodeURIComponent(`SELECT Id, Name from Contact WHERE Phone = '${event.phoneNumber}'`);
    }).then(response => {
      const attributes = JSON.parse(response.body);

      console.log(`found: ${attributes.records.length} records`);

      if (attributes.records.length !== 0) {

        callback(null, {
          name: attributes.records[0].Name
        });

      } else {
        callback(null, {});
      }

    }).catch(error => {
      console.error(error);
      callback(error);
    })

  });

};