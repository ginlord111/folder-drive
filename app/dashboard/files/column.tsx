import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { formatRelative } from "date-fns";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";

const UserCell = ({ userId }: { userId: Id<"users"> }) => {
  const user = useQuery(api.users.getUserProfile, { userId });
  return (
    <div className="flex  items-center gap-3">
      <Avatar className="flex items-center justify-center">
        <AvatarImage
          src={user?.image}
          alt="USER ICON"
          className="w-8 h-8  rounded-full"
        />
      </Avatar>
      <span>{user?.name}</span>
    </div>
  );
};
export const columns: ColumnDef<Doc<"files">>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "user",
    header: "User",
    cell: ({ row }) => <UserCell userId={row.original.userId} />,
  },
  {
    accessorKey: "_creationTime",
    header: "Uploaded on",
    cell: ({ row }) =>
      formatRelative(new Date(row.original._creationTime), new Date()),
  },
  {
    id: "actions",
    header: "Actions",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Download</DropdownMenuItem>
            <DropdownMenuItem>Favorites</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
