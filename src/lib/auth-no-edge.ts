import NextAuth, {NextAuthConfig} from "next-auth";
import Credentials from "@auth/core/providers/credentials";
import bcrypt from "bcryptjs";
import {findUserByEmail} from "@/lib/prisma-queries";
import {nextAuthEdgeConfig} from "@/lib/auth-edge";

//This approach is because of a known issue where bcrypt does not work on Edge when auth is used in middleware.
const config = {
...nextAuthEdgeConfig,
 providers: [
     Credentials({
         authorize: async (credentials) => {
             const {email, password} = credentials as {email: string, password: string}
             const user = await findUserByEmail(email)
             if (!user){
                 console.log('User not found')
                 return null
             }
            const passwordsMatch = await bcrypt.compare(password, user.hashedPassword)
             if (!passwordsMatch) {
                 console.log('Passwords do not match')
                 return null
             }

             return user
         }
     })
 ],



} satisfies NextAuthConfig

export const { auth, signIn, signOut, handlers: { GET, POST } } = NextAuth(config)