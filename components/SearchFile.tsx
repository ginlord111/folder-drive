import React, { Dispatch, SetStateAction } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { FileSearch } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { fileSearchSchema } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
const SearchFile = ({ setSearchQuery }: { setSearchQuery: Dispatch<SetStateAction<string>> }) => {
  const form = useForm<z.infer<typeof fileSearchSchema>>({
    resolver: zodResolver(fileSearchSchema),
    defaultValues: {
      query:"",
    },
  });
  const onSubmit = async (values: z.infer<typeof fileSearchSchema>) => {
   setSearchQuery(values.query)
  };
  return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex items-center gap-4"
        >
          <FormField
            control={form.control}
            name="query"
            render={({ field }) => (
              <FormItem>
                <FormControl className="p-4">
                  <Input placeholder="Input your file name here" className="py-[15px]" {...field}/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button variant="default" type="submit" className="flex gap-1">
            <FileSearch className="mr-2 shrink" />
            Search
          </Button>
        </form>
      </Form>
  );
};

export default SearchFile;
