import React, { useState } from "react";
import { useToast } from "./ui/use-toast";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { deleteFileBtn, favFileBtn } from "@/helper/functions";
import { permaDeleteBtn } from "@/helper/functions";
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
  file: Doc<"files">;
  fileUrl: string | null | undefined;
  orgId: string;
}) => {
  const { toast } = useToast();
  const [isOpenDialog, sestIsOpenDialog] = useState<boolean | undefined>(false);
  const deleteFavFile = useMutation(api.files.deleteFavFile);
  const favFile = useMutation(api.files.createFavoriteFile);
  const restoreFile = useMutation(api.files.restoreFile);
  const moveToTrash = useMutation(api.files.moveToTrash);
  const permaDelete = useMutation(api.files.permaDelete);
  const pathname = usePathname();
  const trash = pathname === "/dashboard/trash";
  const dropdownAllFiles = [
    {
      title: "Download",
      onClick: () => window.open(fileUrl as string, "_blank"),
      icon: File,
      iconColor: "text-blue-500",
    },
    {
      title:
        pathname === "/dashboard/favorites"
          ? "Remove from favorites"
          : "Favorites",
      onClick: () =>
        pathname === "/dashboard/files"
          ? (favFileBtn(file._id, orgId, file.userId, favFile),
            toast({
              variant: "success",
              title: "Liked File",
              description: "File has been successfully saved in you favorites",
            }))
          : (deleteFavFile({ fileId: file._id, orgId }),
            toast({
              variant: "destructive",
              title: "Succesuful remove fil",
              description: "File has been successfully removed in you favorites",
            })),
      icon: FolderHeart,
      iconColor:
        pathname === "/dashboard/favorites" ? "text-red-200" : "text-red-500",
    },
  ];
  const dropdownDelete = [
    {
      title: "Restore",
      onClick: async () => {
        await restoreFile({ fileId: file._id });
        toast({
          variant: "success",
          title: "Successfully restored file",
          description: "File has been successfully restored",
        });
      },
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
            {pathname === "/dashboard/files" ||
            pathname === "/dashboard/favorites"
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
                <Trash className="text-red-500" />{" "}
                {trash ? (
                  <span>Permantly delete</span>
                ) : (
                  <span>Move to trash</span>
                )}
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
            <AlertDialogAction
              className="bg-red-500"
              onClick={() =>
                trash
                  ? permaDeleteBtn(file._id, permaDelete, sestIsOpenDialog)
                  : deleteFileBtn(file._id, moveToTrash, sestIsOpenDialog)
              }
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DropDownFile;
