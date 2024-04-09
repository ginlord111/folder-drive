import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { FileSearch } from "lucide-react";
const SearchFile = () => {
  return (
    <div className="flex items-center gap-3 flex-shrink-1">
      <Input type="text" placeholder="Search file" />
      <Button variant="default">
        <FileSearch className="mr-2 shrink" />
        Search
      </Button>
    </div>
  );
};

export default SearchFile;
