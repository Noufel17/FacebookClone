const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const { OAuth2 } = google.auth;
const OAuth_link = "https://developers.google.com/oauthplayground/";
const { EMAIL, MAILING_ID, MAILING_SECRET, MAILING_REFRESH, MAILING_ACCESS } =
  process.env;

const auth = new OAuth2(
  MAILING_ID,
  MAILING_SECRET,
  MAILING_REFRESH,
  MAILING_ACCESS,
  OAuth_link
);

exports.sendVerificationEmail = (email, name, url) => {
  auth.setCredentials({
    refresh_token: MAILING_REFRESH,
  });
  const accessToken = auth.getAccessToken();
  const stmp = nodemailer.createTransport({
    // the transport line for the email we are sending to the user
    service: "gmail",
    auth: {
      type: "Oauth2",
      user: EMAIL,
      clientId: MAILING_ID,
      clientSecret: MAILING_SECRET,
      refreshToken: MAILING_REFRESH,
      accessToken,
    },
  });
  const mailOptions = {
    from: EMAIL,
    to: email,
    subject: "facebookClone verification email",
    html: `<body> <div style=" display: flex; align-items: center; max-width: 700px; margin-bottom: 1rem; gap: 10px; font-family: roboto; font-size: 600; color: #3b5998; " > <img style="width: 30px" src="./public/img/Facebook.png" alt="facebook logo" /> <span>Action required: Activate your accound</span> </div> <div style=" padding: 1rem 0; border-top: 1px solid #e5e5e5; border-bottom: 1px solid #e5e5e5; color: #141823; font-family: roboto; font-size: 17px; " > <span>hello ${name}</span> <div style="padding: 20px 0"> <span style="padding: 1.5rem 0"> You recently create an account at facebookClone, please confirm your regestration by following the link bellow </span> </div> <a href=${url} style=" width: 200px; background: #4c649b; text-decoration: none; font-weight: 600; padding: 10px 15px; color: #ffffff; " >confirm your account </a> <div style="padding: 20px 0"> <span style="color: #141823" >Once in facebookClone you can share photos videos status and stay connected with your friends </span> </div> </div>`,
  };
  stmp.sendMail(mailOptions, (err, info) => {
    if (err) return err;
    return info;
  });
};
