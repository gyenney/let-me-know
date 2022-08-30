import { Table } from "@serverless-stack/resources";

export function StorageStack({ stack, app }) {
    // TODO: Have two tables, one for storing messages and one for notepads.
    const table = new Table(stack, "Notepads", {
        fields: {
            notepadId: "string",
            msgTimestamp: "number",
        },
        primaryIndex: { partitionKey: "notepadId", sortKey: "msgTimestamp" },
    });

    return { table };
}