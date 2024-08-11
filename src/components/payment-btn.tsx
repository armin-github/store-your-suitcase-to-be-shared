import {createCheckoutSession} from "@/actions/payment-actions";
import {Button} from "@/components/ui/button";
import {useState, useTransition} from "react";
import {useSession} from "next-auth/react";
import {redirect, useRouter} from "next/navigation";

type PaymentBtnProps = {
    success: boolean
    setErrorUpdatingSession: (error: boolean) => void
}
const PaymentBtn = ({success, setErrorUpdatingSession}: PaymentBtnProps) => {
    const [isPending, startTransition] = useTransition()
    const { data: session, update } = useSession()
    const router = useRouter()


   const shouldGoToPaymentProvider = !success && !session?.user?.hasLifetimeAccess

    return (
        <Button
            disabled={isPending}
            onClick={() => {
                startTransition(async () => {
                    shouldGoToPaymentProvider && await createCheckoutSession()
                  if (success && !session?.user?.hasLifetimeAccess){
                        const updatedSession = await update(true)
                        if (!updatedSession?.user?.hasLifetimeAccess){
                            setErrorUpdatingSession(true)
                        }else {
                            router.push('/app/dashboard')
                        }
                  }
                }  )
            }
            }
        >
            {shouldGoToPaymentProvider && 'Buy full-day access for €14'}
            {success && !session?.user?.hasLifetimeAccess && 'click here to start using the application.'}

        </Button>
    );
};

export default PaymentBtn;