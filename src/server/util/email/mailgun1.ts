import * as mailgunLoader from "mailgun-js"

let mailgun = mailgunLoader({
    apiKey:process.env.MAILGUN_API_KEY,
    domain:process.env.MAILGUN_DOMAIN
});
export const sendEmail = (to:string, from:string, subject:string, content:string) =>{
    let data ={
        to,
        from,
        subject,
        text:content
    }
    return mailgun.messages().send(data)
}