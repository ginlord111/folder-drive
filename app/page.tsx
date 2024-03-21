'use client'
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { SignIn, useOrganization } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import Image from "next/image";

export default function Home() {
  const {organization} = useOrganization()

  const files = useQuery(api.files.getFiles, organization?.id ? {orgId:organization.id}: 'skip');
  const createFile = useMutation(api.files.createFile)
 return (
<> 
  <MaxWidthWrapper className="mt-10">
      <Button>
        Sign In
        <SignIn />
      </Button>
      <Button onClick={()=>{
        if(!organization){
          return ;
        }
        createFile({
        name:"hello world",
        orgId:organization.id
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
