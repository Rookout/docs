const request = require('request');

const ENFORCER_SECRET = process.env.ENFORCER_SECRET;
const NEW_VERSION = process.env.NEW_VERSION;
const RELEASE_VERSION = NEW_VERSION.replace('inner-999', '1');

const release_data = {
  repository: {
    full_name: "Rookout/docs"
  },
  data: {
    inner_version: NEW_VERSION,
    version_to_publish: RELEASE_VERSION,
    component: 'docs',
    released_by: 'CircleCI'
  }
};

const options = {
  url: 'https://github-enforcer.rookout.com/release/dry_run',
  method: 'POST',
  headers: {
    'User-Agent': 'RookoutDocs/1.0',
    'Content-Type': 'application/json',
    'X-Enforcer-Signature': ENFORCER_SECRET
  },
  json: true,
  body: release_data
};

request(options, function (error, response, body) {
  if (error) {
    console.error('error:', error);
    throw error;
  }

  console.log(body);
});

