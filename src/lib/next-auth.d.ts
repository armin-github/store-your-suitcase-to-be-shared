import {User, Session} from "next-auth";
import {JWT} from '@auth/core/jwt'

declare module 'next-auth' {
    interface User {
        hasLifetimeAccess: boolean
    }

    interface Session {
        User: User & { hasLifetimeAccess: boolean }
    }

}

declare module '@auth/core/jwt' {
    interface JWT {
        hasLifetimeAccess: boolean
    }
}