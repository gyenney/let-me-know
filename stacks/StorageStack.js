import { Table } from "@serverless-stack/resources";

export function StorageStack({ stack, app }) {
    // TODO: Have two tables, one for storing messages and one for notepads.
    const messageTable = new Table(stack, "Messages", {
        fields: {
            notepadId: "string",
            msgTimestamp: "number",
        },
        // Fetch all messages within a given notepad, sorted by the timestamp.
        primaryIndex: { partitionKey: "notepadId", sortKey: "msgTimestamp" },
    });

    const notepadTable = new Table(stack, "Notepads", {
        fields: {
            notepadId: "string",      // Unique UUID for identifying a notepad
            mainIdentifier: "string", // A "name" for the notepad; used for querying.
            createdAt: "number",      // Time of when the notepad was created.
        },
        primaryIndex: { partitionKey: "notepadId" },
        globalIndexes: {
            // Query notepads with based on main identifier.
            // TOOD: If we only project the key, and have the id as the sort key, might this increase
            // performance in some way? See: https://docs.sst.dev/constructs/Table#projection-1
            mainIdentifierIndex: { partitionKey: "mainIdentifier", sortKey: "createdAt" },
            // TODO: Connection engine can utilize other identifiers to make queries.
        }
    });

    return { messageTable, notepadTable };
}