var sendMail = require('node-email-sender/emailer');

function confirmation_email(receiver){
    var confirm_address = "http://bullwatch.com."
    var link = confirm_address.link("http://bullwatch.com./confirm?email="+receiver)
    console.log(link);
    emailConfig = {
        emailFrom:'saeh8962@colorado.edu',
        transporterConfig:{
            service: 'gmail',
            auth: {
                user: 'saeh8962@colorado.edu',
                pass: 'tisfow-sukxi8-rokPyq'
            }
        }
    }
    var response = sendMail.sendMail({
        emailConfig: emailConfig,
        to: receiver,
        subject: "Welcome to BullWatch!",
        content: "Welcome to BullWatch, the web application that makes it simple to track the stocks you care about. \n" + 
        "Please click the following link to verify your email:" + link
    });
    console.log("confirmation email sent to",receiver);

}

function sendEmail(){

}

module.exports = {sendEmail, confirmation_email};