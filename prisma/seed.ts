import { Prisma, PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput = {
    email: "arminpeymann@gmail.com",
    hashedPassword: "",
    suitcases: {
        create: [
            {
                color: "blue",
                length: 20,
                width: 10,
                height: 10,
                weight: 5,
                ownerName: "Armin",
                notes: "Fits well.",
            },
            {
                color: "black",
                length: 50,
                width: 20,
                height: 20,
                weight: 8,
                ownerName: "Armin",
                notes: "Heavy.",
            },
        ],
    },
};

async function main() {
    console.log(`Start seeding ...`);

    const hashedPassword = await bcrypt.hash("example", 10);
    userData.hashedPassword = hashedPassword;

    await prisma.user.create({
        data: userData,
    });

    console.log(`Seeding finished.`);
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });