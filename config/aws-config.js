const AWS = require('aws-sdk');
const fs = require('fs');

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
  sessionToken: process.env.AWS_SESSION_TOKEN
});

module.exports = { AWS };
