'use client'

import Image from "next/image";
import {SuitcaseButton} from "@/components/suitcase-button";
import {toast} from "sonner";
import { Suitcase} from "@prisma/client";
import {useLuggageContext} from "@/hooks/use-luggage-context";

export const SuitcaseDetails = () => {
    const { selectedSuitcase } = useLuggageContext()

    if (!selectedSuitcase) return <div className={'h-full flex justify-center items-center '}><EmptyView/></div>

    return (
        <section className={'flex flex-col w-full h-full'}>
            <TopBar selectedSuitcase={selectedSuitcase}/>
            <div className={'flex justify-between p-10 text-[#52525b] text-base sm:text-lg font-bold '}>
                <div className={'flex flex-col gap-3'}>
                    <p>Length: {selectedSuitcase.length} cm</p>
                    <p>Width: {selectedSuitcase.width} cm</p>
                    <p>Height: {selectedSuitcase.height} cm</p>
                    <p>Weight: {selectedSuitcase.weight} kg</p>
                    <p>Color: {selectedSuitcase.color}</p>
                </div>
                <p >Owner: {selectedSuitcase.ownerName}</p>
            </div>


     {/*       <div className={'flex justify-around py-10 px-5 text-center '}>
                <div>
                    <h3 className={'text-[13px] font-medium uppercase text-zink-700 '}>Owner name</h3>
                    <p className={'mt-1 text-lg text-zink-800'}>{selectedSuitcase.ownerName}</p>

                </div>

                <div>
                    <div>
                        <h3 className={'text-[13px] font-medium uppercase text-zink-700 '}>Age</h3>
                        <p className={'mt-1 text-lg text-zink-800'}>{selectedSuitcase.length}</p>
                    </div>
                </div>
            </div>*/}

            <section
                className={'flex-1 bg-white px-7 py-5 rounded-md mb-9 mx-8 border border-light'}>{selectedSuitcase.notes}</section>

        </section>
    );
};


const TopBar = ({
                    selectedSuitcase
}: {
    selectedSuitcase: Suitcase}) => {
    const { handleCheckoutSuitcase } = useLuggageContext()


    return (
        <div className={'flex items-center bg-white px-8 py-5 border-b border-light'}>
            <h2 className={'text-3xl font-semibold leading-7 ml-5  '}>Details</h2>
            <div className={'ml-auto space-x-2'}>
                <SuitcaseButton actionType={'edit'}>Edit</SuitcaseButton>
                <SuitcaseButton
                    actionType={'checkout'}
                    onClick={async () => {
                      const err = await handleCheckoutSuitcase(selectedSuitcase.id)
                        if (err) {
                            toast.error(err.error)
                            return
                            }
                        }
                }
                >
                    Checkout
                </SuitcaseButton>
            </div>
        </div>

    )
}

const EmptyView = () => {
    return <p className={'text-2xl font-medium'}>No luggage selected.</p>
}

