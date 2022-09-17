
import handler from "../util/handler";
import dynamodb from "../util/dynamodb";

export const main = handler(async (event) => {
    const params = {
        TableName: process.env.CONNECTIONS_TABLE_NAME,
        Item: {
            notepadId: event.requestContext.notepadId,
            clientId: event.requestContext.clientId,
        }
    }

    await dynamodb.delete(params);

    return { statusCode: 200, body: "Disconnected" };
});