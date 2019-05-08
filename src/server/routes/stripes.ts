import * as express from "express"
import { charge } from "../util/payment/stripeLoader"
const router = express.Router();


router.post("/",  async (req,res)=>{
    if(req.body.token.id){
    let token = req.body.token.id;
    let amt = req.body.amount;
     try{
         let data = await charge(token,amt)
         res.send("charged")
     }catch(e){
         throw(e)
     }
    }else {
        res.sendStatus(400)
    }
})
export default router;