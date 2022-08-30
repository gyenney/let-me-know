import handler from "../util/handler";
import dynamoDb from "../util/dynamodb";

export const main = handler(async (event) => {
    const data = JSON.parse(event.body);

    const params = {
        TableName: process.env.TABLE_NAME,
        Item: {
            // The attributes of the item to be created.
            notepadId: event.pathParameters.id, // Id of the notepad from the path 
            msgTimestamp: Date.now(),           // Timestamp of when the message was written.
            userId: event.requestContext.authorizer.iam.cognitoIdentity.identityId, // userId of the message author.
            message: data.content,
        },
    };

    await dynamoDb.put(params);

    return params.Item;
});