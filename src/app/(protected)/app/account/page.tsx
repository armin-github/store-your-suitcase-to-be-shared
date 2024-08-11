import {H1} from "@/components/h1";
import {ContentBlock} from "@/components/content-block";
import {redirect} from "next/navigation";
import SignOutBtn from "@/components/sign-out-btn";
import {auth} from "@/lib/auth-no-edge";

export default async function Page() {
 const session = await auth()
    //There have been reports claiming that middleware sometimes does not run. This is to make sure we won't have any issues.
 if (!session?.user) redirect('/login')

  return (
    <main >
    <H1 className={'my-8 text-white'}>Your Account</H1>
      <ContentBlock className={'h-[500px] flex justify-center items-center flex-col gap-3'}>
        <p>logged in as {session.user.email}</p>
          <SignOutBtn/>
      </ContentBlock>
    </main>
  );
}
