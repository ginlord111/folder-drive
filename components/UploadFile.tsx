"use client";
import React from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { uploadFileSchema } from "@/lib/utils";
const UploadFileCard = () => {
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const onSubmit = (values: z.infer<typeof uploadFileSchema>) => {
    console.log(values, "VALUES");
  };
  const form = useForm<z.infer<typeof uploadFileSchema>>({
    resolver: zodResolver(uploadFileSchema),
    defaultValues: {
      title: "",
    },
  });
  const fileRef = form.register("file");
  return (
    <Dialog>
      <DialogTrigger>
        <Button>Upload File</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="pb-5">Upload your file here</DialogTitle>
          <DialogDescription>
            This will be accessible by anyone in your organization
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-start gap-5 w-full">
          <div className="pb-3 w-full">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Input your file title here"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="file"
                  render={({ field: { onChange }, ...field }) => (
                    <FormItem>
                      <FormLabel>File</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          {...fileRef}
                          onChange={(e) => {
                            if (!e.target.files) return;
                            onChange(e.target.files[0]);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  Submit
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
const UploadFile = () => {
  return (
    <div className="relative flex items-center">
      <UploadFileCard />
    </div>
  );
};

export default UploadFile;
