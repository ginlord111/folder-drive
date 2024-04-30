import { Doc, Id } from "@/convex/_generated/dataModel";
import { z } from "zod";
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
  
  export type Payment = {
    id: string;
    amount: number;
    status: "pending" | "processing" | "success" | "failed";
    email: string;
  };