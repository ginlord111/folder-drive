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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "./ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Loader2, CopyIcon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const CreateApiKeyDialog = () => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isKey, setIsKey] = useState<string | undefined>();
  const createKey = useMutation(api.api.createApiKey);
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(
      z.object({
        name: z.string(),
      }),
    ),
    defaultValues: {
      name: "",
    },
  });
  useEffect(() => {
    if (!isDialogOpen && isKey) setIsKey(undefined);
  }, [isDialogOpen, isKey]);
  const onSubmit = async (values: { name: string }) => {
    try {
      const key = await createKey({
        name: values.name,
      });
      form.reset();
      setIsKey(key!);
    } catch (error) {
      setIsKey(undefined);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong",
      });
    }
  };
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger>
        <Button size="sm">Create</Button>
      </DialogTrigger>
      {isKey ? (
        <DialogContent className="w-[350px] md:w-[450px]">
          <DialogHeader>
            <DialogTitle className="pb-5">
              You have successfully created your API key.
            </DialogTitle>
            <DialogDescription>
              You will only see this once. Copy your API key and store it in a
              secure place.
            </DialogDescription>
          </DialogHeader>
          <div className="flex w-full max-w-sm items-center justify-center space-x-2">
            <Input value={isKey} readOnly />
            <Button
              size="sm"
              onClick={() => navigator.clipboard.writeText(isKey)}
            >
              <CopyIcon />
            </Button>
          </div>
        </DialogContent>
      ) : (
        <DialogContent className="w-[350px] md:w-[450px]">
          <DialogHeader>
            <DialogTitle className="pb-5">Create your API key</DialogTitle>
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
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Input your API key name"
                            {...field}
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
      )}
    </Dialog>
  );
};
const CreateApiKey = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    setIsLoaded(true);
    console.log("loaded");
  }, []);
  return (
    <div className="relative flex items-center">
      {isLoaded && <CreateApiKeyDialog />}
    </div>
  );
};

export default CreateApiKey;
