import { Api, use } from "@serverless-stack/resources";
import { StorageStack } from "./StorageStack";

export function ApiStack({ stack, app }) {
    // Get reference to table resource.
    const { messageTable, notepadTable } = use(StorageStack);

    // Create the api.
    const api = new Api(stack, "Api", {
        defaults: {
            function: {
                // Give API permissions to access the table.
                permissions: [messageTable, notepadTable],
                environment: {
                    MESSAGE_TABLE_NAME: messageTable.tableName,
                    NOTEPAD_TABLE_NAME: notepadTable.tableName,

                },
            },
        },
        routes: {
            // Route used to write a message to a notepad.
            "POST /notepads/{id}": {
                // We want user to be logged in before writing any messages.
                authorizer: "iam",
                function: "functions/createMessage.main",
            },
            // List all messages within a given notepad.
            "GET /notepads/{id}": "functions/listMessage.main",
            // Create a new notepad.
            "POST /create": {
                authorizer: "iam",
                function: "functions/createNotepad.main",
            },
            "GET /hello": "functions/hello.main",
        }
    });

    // Show the API endpoint in console output.
    stack.addOutputs({
        ApiEndpoint: api.url,
    });

    return {
        api,
    }
}