import * as mysql from "mysql";
import config from "../config/MySqlConnection";
import Blogs from "./blogs"
import Tags from "./tags"
import BlogTags from './blogtags'

export const Connection = mysql.createConnection(config.mysql)

Connection.connect(err => {
    if (err) console.log(err)
})

export const Query = (query: string, values?: Array<string | number>) => {
    return new Promise<Array<any>>((resolve, reject) => {
        Connection.query(query, values, (err, results) => {
            if (err) return reject(err);
            resolve(results)
        });
    });
}

export default {
    BlogTags,
    Blogs,
    Tags
}