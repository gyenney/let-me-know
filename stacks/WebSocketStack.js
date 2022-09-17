import { WebSocketApi, use } from "@serverless-stack/resources";
import { StorageStack } from "./StorageStack";

export function WebSocketStack({ stack, app }) {
    const { connectionsTable } = use(StorageStack);

    // Create the WebSocket API
    const webSocketApi = new WebSocketApi(stack, "Api", {
        defaults: {
            function: {
                environment: {
                    CONNECTIONS_TABLE_NAME: connectionsTable.tableName,
                },
            },
        },
        routes: {
            $connect: "functions/connect.handler",
            $disconnect: "functions/disconnect.handler",
            sendmessage: "functions/sendMessage.handler",
        },
    });

    // Allow the API to access the table
    webSocketApi.attachPermissions([connectionsTable]);

    // Show the API endpoint in the output
    stack.addOutputs({
        WebSocketApiEndpoint: webSocketApi.url,
    });

    return { webSocketApi };
}