'use client'

import {SuitcaseButton} from "@/components/suitcase-button";
import {useLuggageContext} from "@/hooks/use-luggage-context";

export const AddButtonWrapper = () => {
    const { numberOfSuitcases } = useLuggageContext()

    return (
        <>
            <SuitcaseButton actionType={'add'}/>
            { numberOfSuitcases >= 3 && <p className={'text-xs text-red-500'}>maximum of 3 luggage reached</p> }
        </>
    );
};

