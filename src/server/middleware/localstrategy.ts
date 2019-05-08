import * as passport from "passport"
import * as LocalStrategy from "passport-local"
import { ComparePassword } from "../util/security/passwords"
import { CreateToken } from "../util/security/tokens"
import DB from "../db"
 
let ls = new LocalStrategy.Strategy({
    usernameField: "email"
}, async (email, password, done) => {
    try {
        let [user]: any = await DB.Authors.userByEmail(email);
        console.log(user,password,ComparePassword(password, user.password) )
        if (user && ComparePassword(password, user.password)) {
            let token = await CreateToken({ userid: user.id })
            let response = {
                token,
                userid: user.id,
                role: user.role
            }
            done(null, response);
        } else {
            done(null, false)
        }
    } catch (e) {
        done(e)
    }
})
passport.use(ls)