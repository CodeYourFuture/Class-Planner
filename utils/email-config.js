const dotenv = require("dotenv");
const AWS = require("aws-sdk");

dotenv.config({ path: "./config/config.env" });

const SESConfig = {
  sourceEmail: process.env.SOURCE_EMAIL,
  catchOnAllEmail: process.env.CATCH_ON_ALL_EMAIL,
  env: process.env.NODE_ENV,

  aws: {
    config: {
      accessKeyId: process.env.AWS_SES_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SES_SECRET_ACCESS_KEY,
      region: process.env.AWS_SES_REGION,
    },
  },
};

const SES_API_VERSION = "2010-12-01";
const ses = new AWS.SES({
  ...SESConfig.aws.config,
  apiVersion: SES_API_VERSION,
});

module.exports = { SESConfig, ses };
