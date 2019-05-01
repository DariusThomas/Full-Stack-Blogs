import { Query } from "./index"

const tokenByIdAndToken = async(userid:number, token:string) => Query("SELECT * FROM accesstokens WHERE id =? AND token = ?",[userid,token])

const insertToken = async(userid:number) => Query("INSERT INTO accesstokens (userid) VALUES(?)",[userid]);

const updateToken =async(userid:number,token:string) => Query("UPDATE accesstokens SET token = ? WHERE id = ?",[token,userid])

export default {
    tokenByIdAndToken,
    insertToken,
    updateToken
}