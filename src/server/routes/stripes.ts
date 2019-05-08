import * as express from "express"
import { charge } from "../util/payment/stripeLoader"
const router = express.Router();


router.post("/",  async (req,res)=>{
    console.log("check",req.body.token)

     try{
        let token = req.body.token.id;
        let amt = req.body.amount;
         let data = await charge(token,amt)
         res.send("charged")
     }catch(e){
        res.sendStatus(400)
         throw(e)
     }
})
export default router;