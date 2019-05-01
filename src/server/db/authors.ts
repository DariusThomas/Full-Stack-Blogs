import { Query } from "./index"

const userById = async (id:number) => Query(" SELECT * FROM authors where id =?",[id])

const userByEmail = async (email:string) => Query("Select * From authors where email = ?",[email])

const insertAuthor = async (user:string,email:string,password:string) => Query('INSERT INTO authors (name,email,password) VALUES(?,?,?)',[user,email,password])

export default {
    userByEmail,
    userById,
    insertAuthor
}