import {Button} from "@/components/ui/button";
import {TAuthTypes} from "@/lib/types";
import {useFormStatus} from "react-dom";

const AuthFormBtn = ({type}: {type: TAuthTypes}) => {
    //For useFormStatus() to work, it needs to be called in a component that is a child of the form component.
    const { pending } = useFormStatus()


    return (
        <Button disabled={pending}>
            {type === 'signup' && 'Sign Up'}
            {type === 'login' && 'Log In'}
        </Button>
    );
};

export default AuthFormBtn;