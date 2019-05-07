import * as mailgunLoader from "mailgun-js"

let mailgun = mailgunLoader({
    apiKey:"",
    domain:""
});
//
export const sendEmail = (to:string, from:string, subject:string, content:string) =>{
    let data ={
        to,
        from,
        subject,
        text:content
    }
    return mailgun.messages().send(data)
}