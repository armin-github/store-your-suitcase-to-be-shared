import {H1} from "@/components/h1";
import AuthForm from "@/components/auth-form";
import Link from "next/link";
import {Suspense} from "react";

const Page = async () => {

    return (
        <main>
            <H1 className={'text-center mb-5'}>Sign Up</H1>
            <Suspense>
            <AuthForm type={'signup'}/>
            </Suspense>
                <p className={'mt-6 text-sm text-zinc-500'}>
                    Already have an account?
                    <Link href={'/login'} className={'font-medium'}>Log In</Link>
                </p>
        </main>
    );
};

export default Page;
