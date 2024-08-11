import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
    return new PrismaClient()
}

declare const globalThis: {
    prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

//const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

let prisma: ReturnType<typeof prismaClientSingleton>
if (!globalThis.prismaGlobal) {
    prisma = prismaClientSingleton()
    if (process.env.NODE_ENV !== 'production')  globalThis.prismaGlobal = prisma
} else {
    prisma = globalThis.prismaGlobal
}

export default prisma

//if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma