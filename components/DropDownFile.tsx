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
import {
  EllipsisVertical,
  FolderHeart,
  Trash,
  File,
  FolderSync,
} from "lucide-react";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { usePathname } from "next/navigation";
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
  const pathname = usePathname();
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

  console.log(pathname, 'pathname')

  const dropdownAllFiles = [
    {
      title: "Download",
      onClick: () => window.open(fileUrl as string, "_blank"),
      icon: File,
      iconColor: "text-blue-500",
    },
    {
      title: pathname === '/dashboard/favorites' ? 'Remove from favorites' : 'Favorites',
      onClick: () => favFileBtn(file._id),
      icon: FolderHeart,
      iconColor: pathname === '/dashboard/favorites' ? "text-red-200" : 'text-red-500'
    },
  ];
  const dropdownDelete = [
    {
      title: "Restore",
      onClick: () => null,
      icon: FolderSync,
      iconColor: "text-green-500",
    },
  ];

  return (
    <>
      <AlertDialog open={isOpenDialog} onOpenChange={sestIsOpenDialog}>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <EllipsisVertical className="w-7 h-7" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="p-5 flex flex-col gap-3">
            {pathname === "dashboard/files" || "dashnoard/favorites"
              ? dropdownAllFiles.map((option, index) => (
                  <DropdownMenuItem
                    key={index}
                    onClick={option.onClick}
                    className="flex gap-3"
                  >
                    {<option.icon className={option.iconColor} />}
                    {<span>{option.title}</span>}
                  </DropdownMenuItem>
                ))
              : dropdownDelete.map((option, index) => (
                  <DropdownMenuItem
                    key={index}
                    onClick={option.onClick}
                    className="flex gap-3"
                  >
                    {<option.icon className={option.iconColor} />}
                    {<span>{option.title}</span>}
                  </DropdownMenuItem>
                ))}
            <DropdownMenuItem>
              <AlertDialogTrigger className="flex gap-3">
                <Trash className="text-red-500" /> Move to trash
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
