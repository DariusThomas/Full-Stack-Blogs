import * as express from "express"
import loginRouter from './login'
import registRouter from "./register"
 const router = express.Router();

 router.use('/register', registRouter)
router.use('/login', loginRouter)


 export default router;