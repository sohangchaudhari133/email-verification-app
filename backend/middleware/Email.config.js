import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user:"Your Email",   //your Mail (Sender)
      pass:"App Password"  // your app password (sender)
    },
  });

  /* 
  Note: You have to enable 2 steps verification to get "App password"
  An App Password in a Google account is only available after enabling 2-Step Verification.
  Remember the configuration, In my case i have to pass user and pass in raw string rather than using them from environment variables (In this file only).
  */