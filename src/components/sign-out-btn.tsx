'use client'

import {Button} from "@/components/ui/button";
import {logout} from "@/actions/actions";
import {useTransition} from "react";

const SignOutBtn = () => {
    const [isPending, startTransition] = useTransition()

    return (
        <>
            <Button onClick={() => {
               startTransition(() => logout()  )
                }
            }
            disabled={isPending}
            >
                Log out
            </Button>
        </>
    );
};

export default SignOutBtn;