import {NextResponse} from "next/server";
import {findUserByEmail} from "@/lib/prisma-queries";
import {NextAuthConfig} from "next-auth";
import prisma from "@/lib/db";

//This approach is because of a known issue where bcrypt does not work on Edge when auth is used in middleware.
//The edge part of config will contain everything except for providers where bcrypt is used.
export const nextAuthEdgeConfig = {
    pages: {
        signIn: '/login',
    },
    callbacks: {
        authorized: async ({request, auth}) => {
            if (!auth?.user && request.nextUrl.pathname.includes('/payment')) {
                return false
            }

            if (request.nextUrl.pathname.includes('/app')) {
                if (!!auth?.user && auth?.user.hasLifetimeAccess){
                    return NextResponse.next()
                }else{
                    return false
                }
            }

            if (auth?.user && !auth?.user.hasLifetimeAccess && (request.nextUrl.pathname.includes('/login')
                || request.nextUrl.pathname.includes('/signup')
                || request.nextUrl.pathname === '/'

            ) ) {
                return NextResponse.redirect( new URL('/payment', request.nextUrl).toString())
            }
            //If user is logged in and hasLifetimeAccess and tries to access login or signup page or the homepage
            if (auth?.user && auth?.user.hasLifetimeAccess && (request.nextUrl.pathname.includes('/login')
                || request.nextUrl.pathname.includes('/signup')
                || request.nextUrl.pathname === '/'
                || request.nextUrl.pathname.includes('/payment')

            ) ) {
                return NextResponse.redirect( new URL('/app/dashboard', request.nextUrl).toString())
            }

            //Any other case
            return true
        },
        //adding token.userId to the token is not necessary because there is already token.sub with the user id.
        //But if that was not the case, the flow for adding data would be in jwt callback: add property from user to token. Then in the session callback, add the property from token to session.
        jwt:  async ({token, user, trigger}) => {
            if (user){
                //on login
                token.userId = user.id
                token.hasLifetimeAccess = user.hasLifetimeAccess
                //add email so we can fetch it on token update for db query (when user is not available)
                token.email = user.email
            }

            if (trigger === 'update'){
                //on update - user cannot be used because that is only available on login
                if (!token.email) {
                    throw new Error('Email is missing from token upon updating it.')
                }
                //This was giving an error with the approach where auth config was split into edge and no-edge.
                //So the content of findUserByEmail was used here directly.
                const userFromDb = await findUserByEmail(token.email)
              /*  const userFromDb = await prisma.user.findUnique({
                    where: {email: token.email}
                })*/
                
                if (!userFromDb) throw Error('User not found')
                token.hasLifetimeAccess = userFromDb.hasLifetimeAccess
            }

            return token
        },
        session: async ({session, token, user}) => {
            if (session.user && token.sub) {
                session.user.id = token.sub
                session.user.hasLifetimeAccess = token.hasLifetimeAccess
            }

            return session
        },

    },
    session: {
        maxAge: 24 * 60 * 60, // 24 hours
        strategy: 'jwt'
    },
    providers: [],

} satisfies NextAuthConfig