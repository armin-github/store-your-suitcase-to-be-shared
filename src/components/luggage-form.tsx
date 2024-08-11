
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {FormEvent, useTransition} from "react";
import {SuitcaseEssentials} from "@/lib/types";
import AddEditFormButton from "@/components/add-edit-form-button";
import {toast} from "sonner";
import {useForm} from "react-hook-form";
import { z } from 'zod'
import {zodResolver} from "@hookform/resolvers/zod";
import {LuggageFormSchema} from "@/lib/validation-schemas";
import {useLuggageContext} from "@/hooks/use-luggage-context";


type LuggageFormProps = {
    actionType: 'add'  | 'edit'
    onFormSubmission: () => void
}

type TLuggageForm = z.infer<typeof LuggageFormSchema>


export const LuggageForm = ({actionType, onFormSubmission}: LuggageFormProps) => {
    const { handleAddSuitcase, selectedSuitcase, handleEditSuitcase} = useLuggageContext()
    const [isPending, startTransition] = useTransition()
    const { register, formState: {
        errors,
    },
        handleSubmit,
        trigger,
    } = useForm<TLuggageForm>({
        //TODO: continue here
        resolver: zodResolver(LuggageFormSchema),
        defaultValues: {
            length: selectedSuitcase?.length,
            width: selectedSuitcase?.width,
            height: selectedSuitcase?.height,
            weight: selectedSuitcase?.weight,
            color: selectedSuitcase?.color,
            ownerName: selectedSuitcase?.ownerName,
            notes: selectedSuitcase?.notes,
        }
    })


    const submitHandler =  async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)




        const newSuitcase: SuitcaseEssentials = {
            length: +(formData.get('length') as string),
            width: +(formData.get('width') as string),
            height: +(formData.get('height') as string),
            weight: +(formData.get('weight') as string),
            color: formData.get('color') as string,
            ownerName: formData.get('ownerName') as string,
            notes: formData.get('notes') as string,
        }
        //close the dialog immediately without waiting for the server response
        onFormSubmission()


        if (actionType === 'add'){
          const err = await handleAddSuitcase(newSuitcase)
            if (err) {
                toast.error(err.error)
                return
            }
        }else if (actionType === 'edit'){
         const err = await handleEditSuitcase(selectedSuitcase?.id as string, newSuitcase)
            if (err) {
                toast.error(err.error)
                return
            }
        }

    }

    const submitActionHandler =  async (formData: FormData) => {
        const formValidationResult = await trigger()
        if (!formValidationResult) return

        const newSuitcase: SuitcaseEssentials = {
            length: +(formData.get('length') as string),
            width: +(formData.get('width') as string),
            height: +(formData.get('height') as string),
            weight: +(formData.get('weight') as string),
            color: formData.get('color') as string,
            ownerName: formData.get('ownerName') as string,
            notes: formData.get('notes') as string,
        }



        /*const validatedSuitcase = LuggageFormSchema.safeParse(newSuitcase)
        if (!validatedSuitcase.success) return*/

        //close the dialog immediately without waiting for the server response
        onFormSubmission()

        if (actionType === 'add'){
            const err = await handleAddSuitcase(newSuitcase)
            if (err) {
                toast.error(err.error)
                return
            }
        } else if (actionType === 'edit'){
            const err = await handleEditSuitcase(selectedSuitcase?.id as string, newSuitcase)
            if (err) {
                toast.error(err.error)
                return
            }
        }

    }

    return (
        <form
            /*onSubmit={ handleSubmit(data => {
                console.log('data', data)

                  //  startTransition(() => submitHandler(data))

                })
            }*/

           action={(formData: FormData) => startTransition(() => {
                submitActionHandler(formData)
            })
            }
        >
            <div className={'space-y-3'}>
                <section className={'space-y-1'}>
                    <Label htmlFor={'length'}>Luggage length (cm)</Label>
                    <Input
                        id={'length'}
                        {...register('length')}
                    />
                    {errors.length && <p className={'text-red-500'}>{errors.length.message}</p>}
                </section>
                <section className={'space-y-1'}>
                    <Label htmlFor={'width'}>Luggage width (cm)</Label>
                    <Input
                        id={'width'}
                        {...register('width')}
                    />
                    {errors.width && <p className={'text-red-500'}>{errors.width.message}</p>}
                </section>
                <section className={'space-y-1'}>
                    <Label htmlFor={'name'}>Luggage height (cm)</Label>
                    <Input
                        id={'height'}
                        {...register('height')}
                    />
                    {errors.height && <p className={'text-red-500'}>{errors.height.message}</p>}
                </section>
                <section className={'space-y-1'}>
                    <Label htmlFor={'weight'}>Luggage weight (kg)</Label>
                    <Input
                        id={'weight'}
                        {...register('weight')}
                    />
                    {errors.weight && <p className={'text-red-500'}>{errors.weight.message}</p>}
                </section>
                <section className={'space-y-1'}>
                    <Label htmlFor={'color'}>Luggage color</Label>
                    <Input
                        id={'color'}
                        {...register('color')}
                    />
                    {errors.color && <p className={'text-red-500'}>{errors.color.message}</p>}
                </section>

                <section className={'space-y-1'}>
                    <Label htmlFor={'ownerName'}>Owner name</Label>
                    <Input
                        id={'ownerName'}
                        {...register('ownerName')}
                    />
                    {errors.ownerName && <p className={'text-red-500'}>{errors.ownerName.message}</p>}
                </section>

                <section className={'space-y-1'}>
                    <Label htmlFor={'notes'}>Notes</Label>
                    <Textarea
                        id={'notes'}
                        rows={3}
                        {...register('notes')}
                    />
                    {errors.notes && <p className={'text-red-500'}>{errors.notes.message}</p>}
                </section>
            </div>
            <div className={'flex'}>
                <AddEditFormButton actionType={actionType}/>
            </div>
        </form>
    );
};

