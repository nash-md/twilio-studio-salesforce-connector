const jwtflow = require('salesforce-jwt');
const got = require('got');

var clientId = '{{salesforce-app-client-id}}';

var privateKey = `-----BEGIN RSA PRIVATE KEY-----
{{private-key}}
-----END RSA PRIVATE KEY-----`

exports.handler = function (context, event, callback) {

  jwtflow.getToken(clientId, privateKey, '{{salesforce-user}}', function (error, token) {
    // token will contain the token to use on SalesForce API.
    if (error) {
      console.error(error);
    }

    const options = {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json'
    };

    got('https://{{salesforce-instace}}.salesforce.com/services/data/v41.0/query/', {
      headers: options,
      query: 'q=' + encodeURIComponent(`SELECT Name from Contact WHERE Phone = '${event.phoneNumber}'`)
    }).then(response => {
        const attributes = JSON.parse(response.body)

        console.log(`found: ${attributes.records.length} records`)

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