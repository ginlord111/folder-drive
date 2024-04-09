"use client";
import React from "react";
import { useState, useEffect } from "react";
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
import { Input } from "./ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { uploadFileSchema } from "@/lib/utils";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useOrganization, useUser } from "@clerk/nextjs";
import { Loader2, CircleCheck } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
const UploadFileCard = () => {
  const [isOpenFile, setIsOpenFile] = useState<boolean>(false);
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const createFile = useMutation(api.files.createFile);
  const org = useOrganization();
  const user = useUser();
  const orgId = org.organization?.id ?? user.user?.id;
  const { toast } = useToast();
  const form = useForm<z.infer<typeof uploadFileSchema>>({
    resolver: zodResolver(uploadFileSchema),
    defaultValues: {
      title: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof uploadFileSchema>) => {
    console.log(values, "VALUES");
    const postUrl = await generateUploadUrl();
    if (!orgId || !postUrl) return;
    const result = await fetch(postUrl, {
      method: "POST",
      headers: { "Content-Type": values.file[0].type },
      body: values.file[0],
    });
    const { storageId } = await result.json();
    try {
      await createFile({ fileId: storageId, name: values.title, orgId });
      form.reset();
      setIsOpenFile(false);
      toast({
        variant: "success",
        //@ts-ignore
        title: (
          <div className="flex items-center gap-1">
            Upload your file successfully <CircleCheck className="w-3 h-3" />
          </div>
        ),
        description: "Your file is now stored in File Drive",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong",
      });
    }
  };

  const fileRef = form.register("file");
  return (
    <Dialog open={isOpenFile} onOpenChange={setIsOpenFile}>
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
                <Button
                  type="submit"
                  className="w-full"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <span>Submit</span>
                  )}
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
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    setIsLoaded(true);
  }, []);
  return (
    <div className="relative flex items-center">
      {isLoaded && <UploadFileCard />}
    </div>
  );
};

export default UploadFile;
