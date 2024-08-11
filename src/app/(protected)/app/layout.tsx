import {ReactNode} from "react";
import AppFooter from "@/components/app-footer";
import AppHeader from "@/components/app-header";
import BackgroundPattern from "@/components/background-pattern";
import {SearchContextProvider} from "@/contexts/search-context-provider";
import {Toaster} from "@/components/ui/sonner";
import {fetchSuitcaseData} from "@/actions/actions";
import {LuggageContextProvider} from "@/contexts/luggage-context-provider";

const Layout = async ({children}: {children: ReactNode}) => {
    const suitcaseData = await fetchSuitcaseData()
    if (!suitcaseData) return null

    return (
        <>
            <BackgroundPattern/>
            <div className={'flex flex-col h-[100vh] max-w-[1050px] mx-auto px-4 lg:px-0'}>
                <AppHeader/>
                <SearchContextProvider>
                <LuggageContextProvider suitcaseData={suitcaseData}>
                    {children}
                </LuggageContextProvider>
                </SearchContextProvider>
                <AppFooter/>
            </div>
            <Toaster toastOptions={{classNames: {error: 'text-red-700'} }}  position='top-center' />
        </>

    );
};

export default Layout;