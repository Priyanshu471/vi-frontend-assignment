"use client";

import { Badge } from "@/components/ui/badge";
import { type ColumnDef } from "@tanstack/react-table";
import { labels, priorities, statuses } from "../_constants/metadata";
import { type Task } from "../_constants/schema";
import { Checkbox } from "@/components/ui/checkbox";

export const columns: Array<ColumnDef<Task>> = [
    {
        accessorKey: "selection",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enablePinning: true,
    },
    {
        accessorKey: "id",
        header: ({ column }) => <span>Task</span>,
        cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
        enablePinning: true,
    },
    {
        accessorKey: "title",
        header: ({ column }) => <span>Title</span>,
        cell: ({ row }) => {
            const label = labels.find((label) => label.value === row.original.label);

            return (
                <div className="flex space-x-2">
                    {label && <Badge variant="outline">{label.label}</Badge>}
                    <span className="max-w-[400px] truncate font-medium">
                        {row.getValue("title")}
                    </span>
                </div>
            );
        },
        enableResizing: true,
    },
    {
        accessorKey: "status",
        header: ({ column }) => <span>Status</span>,
        cell: ({ row }) => {
            const status = statuses.find((status) => status.value === row.getValue("status"));

            if (!status) {
                return null;
            }

            return (
                <div className="flex w-[100px] items-center">
                    {status.icon && <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />}
                    <span>{status.label}</span>
                </div>
            );
        },
        enableResizing: true,
    },
    {
        accessorKey: "priority",
        header: ({ column }) => <span>Priority</span>,
        cell: ({ row }) => {
            const priority = priorities.find(
                (priority) => priority.value === row.getValue("priority"),
            );

            if (!priority) {
                return null;
            }

            return (
                <div className="flex items-center">
                    {priority.icon && (
                        <priority.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                    )}
                    <span>{priority.label}</span>
                </div>
            );
        },
        enableResizing: true,
    },
];
