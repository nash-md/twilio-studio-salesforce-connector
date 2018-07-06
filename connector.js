const got = require('got');
const jwt = require('jsonwebtoken');
const FormData = require('form-data');

const user = '{{salesforce-user}}';
const clientId = '{{salesforce-consumer-key}}';
const privateKey = `-----BEGIN RSA PRIVATE KEY-----
{{private-key}}
-----END RSA PRIVATE KEY-----`;

function getTokenInformation() {
  const options = {
    issuer: clientId,
    audience: 'https://login.salesforce.com',
    expiresIn: 180,
    algorithm: 'RS256'
  };

  const token = jwt.sign({ prn: user }, privateKey, options);

  const form = new FormData();

  form.append('grant_type', 'urn:ietf:params:oauth:grant-type:jwt-bearer');
  form.append('assertion', token);

  return got
    .post(`https://login.salesforce.com/services/oauth2/token`, {
      body: form
    })
    .then(response => {
      const token = JSON.parse(response.body);
      return token;
    });
}

exports.handler = function(context, event, callback) {
  getTokenInformation()
    .then(token => {
      const options = {
        Authorization: 'Bearer ' + token.access_token,
        'Content-Type': 'application/json'
      };
      return got(`${token.instance_url}/services/data/v41.0/query/`, {
        headers: options,
        query:
          'q=' +
          encodeURIComponent(
            `SELECT Id, Name from Contact WHERE Phone = '${event.phoneNumber}'`
          )
      });
    })
    .then(response => {
      const attributes = JSON.parse(response.body);

      console.log(`found: ${attributes.records.length} records`);

      if (attributes.records.length !== 0) {
        callback(null, {
          name: attributes.records[0].Name
        });
      } else {
        callback(null, {});
      }
    })
    .catch(error => {
      console.error(error);
      callback(error);
    });
};