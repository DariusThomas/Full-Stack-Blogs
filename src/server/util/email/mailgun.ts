import * as mailgunLoader from "mailgun-js"

let mailgun = mailgunLoader({
    apiKey:"f8a2b5f79ac30097c1740921273129be-e566273b-e4d6b319",
    domain:"sandbox3d3ec1dc973f46b7b46e1efbb2610129.mailgun.org"
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