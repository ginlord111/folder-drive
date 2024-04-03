import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileSearch } from "lucide-react";
import React from "react";

const page = () => {
  return (
    <div className="relative bg-white ">
      <div className="flex items-center justify-between px-5">
        <div className="text-4xl font-bold tracking-tight">
          <h1>Your Files</h1>
        </div>
        <div className="flex items-center gap-3">
          <Input type="text" placeholder="Search file" />
          <Button variant='default' className="">
            <FileSearch  className="mr-2"/>
            Search
          </Button>
        </div>
        <div>
          <Button>
            Upload File
          </Button>
        </div>
      </div>
    </div>
  );
};

export default page;
