'use client'

import {useLuggageContext} from "@/hooks/use-luggage-context";

export const Stats = () => {
    const {numberOfSuitcases} = useLuggageContext()

    return (
        <section className={'text-end'}>
            <p>currently added <span className={'md:text-2xl font-bold leading-6'}>{numberOfSuitcases}</span></p>
        </section>
    );
};

