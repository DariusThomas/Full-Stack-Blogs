import * as fetch from "isomorphic-fetch"

export let AccesssToken: string = localStorage.getItem("token") || null;

export let User: any = {
    userid: localStorage.getItem("userid") || null,
    role: localStorage.getItem("role") || null,
}


export const json = async <T = any>(uri: string, method: string = "GET", body?: {}) => {

    let headers: any = {
        "Content-type": "application/json"
    };

    if (AccesssToken) {
        headers["Authorization"] = `Bearer ${AccesssToken}`
    }

    try {
        let result = await fetch(uri, {
            method,
            headers,
            body: JSON.stringify(body)
        });
        if (result.ok) {
            return result

        }
        // else{

        // console.log('here')}
    } catch (e) {
        console.log(e)
        throw (e)
    }
}

export const SetAccessToken = (token: string, user: {} = { userid: undefined, role: undefined }) => {
    AccesssToken = token;
    User = user;

    localStorage.setItem("token", AccesssToken)
    localStorage.setItem("userid", User.userid)
    localStorage.setItem("role", User.role)
}