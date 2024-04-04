"use client";
import React from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

const UploadFile = () => {
  const UploadFileCard = () => (
    <Dialog>
      <DialogTrigger>
        <Button>Upload File</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="pb-5">Upload your file here</DialogTitle>
          <DialogDescription>
            This will be accessible by anyone in your organization
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-start gap-5 w-full">
          <div className="pb-3 w-full">
            <Label htmlFor="title">Title</Label>
            <Input
              type="text"
              placeholder="Input your folder title"
              className="w-full mt-3"
            />
          </div>
          <div className="pt-4 w-full">
            <Label htmlFor="file">File</Label>
            <Input type="file" className="w-full mt-3" />
          </div>
          <div className="flex items-center w-full justify-center pt-5">
            <Button className="w-full">Submit</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
  return (
    <div className="relative flex items-center">
      <UploadFileCard />
    </div>
  );
};

export default UploadFile;
