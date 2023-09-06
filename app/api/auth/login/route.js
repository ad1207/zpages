import passport from "passport";

import {setLoginSession} from '../../../../middleware/auth';
import {getUserByEmail} from '../../../../service/auth/auth.service';
import crypto from 'crypto';
import { NextResponse } from "next/server";
import { ca } from "date-fns/locale";
// const LocalStrategy = require('passport-local');
// const passport = require('passport');



const validateUser = async (username, password) => {
	const user = await getUserByEmail(username);
	if (user !== null && validatePassword(user, password)) {
        return { login: true, user: user }
	} else {
		if (user) return { login: false, error: 'Invalid username and password combination' };
		else return { login: false, error: 'User Not Found' };
	}
    
};


const authenticate = (method) =>
	new Promise((resolve, reject) => {
        console.log("method ----> ",method)
		passport.authenticate(method, { session: false }, (error, user) => {
            console.log("error ----> ",error)
			if (error) {
				resolve({ login: false, error: 'User Not Found' });
			} else {
				resolve({ login: true, user: user });
			}
		});
        reject({error: "error"})
	});

export function validatePassword(user, inputPassword) {
    const inputHash = crypto.pbkdf2Sync(inputPassword, user.salt, 1000, 64, 'sha512').toString('hex');
    const passwordsMatch = user.hashed_password === inputHash ? true : false;
    return passwordsMatch;
}
    

export async function POST(request){
    try{
        //passport.use(new LocalStrategy(validateUser));
        const req = await request.json();
        //console.log("request ----> ",req)
        const { login, user, error } = await validateUser(req.username, req.password);
        //console.log("login ----> ",login)
        if (login) {
            const response = NextResponse.json({done: true, user: user}, {status: 200});
            await setLoginSession(response, user);
            return response;
        } else {
            return NextResponse.json({done: false, error: error?.message}, {status: 200});
        }
    }catch(error){
        console.log(error);
        return NextResponse.json({done: false, error: error?.message}, {status: 500});
    }

}