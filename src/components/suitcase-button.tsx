'use client'

import {Button} from "@/components/ui/button";
import {PlusIcon} from "@radix-ui/react-icons";
import {MouseEventHandler, ReactNode, useState} from "react";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {LuggageForm} from "@/components/luggage-form";
import {flushSync} from "react-dom";
import {useLuggageContext} from "@/hooks/use-luggage-context";

type TActionType = 'add' | 'edit' | 'checkout';

type SuitcaseButtonProps = {
    actionType: TActionType
    children?: ReactNode
    onClick?:  MouseEventHandler<HTMLButtonElement>
}
export const SuitcaseButton = ({actionType, onClick, children}: SuitcaseButtonProps) => {
    const [dialogOpen, setDialogOpen] = useState(false)
    const { setSelectedSuitcaseId, numberOfSuitcases } = useLuggageContext()

    if (actionType === 'add' || actionType === 'edit'){
        return (
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                    {
                        actionType === 'add' ?
                        <Button
                            onClick={(event) => {
                                setSelectedSuitcaseId(null)
                                onClick && onClick(event)
                                }
                            }
                            size={'default'}
                            disabled={numberOfSuitcases >= 3}
                        >


                            <PlusIcon className={'h-4 w-4'}/>
                            <span className={'ml-2'}>Add luggage</span>

                        </Button>
                            :
                        <Button variant={'secondary'} onClick={(event) => onClick && onClick(event)}>
                            {children}
                        </Button>
                    }
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{actionType === 'add' ? 'Add a luggage' : 'Edit luggage' }</DialogTitle>
                    </DialogHeader>
                        <LuggageForm actionType={actionType} onFormSubmission={
                             () => {
                                 return flushSync(() => setDialogOpen(false))
                             }

                           // () => setDialogOpen(false)
                        }
                        />
                </DialogContent>
            </Dialog>
        )
    }

    if (actionType === 'checkout'){
        return (
            <Button variant={'secondary'} onClick={(event) => onClick && onClick(event)}>{children}</Button>
        );
    }
    /*This will never occur as all actionTyype have been covered. This is only for the sake of ts.*/
    return null

};

