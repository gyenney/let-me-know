import { Table } from "@serverless-stack/resources";

export function StorageStack({ stack, app }) {
    // TODO: What should the name be? 
    const table = new Table(stack, "Notepads", {
        fields: {
            notepadId,
            msgTimestamp,
        },
        primaryIndex: { partitionKey: "notepadId", sortKey: "msgTimestamp" },
    });


    return { table };
}