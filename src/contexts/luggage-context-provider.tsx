'use client'
import {createContext, ReactNode, useEffect, useState, useOptimistic, useTransition} from "react";
import { Suitcase } from '@prisma/client'
import {SuitcaseEssentials} from "@/lib/types";
import {useSearchTextContext} from "@/hooks/use-search-context";
import {addSuitcase, editSuitcase, checkOutSuitcase} from "@/actions/actions";

export type TLuggageContext = {
    suitcases: Suitcase[]
    selectedSuitcaseId: string | null
    setSelectedSuitcaseId: (id: string | null) => void
    selectedSuitcase: Suitcase | null
    numberOfSuitcases: number
    filteredSuitcases: Suitcase[]
    handleCheckoutSuitcase: (id: Suitcase['id']) => Promise<void | {error: string}>
    handleAddSuitcase: (newSuitcase: SuitcaseEssentials) => Promise<void | {error: string}>
    handleEditSuitcase: (id: Suitcase['id'], updatedSuitcase: SuitcaseEssentials) => Promise<void | {error: string}>
}
export const LuggageContext = createContext<TLuggageContext | null>(null)

type LuggageContextProviderProps = {
    children: ReactNode;
    suitcaseData: Suitcase[];
}

export const LuggageContextProvider = ({suitcaseData, children}: LuggageContextProviderProps) => {
    const [isPending, startTransition] = useTransition()

   const [optimisticSuitcases, setOptimisticSuitcases] = useOptimistic(suitcaseData, (state, {action, payload}) => {
       switch (action){
           case 'add':
               return [...state, payload]
           case 'edit':
               return state.map(suitcase => suitcase.id === payload.suitcaseId ? payload.updatedSuitcase : suitcase  )
           case 'delete':
               return state.filter(suitcase => suitcase.id !== payload.suitcaseId)
           default:
               return state
       }
   }

   )

    const [filteredSuitcases, setFilteredSuitcases] = useState<Suitcase[]>(optimisticSuitcases)
    const [selectedSuitcaseId, setSelectedSuitcaseId] = useState<string | null>(null)
    const { searchText } = useSearchTextContext()

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setFilteredSuitcases(optimisticSuitcases.filter(suitcase => suitcase.ownerName.toLowerCase().includes(searchText.toLowerCase())))

        }, 200)

        return () =>  clearTimeout(timeoutId)
    },
        [searchText, optimisticSuitcases]
    )

    useEffect(() => {
        setFilteredSuitcases(suitcaseData)
    }, [suitcaseData]);


    const selectedSuitcase = optimisticSuitcases.find(suitcase => suitcase.id === selectedSuitcaseId) || null
    const numberOfSuitcases = optimisticSuitcases.length

    const handleAddSuitcase = async (newSuitcase: SuitcaseEssentials) => {
        const newSuitcaseId = Math.random().toString(36).slice(2, 9)
        setOptimisticSuitcases({
            action: 'add',
            payload: {...newSuitcase, id: newSuitcaseId},
        })
        try {
            await addSuitcase(newSuitcase)
        } catch (err) {
            return {
                error: 'could not add suitcase.'
            }
        }

    }

    const handleEditSuitcase = async (suitcaseId: Suitcase['id'], updatedSuitcase: SuitcaseEssentials) => {
        startTransition(() => {
            setOptimisticSuitcases({
                action: 'edit',
                payload: {suitcaseId, updatedSuitcase},
            })
        })

        try {
            await editSuitcase(suitcaseId, updatedSuitcase)
        } catch (error) {
            return {
                error: 'could not edit luggage data.'
            }
        }
    }

    const handleCheckoutSuitcase = async (id: Suitcase['id']) => {
       setOptimisticSuitcases({
           action: 'delete',
           payload: {suitcaseId: id},
       })
        try {
            await checkOutSuitcase(id)
        } catch (error) {
            return {
                error: 'could not checkout luggage.'
            }
        }
    }


    return (
        <LuggageContext.Provider value={{
            suitcases: optimisticSuitcases,
            selectedSuitcaseId,
            setSelectedSuitcaseId,
            selectedSuitcase,
            numberOfSuitcases,
            filteredSuitcases,
            handleCheckoutSuitcase,
            handleAddSuitcase,
            handleEditSuitcase,
        }}>
            {children}
        </LuggageContext.Provider>
    )
}