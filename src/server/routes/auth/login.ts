import * as express from "express"
import * as passport from "passport";

const router = express.Router()
router.post('/', (req, res, next) => {
    passport.authenticate('local', (err, response, info) => {
        if (err) {
            return res.sendStatus(500);
        };
        if (!response) {
            return res.sendStatus(401);
        };
        return res.status(201).json(response)
    })(req,res,next)
});

export default router