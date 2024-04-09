"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileSearch } from "lucide-react";
import UploadFile from "@/components/UploadFile";
const FileHeader = () => {
  return (
    <div className="flex items-center justify-between ">
      <div className="md:text-4xl text-xl font-bold tracking-tight whitespace-nowrap">
        <h1>Your Files</h1>
      </div>
      <div className="flex items-center gap-3 flex-shrink-1">
        <Input type="text" placeholder="Search file" />
        <Button variant="default">
          <FileSearch className="mr-2 shrink" />
          Search
        </Button>
      </div>
      <div>
        <UploadFile />
      </div>
    </div>
  );
};

export default FileHeader;
