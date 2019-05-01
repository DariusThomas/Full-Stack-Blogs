import * as passport from "passport"
import * as BearerStrategy from "passport-http-bearer"

import { ValidateToken } from "../util/security/tokens"
import DB from "../db"

let bs = new BearerStrategy.Strategy(async (token, done) => {
    try {
        let payload = await ValidateToken(token);
        let [user] = await DB.Authors.userById(payload.userid)
        if(user){
            done(null,user);
        }else {
            done(null,false)
        }
    } catch (e) {
        done(e);
    }
});


passport.use(bs)