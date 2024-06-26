"use client"
import { toast } from "@/components/ui/use-toast";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { ReactMutation, useMutation, useQuery } from "convex/react";
import { FunctionReference } from "convex/server";
import { ConvexError } from "convex/values";
import { usePathname } from "next/navigation";
import React, { Dispatch, SetStateAction } from "react";
export const deleteFileBtn = async (
  fileId: Id<"files">,

  moveToTrash: ReactMutation<
    FunctionReference<
      "mutation",
      "public",
      {
        fileId: Id<"files">;
      },
      null
    >
  >,
  setIsOpenDialog?: Dispatch<SetStateAction<boolean | undefined>>,
) => {
  try {
    await moveToTrash({ fileId });
    if (setIsOpenDialog) {
      setIsOpenDialog(false);
    }
    toast({
      variant: "success",
      title: "Successfully Deleted",
      description: "File has been successfully deleted",
    });
  } catch (error) {
    toast({
      variant: "destructive",
      title: "Error",
      description: "Something went wrong",
    });
  }
};

export const permaDeleteBtn = async (
  fileId: Id<"files">,
  permaDelete: ReactMutation<
    FunctionReference<
      "mutation",
      "public",
      {
        fileId: Id<"files">;
      },
      null
    >
  >,
  setIsOpenDialog?: Dispatch<SetStateAction<boolean | undefined>>,
) => {
  try {
    await permaDelete({ fileId });
    if (setIsOpenDialog) {
      setIsOpenDialog(false);
    }
    toast({
      variant: "success",
      title: "Successfully Deleted",
      description: "File has been successfully deleted",
    });
  } catch (error) {
    toast({
      variant: "destructive",
      title: "Error",
      description: "Something went wrong",
    });
  }
};

export const favFileBtn = async (
  fileId: Id<"files">,
  orgId: string,
  userId: Id<"users">,
  favFile: ReactMutation<
    FunctionReference<
      "mutation",
      "public",
      {
        orgId: string;
        userId: Id<"users">;
        file_id: Id<"files">;
      },
      | ConvexError<"You must login first">
      | ConvexError<"You do not have acess to this organization">
      | null
    >
  >,
) => {
  try {
    await favFile({ file_id: fileId, orgId, userId });
  } catch (error) {
    toast({
      variant: "destructive",
      title: "Error",
      description: "File is already in your favorites",
    });
  }
};


export const FileFunction  = () => {
  const deleteFavFile = useMutation(api.files.deleteFavFile);
  const favFile = useMutation(api.files.createFavoriteFile);
  const permaDelete = useMutation(api.files.permaDelete);
  const moveToTrash = useMutation(api.files.moveToTrash);
  const restoreFile = useMutation(api.files.restoreFile);
  const pathname = usePathname();
  const fileUrl = (fileId:Id<"_storage">) => {
    const fileUrl = useQuery(api.files.getImage, {
      fileId,
    });

    return fileUrl;
  }

  return {
    deleteFavFile:deleteFavFile,
    favFile:favFile,
    permaDelete:permaDelete,
    moveToTrash:moveToTrash,
    restoreFile:restoreFile,
    pathname:pathname,
    fileUrl:fileUrl,
  }
}





