import * as express from "express"
import {sendEmail} from "../util/email/mailgun1"
const router = express.Router();

router.post('/', async (req,res,next)=>{
    let from = req.body.email;
    let subject = req.body.subject;
    let content= req.body.content
    try{
        await sendEmail("Dariusd.thomas@gmail.com",from,subject,content)
        res.send("Email sent")
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
})

export default router