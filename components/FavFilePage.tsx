"use client";
import React from "react";
import Image from "next/image";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useOrganization, useUser } from "@clerk/nextjs";
import SkeletonFile from "@/components/SkeletonFile";
import FileCard from "@/components/FileCard";
import NoFilesAvail from "@/components/NoFilesAvail";
const FavFilePage = () => {
  const org = useOrganization();
  const user = useUser();
  let tempOrgId;
  if (org.isLoaded && user.isLoaded) {
    tempOrgId = org.organization?.id ?? user.user?.id;
  }
  const orgId = tempOrgId;
  const favFiles = useQuery(api.files.getFavoriteFiles, orgId ? { orgId } : "skip");
  return (
    <div className="relative bg-white px-10 overflow-hidden">
    <main className="mt-10">
      <div className="font-bold text-5xl tracking-tighter">
        <h3>Favorites</h3>
      </div>
      {favFiles === undefined && <SkeletonFile />}
      {!favFiles || favFiles?.length > 0 ? (
        <>
          {/* <h3 className="text-lg text-muted-foreground overflow-hidden">
            Total favFiles: {favFiles?.length}
          </h3> */}
          <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5">
            {favFiles?.map((file) => (
              <FileCard key={file._id} file={file} orgId={orgId as string} />
            ))}
          </div>
        </>
      ) : (
       <NoFilesAvail />
      )}
    </main>
  </div>
  )
}

export default FavFilePage