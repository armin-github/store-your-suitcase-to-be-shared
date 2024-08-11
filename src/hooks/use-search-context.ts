import {useContext} from "react";
import {SearchContext} from "@/contexts/search-context-provider";

export const useSearchTextContext = () => {
    const searchContext = useContext(SearchContext)
    if (!searchContext) {
        throw new Error('useSearchTextContext must be used within a SearchContextProvider')
    }

    return searchContext
}