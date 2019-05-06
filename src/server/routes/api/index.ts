import BlogsRoutes from "./BlogRoutes"
import * as express from "express"
import * as passport from "passport"
const router = express.Router();




router.use('/',(req, res, next) => {
    passport.authenticate('bearer', (err, user, info) => {
        if (user) {
            req.user = user;
        }
        return next()
    })(req, res, next);
});


router.use('/blogs', BlogsRoutes)

export default router