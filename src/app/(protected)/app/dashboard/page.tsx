import {Stats} from "@/components/stats";
import {Branding} from "@/components/branding";
import {SearchForm} from "@/components/search-form";
import {SuitcaseList} from "@/components/suitcase-list";
import {SuitcaseDetails} from "@/components/suitcase-details";
import {ContentBlock} from "@/components/content-block";
import {redirect} from "next/navigation";
import {auth} from "@/lib/auth-no-edge";
import {AddButtonWrapper} from "@/components/add-button-wrapper";

export default async function Page() {
    const session = await auth()
    //There have been reports claiming that middleware sometimes does not run. This is to make sure we won't have any issues.
    if (!session?.user) redirect('/login')

  return (
    <main >
      <div className={'text-white py-8 flex justify-between items-center'}>
        <Branding/>
        <Stats/>
      </div>

        <div className={'grid md:grid-cols-3 grid-rows-[300px_500px] md:grid-rows-[45px_1fr] gap-10 md:gap-4 md:h-[600px] '}>
           {/*
            <div className={'md:col-start-1 md:col-span-1 row-start-1 row-span-1'}>
                <SearchForm/>
            </div>
            */}

            <div className={'md:row-start-1 md:row-span-full relative'}>
                <ContentBlock
                    className={'overflow-y-auto md:overflow-y-hidden'}
                >
                    <SuitcaseList />
                    <div className={'absolute bottom-4 right-4'} >

                    <AddButtonWrapper/>

                    </div>
                </ContentBlock>
            </div>

            <div className={'md:row-start-1 md:row-span-full md:col-start-2 md:col-span-full'}>
                <ContentBlock>
                    <SuitcaseDetails/>
                </ContentBlock>
            </div>
        </div>
    </main>
);
}
