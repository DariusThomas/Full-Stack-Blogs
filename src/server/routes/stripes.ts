import * as express from "express"
import { charge } from "../util/payment/stripeLoader"
const router = express.Router();


router.post("/",  async (req,res)=>{
    let token = req.body.token.id;
    let amt = req.body.amount;
     try{
         let data = await charge(token,amt)
         console.log(data)
         res.send("charged")
     }catch(e){
         throw(e)
     }
})
export default router;