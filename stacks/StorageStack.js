import { Table } from "@serverless-stack/resources";

export function StorageStack({ stack, app }) {
    // TODO: What should the name be?
    const table = new Table(stack, "Notepads", {
        fields: {
            notepadId: "string",
            msgTimestamp: "number",
        },
        primaryIndex: { partitionKey: "notepadId", sortKey: "msgTimestamp" },
    });

    return { table };
}