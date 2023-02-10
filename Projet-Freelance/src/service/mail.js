const nodemailer = require("nodemailer");

// Function that will send an email to both the user and the admin when a new user is created
exports.sendMail = async (user) => {
  // Create a SMTP transporter object
  let transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // Message object
  let message = {
    from: "Freelancer < " + process.env.EMAIL + " >",
    to: user.Mail,
    subject: "Bienvenue sur Freelancer !",
    text:
      "Bonjour " +
      user.Nom +
      " " +
      user.Prenom +
      ",\n" +
      "Bienvenue sur Freelancer !" +
      "\n" +
      "Cordialement, \n" +
      "L'équipe Freelancer",
  };

  let messageAdmin = {
    from: "Freelancer < " + process.env.EMAIL + " >",
    to: process.env.EMAIL,
    subject: "Nouvel utilisateur créé !",
    text:
      "Bonjour,\n" +
      "Un nouvel utilisateur vient d'être créé sur Freelancer !" +
      "\n" +
      "Cordialement, \n" +
      "L'équipe Freelancer",
  };

  // Send the email
  transporter.sendMail(message, (err, info) => {
    if (err) {
      console.log("Error occurred. " + err.message);
      return process.exit(1);
    }
    console.log("Message sent: %s", info.messageId);
  });

  transporter.sendMail(messageAdmin, (err, info) => {
    if (err) {
      console.log("Error occurred. " + err.message);
      return process.exit(1);
    }
    console.log("Message sent: %s", info.messageId);
  });
};
