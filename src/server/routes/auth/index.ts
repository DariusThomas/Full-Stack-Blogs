import * as express from "express"
import loginRouter from './login'
import registRouter from "./register"
import logoutRouter from "./logout"

 const router = express.Router();

 router.use('/register', registRouter)
router.use('/login', loginRouter)
router.use('/logout', logoutRouter)

 export default router;