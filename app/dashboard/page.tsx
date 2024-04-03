"use client";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";

import {
  SignIn,
  SignInButton,
  UserButton,
  useOrganization,
  useUser,
} from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import Image from "next/image";
import { hasAccessToOrg } from "@/convex/files";
export default function DashboardPage() {

  const organization = useOrganization();
  const user = useUser();
  let orgId: string | undefined = undefined;

  if (organization.isLoaded && user.isLoaded) {
    orgId = organization.organization?.id ?? user.user?.id;
  }
  const files = useQuery(api.files.getFiles, orgId ? { orgId } : "skip");
  const createFile = useMutation(api.files.createFile);
  return <MaxWidthWrapper>
    <div className="bg-white relative">

    </div>
  </MaxWidthWrapper>;
}
