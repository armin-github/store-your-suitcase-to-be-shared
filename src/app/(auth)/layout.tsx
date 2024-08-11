import {ReactNode} from "react";
import {Logo} from "@/components/logo";

const Layout = ({children}: {children: ReactNode}) => {
    return (
        <div className={'flex flex-col gap-y-5 justify-center items-center min-h-screen'}>
            {/* TODO: Add Logo */}
            {/*  <Logo/> */}
            {children}
        </div>
    );
};

export default Layout;