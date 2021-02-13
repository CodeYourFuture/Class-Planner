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
          <tr style="width: 100%;">
                <td style="width: 33%;">
                    <div style="background-color: #e0101a; height: 226px;"></div>
                </td>
                <td>
                    <img style="width: 545px; height: 226px; margin: 0 10px;" alt="cyf-email-05"
                        src="https://cyf-assets-buckets.s3.eu-west-2.amazonaws.com/emailTemplate/cyf-email-05.jpg" />
                </td>
                <td style="width: 33%;">
                    <div style="background-color: #e0101a; height: 226px;"></div>
                </td>
            </tr>
            <td style="width: 33%">
              <div></div>
            </td>
            <td>
              <div style="width: 545px; margin: 10px">
                <p style="margin-top: 0; font-size: 14px; line-height: 1.2rem">
                  Dear ${data.fullName},
                </p>
                <p style="margin-top: 0; font-size: 14px; line-height: 1.2rem">
                  This is a notification that you have signed up for a class as a <strong>${data.roleName}</strong> on ${data.classDate} between ${data.classStartTime} and ${data.classEndTime} ,
                  <a href="event.ics" class="gmail-hide yahoo-hide owa-hide">add to calendar</a>
                  <a class="class-calendar-calender-gmail"
                      href="http://www.google.com/calendar/event?action=TEMPLATE&text=Volunteering%20AT%20CYF%20AS%20${data.roleName}&&dates=${data.classDate}">
                      add to calendar
                  </a>
                </p>
  
                <p
                  style="
                    margin-top: 0;
                    margin-bottom: 6px;
                    font-size: 14px;
                    line-height: 1.2rem;
                  "
                >
                  Please feel free to contact the coordinator,if there is
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
                <p style="font-size: 14px;"><br />
                <br />
                <a target='_blank' rel='noopener noreferrer'
                    href="http://codeyourfuture.io">http://codeyourfuture.io</a> - Follow us
                on
                <a target='_blank' rel='noopener noreferrer'
                    href="https://www.facebook.com/codeyourfuture.io/">Facebook</a> and
                <a target='_blank' rel='noopener noreferrer'
                    href="https://twitter.com/CodeYourFuture_">Twitter</a><br />
                Read more about our project on
                <a target='_blank' rel='noopener noreferrer'
                    href="https://www.ft.com/content/cd3842d4-8902-11e7-afd2-74b8ecd34d3b">FT,
                </a>
                <a target='_blank' rel='noopener noreferrer'
                    href="https://www.wired.co.uk/article/codeyourfuture-refugee-coding-school">Wired,
                </a>
                <a target='_blank' rel='noopener noreferrer'
                    href="https://www.bbc.co.uk/programmes/p04yzrrg">BBC Tech Tent, </a>
                <a target='_blank' rel='noopener noreferrer'
                    href="https://www.unhcr.org/news/stories/2017/1/586e420c7/volunteers-train-refugees-to-crack-into-london-tech-industry.html">UNHCR,
                </a>and
                <a target='_blank' rel='noopener noreferrer'
                    href="https://www.newsdeeply.com/refugees/articles/2016/10/19/welcome-to-londons-refugee-coding-school">
                    NewsDeeply</a>
            </p>
              </div>
            </td>
            <td style="width: 33%">
              <div></div>
            </td>
          </tr>
          <tr style="width: 100%;">
          <td style="width: 33%;">
              <div style="height: 226px;"></div>
          </td>
          <td>
              <img style="width: 545px; height: 226px; margin: 0 10px;" alt="cyf_brand"
                  src="https://cyf-assets-buckets.s3.eu-west-2.amazonaws.com/application-process-images/cyf_brand.png" />
          </td>
          <td style="width: 33%;">
              <div style="height: 226px;"></div>
          </td>
      </tr>
        </tbody>
      </table>
    </body>
  </html>
  
  `;
};
