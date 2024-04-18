import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const FilterType = ({setSelectType, selectType}: {setSelectType: React.Dispatch<React.SetStateAction<string>>, selectType: string}) => {
  return (
    <div className="flex items-center gap-8"> 
    <span className="font-bold text-lg">Filter</span>
    <Select value={selectType} onValueChange={(value)=>{setSelectType(value)}} defaultValue="All">
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Choose type file" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="image">Image</SelectItem>
          <SelectItem value="pdf">PDF</SelectItem>
          <SelectItem value="csv">CSV</SelectItem>
          <SelectItem value="video">Video</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
    </div>
  );
};

export default FilterType;
