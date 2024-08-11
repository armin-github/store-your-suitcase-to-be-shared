'use client'
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {useEffect, useState} from "react";
import {logIn, signUp} from "@/actions/actions";
import {useRouter, useSearchParams} from "next/navigation";
import {toast} from "sonner";
import {Toaster} from "@/components/ui/sonner";
import {TAuthTypes} from "@/lib/types";
import AuthFormBtn from "@/components/auth-form-btn";


type AuthFormProps = {
    type: TAuthTypes
}
const AuthForm = ({type}: AuthFormProps) => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [isClient, setIsClient] = useState(false)

    //This is to sole the hdyration issue which is caused by some div with styling placed into <section> after shad-cn was loaded.
    useEffect(() => {
        setIsClient(true)
    },
        []
    )

    return (
        <>
            <Toaster toastOptions={{classNames: {error: 'text-red-700'} }}  position='top-center' />
            { !isClient ? <p className={'text-lg text-blue-500 font-bold'}>loading...</p> :  (
            <form className={'space-y-2'}
                  action={async (formData: FormData) => {
                      if (type === 'login') {
                          try{
                             const errMessage = await logIn(formData)
                              errMessage && toast.error(errMessage)
                          }catch (e) {
                              toast.error('Please provide valid email and password and try again.')
                          }
                          const callbackUrl = searchParams.get('callbackUrl')
                          !!callbackUrl ? router.push(callbackUrl) : router.push('/payment')
                      }
                      if (type === 'signup') {
                          try{
                              const errMessage =  await signUp(formData)
                              errMessage && toast.error(errMessage)
                          }catch (e) {
                              toast.error('Please provide valid email and password and try again.')
                          }
                      }
                  }
            }
            >
                {
                    isClient && (
                        <>
                            <section className={'space-y-1'} suppressHydrationWarning={true}>
                                <Label htmlFor={'email'}>Email</Label>
                                <Input name={'email'} id={'email'} type={'email'}/>
                            </section>
                            <section className={'space-y-1 mt-2 mb-4'} suppressHydrationWarning={true}>
                                <Label htmlFor={'password'}>Password</Label>
                                <Input name={'password'} id={'password'} type={'password'} minLength={6}/>
                            </section>
                        </>
                    )
                }


                <AuthFormBtn type={type}/>
            </form>
            )}
        </>

    )
        ;
};

export default AuthForm;