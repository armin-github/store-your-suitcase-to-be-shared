'use client'

import {H1} from "@/components/h1";
import {ReadonlyURLSearchParams} from "next/navigation";
import PaymentBtn from "@/components/payment-btn";
import {useState} from "react";
import SignOutBtn from "@/components/sign-out-btn";

type PaymentProps = {
    searchParams: ReadonlyURLSearchParams & {
        success?: string
        canceled?: string
    }
}
const Page = ({searchParams}: PaymentProps) => {
    const [errorUpdatingSession, setErrorUpdatingSession] = useState(false)

    return (
        <main className={'flex flex-col items-center space-y-10'}>
            <H1>Access requires payment</H1>
            <section className={'flex flex-col gap-y-8 md:flex-row gap-x-8'}>
                <PaymentBtn success={!!searchParams.success} setErrorUpdatingSession={setErrorUpdatingSession}/>
                <SignOutBtn/>
            </section>


            {
                searchParams.success && <p className={'text-lg text-green-700 font-bold'}>Thank you for your payment. You now have a full day access.</p>
            }
            {
                searchParams.canceled && <p className={'text-sm text-red-700 font-bold'}>Payment unsuccessful. Please try again.</p>
            }
            {
                errorUpdatingSession && <p className={'text-lg text-red-700 font-bold'}>please log out and log in again to start using the application.</p>
            }


        </main>
    );
};

export default Page;