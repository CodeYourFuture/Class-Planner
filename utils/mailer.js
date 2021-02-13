const { SESConfig } = require('./email-config');
const { ses } = require('./email-config');

exports.mailer = async (emailData) => {
  const to =
    SESConfig.env === 'development'
      ? SESConfig.catchOnAllEmail
      : emailData.toEmail;
  const replyTo =
    SESConfig.env === 'development'
      ? SESConfig.catchOnAllEmail
      : emailData.replyToEmail;
  try {
    if (Array.isArray(to)) {
      const groupedEmails = to;
      return Promise.all(
        groupedEmails.map(async (groupEmail) => {
          let params = {
            Destination: {
              BccAddresses: [groupEmail],
            },
            Message: {
              Body: {
                Html: {
                  Charset: 'UTF-8',
                  Data: emailData.html,
                },
                Text: {
                  Charset: 'UTF-8',
                  Data: 'TEXT_FORMAT_BODY',
                },
              },
              Subject: {
                Charset: 'UTF-8',
                Data: emailData.subject,
              },
            },
            Source: SESConfig.sourceEmail,
            ReplyToAddresses: [replyTo],
          };
          return ses.sendEmail(params).promise();
        })
      );
    } else {
      let params = {
        Destination: {
          ToAddresses: [to],
        },
        Message: {
          Body: {
            Html: {
              Charset: 'UTF-8',
              Data: emailData.html,
            },
            Text: {
              Charset: 'UTF-8',
              Data: 'TEXT_FORMAT_BODY',
            },
          },
          Subject: {
            Charset: 'UTF-8',
            Data: emailData.subject,
          },
        },
        Source: SESConfig.sourceEmail,
        ReplyToAddresses: [replyTo],
      };
      return ses.sendEmail(params).promise();
    }
  } catch (err) {
    console.log(err);
  }
};
