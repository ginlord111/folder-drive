import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { type ClassValue, clsx } from "clsx";
import { useQuery } from "convex/react";
import { twMerge } from "tailwind-merge";
import { z } from "zod";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const uploadFileSchema = z.object({
  title: z.string().min(1),
  file: z
    .custom<FileList>((val) => val instanceof FileList, "Required")
    .refine((files) => files.length > 0, "Required"),
});
export const fileSearchSchema = z.object({
  query: z.string().min(0).max(100),
});

export const fileTypes = {
  "image/png": "image",
  "image/jpeg": "image",
  "application/pdf": "pdf",
  "text/csv": "csv",
  "video/mp4": "video",
} as Record<string, Doc<"files">["type"]>;

// export const getFileUrl = (fileId: Id<"_storage">):string => {
//   const imageUrl = useQuery(api.files.getImage, {fileId:fileId})
//   return {imageUrl}
// };
