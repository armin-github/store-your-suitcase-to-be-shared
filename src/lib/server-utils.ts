import 'server-only'
import {auth} from "@/lib/auth-no-edge";
import {redirect} from "next/navigation";
import prisma from "@/lib/db";

export const authenticateAndAuthorizeSuitcaseDataChange = async (suitcaseId: string): Promise<string> => {
    //authentication
    const session = await auth()
    if (!session?.user) redirect('/login')

    //authorization (check if the suitcase belongs to the user)
    const findResult = await prisma.suitcase.findUnique({
        where: {
            id: suitcaseId
        },
        select: {
            userId: true
        }
    })
    if (!findResult) throw new Error('Suitcase not found')

    if (findResult.userId !== session.user.id) {
        throw new Error('You are not authorized to check out this suitcase')
    }

    return session.user.id
}


export const getUserSession = async () => {
    const session = await auth()
    if (!session?.user) {
        throw new Error('user not authorized')
    }
    return session
}

/*export const findUserByEmail = async (email: string) => {
    return prisma.user.findUnique({
        where: {email}
    })
}*/
