'use client'
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { SignIn, SignInButton, useOrganization, useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import Image from "next/image";

export default function Home() {
  const organization = useOrganization()
  const user = useUser()  
  let orgId:string | undefined = undefined;

    if(organization.isLoaded &&  user.isLoaded){
   orgId = organization.organization?.id ?? user.user?.id
    }
  const files = useQuery(api.files.getFiles, orgId ? {orgId}: 'skip');
  const createFile = useMutation(api.files.createFile)
 return (
<> 
  <MaxWidthWrapper className="mt-10">
   <SignInButton>
    <Button>
      Sign in
    </Button>
   </SignInButton>
      <Button onClick={()=>{
        if(!orgId){
          return ;
        }
        createFile({
        name:"hello world",
        orgId,
      })}}>
        Click Me
      </Button>
      {files?.map((file) => (
        <div key={file._id} className="text-black">
          {file.name}
        </div>
      ))}
  </MaxWidthWrapper>
  </>
  );
}
