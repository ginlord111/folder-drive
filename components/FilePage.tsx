"use client";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LayoutGrid, Rows2 } from "lucide-react";
import UploadFile from "@/components/UploadFile";
import SearchFile from "@/components/SearchFile";
import FileCard from "@/components/FileCard";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useOrganization, useUser } from "@clerk/nextjs";
import SkeletonFile from "@/components/SkeletonFile";
import NoFilesAvail from "@/components/NoFilesAvail";
import TableCardFile from "@/components/TableCardFile";
import { columns } from "@/app/dashboard/files/column";
import FilterType from "./FilterType";
import { usePathname } from "next/navigation";
const FilesPage = ({ favoritePage }: { favoritePage?: boolean }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectType, setSelectType] = useState("");
  let tempOrgId;
  const org = useOrganization();
  const user = useUser();
  if (org.isLoaded && user.isLoaded) {
    tempOrgId = org.organization?.id ?? user.user?.id;
  }
  const pathname = usePathname();
  const trash = pathname === "/dashboard/trash"
  const orgId = tempOrgId;
  const files = useQuery(
    api.files.getFiles,
    orgId ? { orgId, query: searchQuery, type: selectType , favorite:favoritePage, trash} : "skip"
  );
  return (
    <div className="relative bg-white px-10 overflow-hidden">
      <div className="flex items-center justify-between  py-2">
        <div className="md:text-4xl text-xl font-bold tracking-tight whitespace-nowrap">
          <h1>{favoritePage ? 'Favorite files': trash ? "Trash files" : "Your files"}</h1>
        </div>
        <SearchFile setSearchQuery={setSearchQuery} />
        <UploadFile />
      </div>
      <Tabs defaultValue="grid">
        <div className="flex justify-between items-end px-5">
          <div className="flex items-center max-w-[250px] mt-16">
            <TabsList className="grid w-full grid-cols-2 h-[50px] py-2">
              <TabsTrigger value="grid">
                <p className="mr-2">Grid</p> <LayoutGrid width={20} />
              </TabsTrigger>
              <TabsTrigger value="table">
                <p className="mr-2">Table</p> <Rows2 width={20} />
              </TabsTrigger>
            </TabsList>
          </div>
          <FilterType setSelectType={setSelectType} selectType={selectType} />
        </div>
        <div className="flex flex-col  md:items-stretch items-center w-full mt-5">
          {files === undefined && <SkeletonFile />}
          {!files || files?.length > 0 ? (
            <>
              <TabsContent value="grid">
                <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5">
                  {files?.map((file) => (
                    <FileCard
                      key={file._id}
                      file={file}
                      orgId={orgId as string}
                      favorite={favoritePage}
                    />
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="table">
           {files && <TableCardFile columns={columns} data={files} />}
              </TabsContent>
            </>
          ) : (
            <NoFilesAvail />
          )}
        </div>
      </Tabs>
    </div>
  );
};

export default FilesPage;
