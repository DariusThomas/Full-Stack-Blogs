import * as express from "express"
import { HashPassword } from '../../util/security/passwords'
import { CreateToken } from '../../util/security/tokens'
import db from "../../db";
const router = express.Router();

router.post('/', async (req, res, next) => {
    let user = req.body
    let ExistingEmail = await db.Authors.userByEmail(user.email)
    console.log(ExistingEmail)
    if (ExistingEmail) {
        res.sendStatus(401)
    } else {
        try {
            user.password = HashPassword(req.body.password);
            let result: any = await db.Authors.insertAuthor(user.user, user.email, user.password);
            let token = await CreateToken({ userid: result.insertId });
            res.json({
                token,
                userid: result.insertId,
                role: "guest"
            });
        } catch (e) {
            console.log(e)
            res.sendStatus(500)
        }
    }
})

export default router;