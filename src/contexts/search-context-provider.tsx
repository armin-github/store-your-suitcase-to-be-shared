'use client'
import {ChangeEvent, createContext, ReactNode, useState} from "react";

export type TSearchContext = {
    searchText: string
    searchHandler: (event: ChangeEvent<HTMLInputElement>) => void
}
export const SearchContext = createContext<TSearchContext | null>(null)

type SearchContextProviderProps = {
    children: ReactNode;
}

export const SearchContextProvider = ({children}: SearchContextProviderProps) => {
    const [searchText, setSearchText] = useState('')




    const searchHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value)
    }



    return (
        <SearchContext.Provider value={{
            searchText,
            searchHandler,

        }}>
            {children}
        </SearchContext.Provider>
    )
}