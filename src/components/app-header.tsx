'use client'
import {Logo} from "@/components/logo";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {cn} from "@/lib/utils";


const routes = [
    {
        name: 'Management Area',
        path: '/app/dashboard',
    },
    {
        name: 'Account',
        path: '/app/account',
    }
    ]
const AppHeader = () => {
    const pathname = usePathname()

    return (
        <header className={'flex justify-between items-center border-b border-white/10 py-2 '}>
            {/* TODO: Add Logo and then ml-auto in <nav> can be removed */}
            {/*  <Logo/> */}
            <nav className={'ml-auto'}>
                <ul className={'flex gap-2 text-xs '}>
                    {
                        routes.map(route => (<li key={route.path}>
                                <Link href={route.path} className={cn(`text-white/70 rounded-sm px-2 py-1 hover:text-white
                                        focus:text-white transition`,
                                    {
                                        'bg-black/10 text-white': pathname === route.path,
                                    }
                                )}>
                                    {route.name}
                                </Link>
                        </li>
                            )
                        )
                    }
                </ul>
            </nav>


        </header>
    );
};

export default AppHeader;