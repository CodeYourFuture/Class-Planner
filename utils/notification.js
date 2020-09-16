const {
  volunteerConfirmationEmail,
} = require("./emailTemplate/Class.planner.volunteer.confirmation.attending.email");
const {
  cancelVolunteerBookingEmail,
} = require("./emailTemplate/Class.planner.volunteer.confirmation.attending.email");
const { mailer } = require("./mailer");
require("dotenv").config({ path: "./config/config.env" });

exports.bookingConfirmationEmail = async (data) => {
  try {
    const emailData = {
      toEmail: data.email,
      subject: `CYF - New Class Sign up as ${data.roleName}`,
      html: volunteerConfirmationEmail(data),
      replyToEmail: process.env.CATCH_ON_ALL_EMAIL,
    };
    await mailer(emailData);
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
