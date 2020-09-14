exports.volunteerConfirmationEmail = (data) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Booking confirmation email</title>
      <style>
        u ~ div .gmail-hide {
          display: none;
        }
  
        u ~ div .gmail-show {
          display: block !important;
        }
  
        @media yahoo {
          .yahoo-hide {
            display: none;
          }
  
          .yahoo-show {
            display: block !important;
          }
        }
      </style>
    </head>
  
    <body>
      <table
        width="100%"
        cellpadding="0"
        cellspacing="0"
        style="margin: 0; font-family: Arial, Helvetica, sans-serif"
      >
        <tbody width="100%">
          <tr style="width: 100%">
            <td style="width: 33%">
              <div></div>
            </td>
            <td>
              <div style="width: 545px; margin: 10px">
                <p style="margin-top: 0; font-size: 14px; line-height: 1.2rem">
                  Dear ${data.fullName},
                </p>
                <p style="margin-top: 0; font-size: 14px; line-height: 1.2rem">
                  This is a notification that you have signed up for a class,
                </p>
  
                <p
                  style="
                    margin-top: 0;
                    margin-bottom: 6px;
                    font-size: 14px;
                    line-height: 1.2rem;
                  "
                >
                  Please feel free to contact the coordinator, Neil if there is
                  anything you wish to discuss before turning up for a class.
                </p>
                <p
                  style="
                    margin-top: 0;
                    margin-bottom: 6px;
                    font-size: 14px;
                    line-height: 1.2rem;
                  "
                >
                  Thank you and have a great time during the class.
                </p>
                <br />
                <p
                  style="
                    margin-top: 0;
                    margin-bottom: 6px;
                    font-size: 14px;
                    line-height: 1.2rem;
                  "
                >
                  Best Regards,
                </p>
                <p
                  style="
                    margin-top: 0;
                    margin-bottom: 6px;
                    font-size: 14px;
                    line-height: 1.2rem;
                  "
                >
                  The CodeYourFuture Team
                </p>
              </div>
            </td>
            <td style="width: 33%">
              <div></div>
            </td>
          </tr>
        </tbody>
      </table>
    </body>
  </html>
  
  `;
};
