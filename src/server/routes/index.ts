import * as express from "express"
import authRouter from "./auth"
import apiRouter from "./api"
import Stripes from "./stripes"
import email from "./mail"

 const router= express.Router();
 router.use('/donate', Stripes)
 router.use('/auth',authRouter);
 router.use('/api',apiRouter)
//router.use('/ContactUs',email)

 export default router