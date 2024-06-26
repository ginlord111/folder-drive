"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FolderHeart,
  File,
  FileImage,
  FileText,
  Video,
  FileVideo,
} from "lucide-react";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Image from "next/image";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback, AvatarImage } from "./ui/avatar";
import { formatRelative } from "date-fns";
import DropDownFile from "./DropDownFile";
const FileCard = ({
  file,
  orgId,
  favorite,
}: {
  file: Doc<"files">;
  orgId: string;
  favorite?: boolean;
}) => {
  const fileUrl = useQuery(api.files.getImage, { fileId: file.fileId });
  const favoriteFiles = useQuery(api.files.getFiles, { orgId, favorite:true });
  const deleteFavFile = useMutation(api.files.deleteFavFile);
  const user = useQuery(api.users.getUserProfile, { userId: file.userId });
  const fileIcon = () => {
    switch (file.type) {
      case "image":
        return <FileImage />;
      case "pdf":
        return <FileText />;
      case "video":
        return <FileVideo />;
      default:
        <File />;
    }
  };
  console.log(favoriteFiles, "FAVORITE FILES")
   
  return (
    <Card className="lg:max-w-[350px] max-w-[250px] sm:max-w-[300px]   mt-20 overflow-hidden ">
      <CardHeader className="max-w-2xl flex">
        <CardTitle className="flex justify-between items-center lg:text-xl sm:text-sm text-sm md:text-md lg:break-normal md:break-all">
          <div className="flex items-center gap-2">
            {<span>{fileIcon()}</span>}
            <span>{file.name}</span>
          </div>
          <DropDownFile file={file} fileUrl={fileUrl?.url} orgId={orgId} />
        </CardTitle>
      </CardHeader>
      <CardContent
        className="flex items-center justify-center relative overflow-viisble border-b-2 border-t-2"
        onClick={() => window.open(fileUrl?.url as string, "_blank")}
      >
        {file.type === "image" ? (
          <Image
            alt="File Image"
            width="250"
            height="150"
            src={fileUrl?.url as string}
            loading="eager"
            className="p-5 object-cover rounded-xl"
            priority={true}
          />
        ) : file.type === "video" ? (
          <Video className="w-[250px] h-[160px]" />
        ) : (
          <File className="w-[250px] h-[160px]" />
        )}
      </CardContent>
      <CardFooter className="flex items-center flex-row-reverse gap-5 py-3">
        <div className="ml-auto">
          {favoriteFiles?.map(
            (favFile) =>
              favFile.fileId === file.fileId && (
                <FolderHeart
                  key={favFile._id}
                  className="text-yellow-500 animate-jump-in animate-once"
                  onClick={() => {
                    deleteFavFile({ fileId: favFile._id, orgId });
                  }}
                />
              )
          )}
        </div>
        <div className="flex items-center gap-4 overflow-auto">
          <Avatar>
            <AvatarImage
              src={user?.image}
              alt="@shadcn"
              className="w-16 lg:w-8  rounded-full"
            />
            <AvatarFallback>AVATAR</AvatarFallback>
          </Avatar>
          <div className="text-sm  text-muted-foreground flex justify-start items-start tracking-tighter max-w-[120px]">
            {user?.name}
          </div>
          <div className="text-sm text-muted-foreground tracking-tighter max-w-[150px] text-center">
            Uploaded on{" "}
            {formatRelative(new Date(file._creationTime), new Date())}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default FileCard;
