import { Verification_Email_Template, Welcome_Email_Template } from "./EmailTemplate.js";
import { transporter } from "./Email.config.js";

/**
 * Sends a verification email to the user with a verification code.
 * @param {string} email - Recipient's email address.
 * @param {string} verificationCode - The verification code to include in the email.
 */
export const sendVerificationEmail = async (email, verificationCode) => {
    try {
      // Replace placeholder in the template with the actual verification code
      const htmlContent = Verification_Email_Template.replace("{verificationCode}", verificationCode);

      // Send the email using Nodemailer transporter
      const info = await transporter.sendMail({
        from: process.env.EMAIL,
        to: email,
        subject: "Verify Your Email ✔",
        text: "Please verify your email using the provided code.",
        html: htmlContent,
      });

      console.log("Email Sent Successfully");
      console.log("Message sent:", info.messageId);

    } catch (error) {
      console.log("Email Error:", error);
      throw new Error("Failed to send email");
    }
  };

/**
 * Sends a welcome email to the user after successful verification.
 * @param {string} email - Recipient's email address.
 * @param {string} name - Recipient's name to personalize the email.
 */
export const sendWelcomeEmail = async (email, name) => {
    try {
        // Replace placeholder in the template with the actual user name
        const htmlContent = Welcome_Email_Template.replace("{name}", name);

        // Send the email using Nodemailer transporter
        const info = await transporter.sendMail({
            from: process.env.EMAIL,
            to: email, // list of receivers
            subject: "Welcome Email", // Subject line
            text: "Welcome to Our Site", // plain‑text body
            html: htmlContent, // HTML body
          });
      
          console.log("Email Sent Successfully ");
          console.log("Message sent:", info.messageId);
      
    } catch (error) {
        console.log("Email Error: ", error);
        throw new Error("Failed to send email");
    }
}

/**
 * Sends a generic email.
 * @param {string} to - Recipient's email address.
 * @param {string} subject - Subject of the email.
 * @param {string} text - Plain text body of the email.
 */
export const sendEmail = async (to, subject, text) => {
   try {
    // Send the email using Nodemailer transporter
    const info = await transporter.sendMail({
     from: process.env.EMAIL,
     to,
     subject,
     text,
    });

    console.log("Email Sent Successfully ");
    console.log("Message sent:", info.messageId);

   } catch (error) {
    console.log("Email Error: ", error);
    throw new Error("Failed to send email");
   }
}