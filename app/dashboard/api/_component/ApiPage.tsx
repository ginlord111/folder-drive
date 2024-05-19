"use client";
import CreateApiKey from "@/components/CreateApiKey";
import DeleteApiKey from "@/components/DeleteApiKey";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const ApiPage = () => {
  const apiKeys = useQuery(api.api.getApiKeys, { orgId: undefined });
  return (
    <div className="relative bg-white px-10 overflow-hidden">
      <div className="flex items-center justify-center py-2">
        <div className="flex-1 md:text-4xl text-xl font-bold tracking-tight whitespace-nowrap">
          <h1>APIs</h1>
        </div>
        <div className="justify-end">
          <CreateApiKey />
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Key</TableHead>
            <TableHead>Date Created</TableHead>
            <TableHead className="text-right">Last Used</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {apiKeys &&
            apiKeys.map((apiKey) => (
              <TableRow key={apiKey._id}>
                <TableCell width={20}>
                  <DeleteApiKey keyId={apiKey._id} key={apiKey._id} />
                </TableCell>
                <TableCell className="font-medium">{apiKey.name}</TableCell>
                <TableCell>{apiKey.key}</TableCell>
                <TableCell>
                  {new Date(apiKey._creationTime).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  {apiKey.lastUsedAt}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApiPage;
