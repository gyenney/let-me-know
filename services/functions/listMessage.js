import handler from "../util/handler";
import dynamoDb from "../util/dynamodb";

export const main = handler(async (event) => {
    const params = {
        TableName: process.env.MESSAGE_TABLE_NAME,
        // List all messages from a given notepad.
        KeyConditionExpression: "notepadId = :notepadId",
        ExpressionAttributeValues: {
            ":notepadId": event.pathParameters.id,
        },
    };

    const result = await dynamoDb.query(params);

    return result.Items;
});