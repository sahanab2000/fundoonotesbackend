const nodemailer = require ('nodemailer')
const { google } = require('googleapis')

const CLIENT_ID = '760283438146-497qn8a2bgsod4oj037vmhelq6pnnlcv.apps.googleusercontent.com'
const CLIENT_SECRET = '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'
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//04vlXMF7ycAgoCgYIARAAGAQSNwF-L9Irq--MumUgsuTyHFkqIrR02McFuzBMQrzj4OCCD5s3uUEdMBWsLtjGql7LDdoyQyKv77E';

const oAuth2client=new google.auth.OAuth2(CLIENT_ID,CLIENT_SECRET,REDIRECT_URI);
oAuth2client.setCredentials({refresh_token:REFRESH_TOKEN});
 
export const sendMail = async (email) => {
    try {
        const accessToken= await oAuth2client.getAccessToken()
        const transport=nodemailer.createTransport({
            service:'gmail',
            auth:{
                type:'OAuth2',
                user:'sahanabasavaraj5@gmail.com',
                clientId:CLIENT_ID,
                clientSecret:CLIENT_SECRET,
                refreshToken:REFRESH_TOKEN,
                accessToken:accessToken
            }
        })
        const mailoption={
            from:'YOURSSAHANA <sahanabasavaraj5@gmail.com>',
            to: email,
            subject:"Hello from gmail using api",
            text: 'Hello this is sahana',
            html:'<h1>Hello from gmail using api</h1>',
        };
        const result= await transport.sendMail(mailoption)
        return result;
        
    } catch (error) {
        return error;
        
    }

}
/* sendmail()
 .then(result=> console.log("email sent.....",result))
 .catch((error) => console.log(error.message)); */
