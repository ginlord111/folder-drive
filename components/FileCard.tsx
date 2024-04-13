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
import {
  FolderHeart,
  Trash,
  File,
  EllipsisVertical,
  FileImage,
  FileText,
  Folder,
} from "lucide-react";
import { Doc } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useToast } from "./ui/use-toast";
import Image from "next/image";
import { cn } from "@/lib/utils";
const DropDownFile = ({
  file,
  fileUrl,
}: {
  file: Doc<"files" | "favorites">;
  fileUrl: string | null | undefined;
}) => {
  const favFile = useMutation(api.files.createFavoriteFile);
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
            <DropdownMenuItem
              className="flex gap-3"
              onClick={() => window.open(fileUrl as string, "_blank")}
            >
              <File className="text-blue-500" /> Download
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex gap-3"
              onClick={() => favFile({ file_id: file._id })}
            >
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
const FileCard = ({ file, orgId }: { file: Doc<"files" | "favorites">; orgId: string }) => {
  const fileUrl = useQuery(api.files.getImage, { fileId: file.fileId });
  const favoriteFiles = useQuery(api.files.getFavoriteFiles, { orgId });
  const deleteFavFile = useMutation(api.files.deleteFavFile);
    const fileIcon = () => {
    switch (file.type) {
      case "image":
        return <FileImage />;
      case "pdf":
        return <FileText />;
      default:
        <File />;
    }
  };

  return (
    <Card className="max-w-[350px] mt-20 overflow-hidden">
      <CardHeader className="max-w-2xl flex">
        <CardTitle className="flex justify-between items-center lg:text-xl sm:text-sm text-sm md:text-md lg:break-normal md:break-all">
          <div className="flex items-center gap-2">
            {<span>{fileIcon()}</span>}
            <span>{file.name}</span>
          </div>
          <DropDownFile file={file} fileUrl={fileUrl?.url} />
        </CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-center relative overflow-viisble">
        {file.type === "image" ? (
          <Image
            alt="File Image"
            width="250"
            height="150"
            src={fileUrl?.url as string}
            className="p-5 object-cover rounded-xl"
          />
        ) : (
          <File className="w-[250px] h-[160px]" />
        )}
      </CardContent>
      <CardFooter>
        <div className="ml-auto">
          {favoriteFiles?.map(
            (favFile) =>
              favFile.fileId === file.fileId && (
                <FolderHeart
                  className="text-yellow-500 animate-jump-in animate-once"
                  onClick={() => {
                    deleteFavFile({ fileId: favFile._id });
                  }}
                />
              )
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default FileCard;
