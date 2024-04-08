import React from "react";
import FileHeader from "../_components/file-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LayoutGrid, Rows2 } from "lucide-react";
import { useState, useEffect } from "react";
const FilesPage = () => {

  return (
    <div className="relative bg-white px-10">
      <FileHeader />
      <div className="relative mt-10">
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
      </div>
    </div>
  );
};

export default FilesPage;
