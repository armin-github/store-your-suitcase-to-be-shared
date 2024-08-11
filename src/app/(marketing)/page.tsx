

import Image from "next/image";
import {Logo} from "@/components/logo";
import {Button} from "@/components/ui/button";
import Link from "next/link";

export default function Home() {

  return (
    <main className={`bg-[#bae6fd] min-h-screen flex flex-col xl:flex-row items-center justify-center gap-10 `}>
    <div className={'pl-4 pr-4 md:pl-0 md:pr-0'}>
        {/* TODO: Add logo */}
      {/*  <Logo/>*/}

        <div >
            <h1 className={'text-5xl font-semibold my-6 max-w-[500px]'}>
                You are in town for a day and need to drop off your luggage?
            </h1>
            <p className={'text-2xl font-medium max-w-[600px] '} >
                We are located at the center of town and store up to three pieces of luggage for you!
            </p>
            <p className={'text-base md:text-xl font-medium mt-4 max-w-[600px] '}>Create an account under a minute and you are good to go.</p>
        </div>

        <div className={'mt-10 space-x-3'} >
            <Button asChild={true}>
                <Link href={'/signup'}>Get started</Link>
            </Button>
            <Button asChild={true} variant={'secondary'}><Link href={'/login'}>Log in</Link></Button>
        </div>



    </div>
    </main>
  );
}
