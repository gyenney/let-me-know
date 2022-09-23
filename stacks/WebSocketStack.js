import { WebSocketApi, use } from "@serverless-stack/resources";
import { StorageStack } from "./StorageStack";

export function WebSocketStack({ stack, app }) {
    const { connectionsTable } = use(StorageStack);

    // Create the WebSocket API
    const ws = new WebSocketApi(stack, "Api", {
        defaults: {
            function: {
                environment: {
                    CONNECTIONS_TABLE_NAME: connectionsTable.tableName,
                },
            },
        },
        routes: {
            $connect: "functions/chatHandler.main",
            $disconnect: "functions/chatHandler.main",
            sendmessage: "functions/chatHandler.main",
        },
    });

    // Allow the API to access the table
    ws.attachPermissions([connectionsTable]);

    // Show the API endpoint in the output
    stack.addOutputs({
        WebSocketApiEndpoint: ws.url,
    });

    return { ws }
}
