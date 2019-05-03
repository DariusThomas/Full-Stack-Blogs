import * as express from "express"
import * as passport from "passport";

const router = express.Router()
router.post('/', (req, res, next) => {
    passport.authenticate('local', (err, userInfo, info) => {
        if (err) {
            return res.sendStatus(500);
        };
        if (!userInfo) {
            return res.sendStatus(401);
        };
        return res.json(userInfo)
    })(req,res,next)
});

export default router