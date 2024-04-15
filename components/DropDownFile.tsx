import React, { useState } from "react";
import { useToast } from "./ui/use-toast";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
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
import { EllipsisVertical, FolderHeart, Trash,File } from "lucide-react";
import { Doc, Id } from "@/convex/_generated/dataModel";

const DropDownFile = ({
  file,
  fileUrl,
  orgId,
}: {
  file: Doc<"files" | "favorites">;
  fileUrl: string | null | undefined;
  orgId: string;
}) => {
  const { toast } = useToast();
  const [isOpenDialog, sestIsOpenDialog] = useState(false);
  const deleteFile = useMutation(api.files.deleteFile);
  const favFile = useMutation(api.files.createFavoriteFile);
  const favFileBtn = async (fileId: Id<"files" | "favorites">) => {
    try {
      await favFile({ file_id: fileId, orgId });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "File is already in your favorites",
      });
    }
  };
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
              onClick={() => favFileBtn(file._id)}
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

export default DropDownFile;
