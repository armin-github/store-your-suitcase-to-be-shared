import {LuggageContext} from "@/contexts/luggage-context-provider";
import {useContext} from "react";

export const useLuggageContext = () => {
    const luggageContext = useContext(LuggageContext)
    if (!luggageContext) {
        throw new Error('useLuggageContext must be used within a LuggageContextProvider')
    }

    return luggageContext
}

