'use client'

import Image from "next/image";
import {cn} from "@/lib/utils";
import {Suitcase} from "@prisma/client";
import {useLuggageContext} from "@/hooks/use-luggage-context";


export const SuitcaseList = () => {
    const { filteredSuitcases, selectedSuitcaseId, setSelectedSuitcaseId } = useLuggageContext()

    return (
        <ul className={'bg-white border-b border-light'}>
            {
                filteredSuitcases.map((suitcase: Suitcase) => (
                    <li key={suitcase.id} className={'mb-4'}>
                        <div className={'p-5 text-[#52525b] text-[0.875rem] font-bold'}>
                            <div className={'flex justify-between mb-2'}>
                                <p>length: {suitcase.length} cm</p>
                                <p>color: {suitcase.color}</p>
                            </div>
                            <div className={'flex justify-between'}>
                                <p>width: {suitcase.width} cm</p>
                                <p>height: {suitcase.height} cm</p>

                            </div>

                            <button
                                className={cn(`flex h-[70px] w-full cursor-pointer items-center px-5 text-[#262626] text-base gap-3
                                        rounded bg-[#EFF1F2] hover:bg-[#EFF1F2] focus:bg-[#a3a3a3] mt-4 font-medium justify-center`,
                                selectedSuitcaseId === suitcase.id ? 'bg-[#EFF1F2]' : '',
                            )
                            }
                            onClick={() => setSelectedSuitcaseId(suitcase.id)}
                        >
                                <span>Show details</span>
                        </button>
                        </div>
                    </li>
                    )
                    )
                        }
                </ul>
)
    ;
};

