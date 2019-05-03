import * as express from "express"
import db from "../../db"
const router = express.Router()

router.delete('/:userid', async (req, res) => {
    let userId = req.params.userid;
        try {
        db.Tokens.removeToken(userId);
        res.sendStatus(200)
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
})

export default router