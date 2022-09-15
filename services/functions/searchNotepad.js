import handler from "../util/handler";
import dynamoDb from "../util/dynamodb";

export const main = handler(async (event) => {
    const params = {
        TableName: process.env.NOTEPAD_TABLE_NAME,
        IndexName: "mainIdentifierIndex",
        // Query notepads by mainIdentifier
        KeyConditionExpression: "mainIdentifier = :notepadId",
        ExpressionAttributeValues: {
            ":notepadId": event.pathParameters.id,
        },
    };

    const result = await dynamoDb.query(params);

    return result.Items;
});