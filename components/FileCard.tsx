"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { FolderHeart, Trash, File, EllipsisVertical } from "lucide-react";
import { Doc } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useToast } from "./ui/use-toast";
const DropDownFile = ({ file }: { file: Doc<"files"> }) => {
  const { toast } = useToast();
  const [isOpenDialog, sestIsOpenDialog] = useState(false);
  const deleteFile = useMutation(api.files.deleteFile);
  const deleteFileBtn = async () => {
    await deleteFile({ fileId: file._id });
    sestIsOpenDialog(false);
    toast({
      variant: "success",
      title: "Successfully Deleted",
      description: "File has been successfully deleted",
    });
  };
  return (
    <>
      <AlertDialog open={isOpenDialog} onOpenChange={sestIsOpenDialog}>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <EllipsisVertical className="w-7 h-7" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="p-5 flex flex-col gap-3">
            <DropdownMenuItem className="flex gap-3">
              <File className="text-blue-500" /> Download
            </DropdownMenuItem>
            <DropdownMenuItem className="flex gap-3">
              <FolderHeart className="text-yellow-500" /> Favorite
            </DropdownMenuItem>
            <DropdownMenuItem>
              <AlertDialogTrigger className="flex gap-3">
                <Trash className="text-red-500" /> Delete
              </AlertDialogTrigger>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              file and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-red-500" onClick={deleteFileBtn}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
const FileCard = ({ file }: { file: Doc<"files"> }) => {
  return (
    <div className="relative mt-20">
      <Card className="p-5">
        <CardHeader>
          <CardTitle className="flex justify-between items-center text-xl">
            <span>{file.name}</span> <DropDownFile file={file} />
          </CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default FileCard;
