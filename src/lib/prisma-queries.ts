import prisma from "@/lib/db";

export const findUserByEmail = async (email: string) => {
    return prisma.user.findUnique({
        where: {email}
    })
}

export const findSuitcasesByUserId = async (userId: string) => {
    return prisma.suitcase.findMany({
        where: {userId: userId}
    })
}