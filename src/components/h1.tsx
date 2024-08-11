import {ReactNode} from 'react';
import {cn} from "@/lib/utils";

export const H1 = ({className, children}: {className?: string, children: ReactNode}) => {
    return (
        <h1 className={cn('font-medium text-2xl leading-6', className)}>
            {children}
        </h1>
    );
};

