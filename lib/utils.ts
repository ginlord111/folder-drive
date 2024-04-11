import { Doc } from "@/convex/_generated/dataModel";
import { type ClassValue, clsx } from "clsx";
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
export const fileTypes = {
  "image/png": "image",
  "image/jpeg": "image",
  "application/pdf": "pdf",
  "text/csv": "csv",
} as Record<string, Doc<"files">["type"]>;