import * as express from "express"
import authRouter from "./auth"
import apiRouter from "./api"
import Stripes from "./stripes"

 const router= express.Router();
 router.use('/donate', Stripes)
 router.use('/auth',authRouter);
 router.use('/api',apiRouter)


 export default router