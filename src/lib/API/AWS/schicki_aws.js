 var AWS		=		require('aws-sdk');

AWS.config.apiVersions = {
  s3: '2006-03-01',
  // other service API versions
};

module.exports = AWS;