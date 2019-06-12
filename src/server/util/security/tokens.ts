import * as crypto from "crypto"
import * as jwt from "jsonwebtoken";
import DB from "../../db"
import config from "../../config"

export const CreateToken = async (payload:IPayload)=>{
    let tokenid: any = await DB.Tokens.insertToken(payload.userid);
    payload.accesstokenid = tokenid.insertId;
    payload.unique = crypto.randomBytes(32).toString('hex');
    let token =  await jwt.sign(payload,config.auth.secret)
    await DB.Tokens.updateToken(payload.accesstokenid,token);
    return token;
};

export const ValidateToken = async (token:string)=>{
    let payload: IPayload = <IPayload>jwt.decode(token);
    let [accesstokenid]= await DB.Tokens.tokenByIdAndToken(payload.accesstokenid,token);
    if(!accesstokenid){
        throw new Error("Invalid Token!")
    }else {
        return payload
    }
}


export interface IPayload{
    [key:string] :any;
    userid: number;
    unique?:string
}