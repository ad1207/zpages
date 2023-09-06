import cookie from 'cookie';
import {isEmpty} from '../components/utils/util';
import { getTokenCookie, setTokenCookie } from '../utils/auth-cookies';
const JWT = require('jsonwebtoken');

export async function setLoginSession(res, user) {
	const token = await signAccessToken(user.id, user.company_id, user.role);
	setTokenCookie(res, token);
}

export async function getLoginSession(req) {
	const token = getTokenCookie(req);
	if (!token) {
		return;
	}

	// Validate the expiration date of the session
	if (Date.now() > token.exp) {
		return null;
	}

	return session;
}

const signAccessToken = (id, company_id, role) => {
	return new Promise((resolve, reject) => {
		const payload = { id: id, company_id: company_id, role };
		const secret = process.env.ACCESS_TOKEN_SECRET;

		const options = { expiresIn: '20d' };

		JWT.sign(payload, secret, options, (err, token) => {
			if (err) return reject(err);
			resolve(token);
		});
	});
};

const signRefreshToken = (id, company_id, role) => {
	return new Promise((resolve, reject) => {
		const payload = { id: id, company_id: company_id, role };
		const secret = process.env.REFRESH_TOKEN_SECRET;
		const options = { expiresIn: '1y' };

		JWT.sign(payload, secret, options, (err, token) => {
			if (err) return reject(err);
			resolve(token);
		});
	});
};

export const auth =
	async (req) => {
		let cCookie = (req ? req.cookies.get('authToken') || '' : document.cookie);
		
		if (cCookie) {
			try {
				let user = JWT.verify(cCookie.value, process.env.ACCESS_TOKEN_SECRET);
				req.user = user;
				return
			} catch (error) {
				throw new Error('Authorization Failed');
			}
		}
	};

export const parseCookies = async (req) => {
	let cCookie = cookie.parse(req ? req.headers.cookie || '' : document.cookie);

	if (!isEmpty(cCookie)) {
		try {
			let user = JWT.verify(cCookie['authToken'], process.env.ACCESS_TOKEN_SECRET);
			req.user = user;
		} catch (err) {
			throw new Error(httpStatus.UNAUTHORIZE);
		}
	}

	// if (!isEmpty(cCookie)) {
	// let user = JWT.verify(cCookie['authToken'], process.env.ACCESS_TOKEN_SECRET);
	// let user_id = est.id;
	// let company_id = est.company_id;
	// let role_id = est.role;
	// console.log('dinesh....**..company_id.' + company_id);
	// if (est.exp < new Date().getTime() / 1000) {
	// 	let user_id = undefined;
	// 	let company_id = undefined;
	// 	let role_id = undefined;
	// 	return { user_id, company_id, role_id };
	// } else {
	// 	return { user_id, company_id, role_id };
	// }
	// } else {
	// 	let user_id = undefined;
	// 	let company_id = undefined;
	// 	let role_id = undefined;
	// 	return { user_id, company_id, role_id };
	// }
};
