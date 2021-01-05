require('dotenv').config({ path: './twilio.env' });

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

function sendVerificationText(pin, to) {
    client.messages
        .create({
            body: `Your verification code from Spotted is: ${pin}`,
            from: '+17047410832'
            // to: '+16505050827'
        })
        .then(message => console.log(message.sid));
}

module.exports = {
    sendVerificationText
};
