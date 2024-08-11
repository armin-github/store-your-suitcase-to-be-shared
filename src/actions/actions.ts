'use server'

import prisma from "@/lib/db";
import { SuitcaseEssentials} from "@/lib/types";
import {revalidatePath} from "next/cache";
import { Prisma, Suitcase} from "@prisma/client";
import {AuthSchema, LuggageFormSchema} from "@/lib/validation-schemas";
import bcrypt from "bcryptjs";
import {redirect} from "next/navigation";
import { authenticateAndAuthorizeSuitcaseDataChange} from "@/lib/server-utils";
import {findSuitcasesByUserId} from "@/lib/prisma-queries";
import {AuthError} from "next-auth";
import {auth, signIn, signOut} from "@/lib/auth-no-edge";


export const fetchSuitcaseData = async () => {
    const session = await auth()
    if (!session?.user) redirect('/login')

    let suitcaseData
    try {
        if (prisma.suitcase){
            suitcaseData = await findSuitcasesByUserId(session.user.id)
        }
    } catch (e){
        throw new Error('Failed to fetch suitcases from db.')
    }

    return suitcaseData
}



export const addSuitcase = async (suitcase: SuitcaseEssentials) => {
    const session = await auth()
    session?.user?.id || redirect('/login')
    const userId = session?.user?.id
    const validatedSuitcase = LuggageFormSchema.parse(suitcase)
    await prisma.suitcase.create({
        data: {...validatedSuitcase,
            user: {
                connect: {id: userId},
            }
        }
    })

    revalidatePath('/app/dashboard', 'layout')
}

export const editSuitcase = async (suitcaseId: Suitcase['id'], updatedSuitcase: SuitcaseEssentials) => {
    //validation
    const validatedSuitcase = LuggageFormSchema.parse(updatedSuitcase)
    //authentication and authorization
    const userId = await authenticateAndAuthorizeSuitcaseDataChange(suitcaseId)
    await prisma.suitcase.update({
        where: {
            id: suitcaseId,
            user: {
                id: userId
            }
        },
        data: validatedSuitcase
    })

    revalidatePath('/app/dashboard', 'layout')
}

export const checkOutSuitcase = async (suitcaseId: Suitcase['id']) => {
    //authentication and authorization
   const userId = await authenticateAndAuthorizeSuitcaseDataChange(suitcaseId)

    //now, we may delete suitcase.
    await prisma.suitcase.delete({
        where: {
            id: suitcaseId,
            user:{
                id: userId
            }
        }
    })

    revalidatePath('/app/dashboard', 'layout')
}

export const logIn = async (formData: FormData): Promise<void|string> => {
        const authData = Object.fromEntries(formData.entries())
        const validatedAuthData = AuthSchema.parse(authData)

    try {
        await signIn('credentials', validatedAuthData)
    }catch (e){
            if (e instanceof AuthError){
                switch (e.type){
                    case 'CredentialsSignin':
                        return 'Invalid email or password. Please try again.'
                    default:
                        return 'An error occurred with your login. Please try again.'
                }
            }

    }


}

export const logout = async () => {
    await signOut({redirectTo: '/'})
}

export const signUp = async (formData: FormData): Promise<void|string> => {
    const signUpData = Object.fromEntries(formData.entries()) as {email: string, password: string}
    const validatedSignUpData = AuthSchema.parse(signUpData)


    const hashedPassword = await bcrypt.hash(validatedSignUpData.password, 10)
    try {
        await prisma.user.create({
            data: {
                email: validatedSignUpData.email,
                hashedPassword: hashedPassword
            }
        })
    }catch (e){
        if ( e instanceof Prisma.PrismaClientKnownRequestError){
            if (e.code === 'P2002'){
             return  'Email already exists. Please try another email.'
            }
        }
    }


    await logIn(formData)
    redirect('/payment')
}