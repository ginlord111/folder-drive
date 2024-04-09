import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LayoutGrid, Rows2 } from "lucide-react";
import { useState, useEffect } from "react";
import UploadFile from "@/components/UploadFile";
import SearchFile from "@/components/SearchFile";
const FilesPage = () => {
  return (
    <div className="relative bg-white px-10">
      <div className="flex items-center justify-between ">
        <div className="md:text-4xl text-xl font-bold tracking-tight whitespace-nowrap">
          <h1>Your Files</h1>
        </div>
        <SearchFile />
        <UploadFile />
      </div>
      <div className="relative mt-10">
        <GridTableTabs />
      </div>
    </div>
  );
};

const GridTableTabs = () => (
  <div className="flex justify-between py-2">
    <div>
      <Tabs defaultValue="account" className="w-[200px]">
        <TabsList className="grid w-full grid-cols-2 h-[50px] py-2">
          <TabsTrigger value="account">
            <p className="mr-2">Grid</p> <LayoutGrid width={20} />
          </TabsTrigger>
          <TabsTrigger value="password">
            <p className="mr-2">Table</p> <Rows2 width={20} />
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  </div>
);
export default FilesPage;
