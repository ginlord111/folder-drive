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
