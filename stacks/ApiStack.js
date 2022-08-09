import { Api, use } from "@serverless-stack/resources";
import { StorageStack } from "./StorageStack";

export function ApiStack({ stack, app }) {
    // Get reference to table resource.
    const { table } = use(StorageStack);

    // Create the api.
    const api = new Api(stack, "Api", {
        // TODO: Authentication.
        defaults: {
            function: {
                // Give API permissions to access the table.
                permissions: [table],
                environment: {
                    TABLE_NAME: table.tableName,
                },
            },
        },
        routes: {
            // Route used to write a message to a notepad.
            "POST /notepads/{id}": "functions/create.main",
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