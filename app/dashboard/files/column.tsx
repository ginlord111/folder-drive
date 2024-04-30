import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { deleteFileBtn, favFileBtn, permaDeleteBtn } from "@/helper/functions";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { formatRelative } from "date-fns";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { usePathname } from "next/navigation";
import { moveToTrash } from "@/convex/files";
import { toast } from "@/components/ui/use-toast";
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
      const deleteFavFile = useMutation(api.files.deleteFavFile);
      const favFile = useMutation(api.files.createFavoriteFile);
      const permaDelete = useMutation(api.files.permaDelete);
      const moveToTrash = useMutation(api.files.moveToTrash);
      const restoreFile = useMutation(api.files.restoreFile);
      const pathname = usePathname();
      const fileUrl = useQuery(api.files.getImage, {
        fileId: row.original.fileId,
      });
      const isNotFavPage = pathname !== "/dashboard/favorites";
      const isTrashPage = pathname === "/dashboard/trash";
      const handleRestoreDownloadBtn = async () => {
        if(isTrashPage){
          await restoreFile({fileId:row.original._id})
          toast({
            variant: "success",
            title: "Successfully restored file",
            description: "File has been successfully restored",
          });
        }
        else{
          window.open(fileUrl?.url as string, "_blank")
        }
      }
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={handleRestoreDownloadBtn}
            >
              {isTrashPage ? "Restore" : "Download"}
            </DropdownMenuItem>
            {!isTrashPage && (
              <DropdownMenuItem
                onClick={() =>
                  isNotFavPage
                    ? favFileBtn(
                        row.original._id,
                        row.original.orgId,
                        row.original.userId,
                        favFile,
                      )
                    : deleteFavFile({
                        fileId: row.original._id,
                        orgId: row.original.orgId,
                      })
                }
              >
                {isNotFavPage
                  ? "Add to your favorites"
                  : "Remove from favorites"}
              </DropdownMenuItem>
            )}
            <DropdownMenuItem
              onClick={() =>
                isTrashPage
                  ? permaDeleteBtn(row.original._id, permaDelete)
                  : deleteFileBtn(row.original._id, moveToTrash)
              }
            >
              {isTrashPage ? "Permanent delete" : "Move to trash"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
