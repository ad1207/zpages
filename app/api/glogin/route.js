import passport from 'passport';
import passportGoogle from 'passport-google-oauth'
import { NextRequest, NextResponse } from "next/server";
import { createEdgeRouter } from "next-connect";


const GoogleStrategy = passportGoogle.OAuth2Strategy;

const strategyOptions = {
	clientID: process.env.GOOGLE_CLIENT_ID,
	clientSecret: process.env.GOOGLE_CLIENT_SECRET,
	callbackURL: `http://localhost:3000/api/google/callback`,
};

passport.use(
	new GoogleStrategy(strategyOptions, function (accessToken, refreshToken, profile, done) {
		return done(null, profile);
	}),
);

const authenticate = (method, req, res) =>
	new Promise((resolve, reject) => {
		passport.authenticate(
			method,
			{
				scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email'],
			},
			(error, token) => {
				if (error) {
					reject(error);
				} else {
					resolve(token);
				}
			},
		)(req, res);
	});

const router = createEdgeRouter();

router
    .use(passport.initialize())
    .get(async (req, res) => {
		try {
			const user = await authenticate('google', req, res);

			// session is the payload to save in the token, it may contain basic info about the user
			// const session = { ...user };

			// await setLoginSession(res, session);
            return NextResponse.json({done: true},{status: 200})
			
		} catch (error) {
			console.error(error);
            return NextResponse.json(error.message,{status: 401})
		}
	})
    // .use(
    //     cookieSession({
    //         maxAge: 24 * 60 * 60 * 1000,
    //         keys: [keys.session.cookieKey],
    //     })
    // )
    // .use(passport.session())


export async function GET(request, ctx) {
    return router.run(request, ctx);
}